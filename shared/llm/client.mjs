/**
 * Shared LLM client for every stage of the pipeline.
 *
 * One place, so every creative agent gets the same strict-schema treatment.
 * Strict structured output is not a nicety here — it is the mechanism that
 * stops an agent inventing a field, a pattern, or a token that the deterministic
 * build stage cannot honour.
 *
 * Lives at the repo root rather than inside a stage because stage 0 (concept)
 * and stage 1 (ui-forge) both need it, and duplicating it would let the two
 * drift into different guarantees.
 */

const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

export const DEFAULT_MODEL = 'gpt-5';

/**
 * Strict mode forbids open-ended maps (`additionalProperties` must be false
 * everywhere), so anything genuinely open-ended travels as key/value pairs with
 * a JSON-encoded value. Keeping strict mode is worth the clumsier wire format.
 */
export const PAIR = {
  type: 'object',
  additionalProperties: false,
  required: ['key', 'value'],
  properties: {
    key: { type: 'string' },
    value: { type: 'string', description: 'JSON-encoded value, e.g. "3" or "\\"radius.pill\\""' },
  },
};

export function fromPairs(pairs = []) {
  const out = {};
  for (const { key, value } of pairs) {
    try {
      out[key] = JSON.parse(value);
    } catch {
      out[key] = value;
    }
  }
  return out;
}

/**
 * @param {object} opts { system, user, schema, schemaName, model, images }
 * @returns {Promise<object>} parsed, schema-conforming response
 */
export async function ask({ system, user, schema, schemaName, model = DEFAULT_MODEL, images = [], raw = false }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const content = images.length
    ? [{ type: 'text', text: user }, ...images.map((url) => ({ type: 'image_url', image_url: { url } }))]
    : user;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: system }, { role: 'user', content }],
      // `raw` returns free-form JSON instead of a strict schema. Used only for
      // deeply recursive documents (templates), which strict mode cannot
      // express — forcing them through a schema meant nesting JSON inside a
      // JSON string, and double-escaping a 3KB tree fails constantly. Nothing
      // is lost: the real guarantees for templates are lint + instantiate +
      // render, not the wire format.
      response_format: raw
        ? { type: 'json_object' }
        : { type: 'json_schema', json_schema: { name: schemaName, strict: true, schema } },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`${model} ${res.status}: ${detail.slice(0, 500)}`);
  }
  const json = await res.json();
  const text = json?.choices?.[0]?.message?.content;
  if (!text) throw new Error(`${schemaName}: model returned no content`);
  return JSON.parse(text);
}

/**
 * Ask, then re-ask once with the validator's complaints fed back verbatim.
 *
 * A stated constraint is advice; a returned error is a correction, and the
 * second attempt almost always lands. Every desk in the pipeline wants this,
 * so it lives here rather than being re-implemented per caller.
 *
 * @param {object} opts   same as ask(), plus:
 * @param {(out:object)=>string[]} opts.check  returns blocking problems, empty when clean
 * @param {string} opts.what  noun used in the thrown message
 */
export async function askChecked({ check, what = 'output', ...opts }) {
  let out = await ask(opts);
  const problems = check(out);
  if (!problems.length) return out;

  out = await ask({
    ...opts,
    user: `${opts.user}\n\nYour previous attempt violated these constraints — fix them and keep everything else:\n${problems.map((p) => `- ${p}`).join('\n')}`,
  });
  const still = check(out);
  if (still.length) {
    throw new Error(`${what} still invalid after a retry:\n  - ${still.join('\n  - ')}`);
  }
  return out;
}
