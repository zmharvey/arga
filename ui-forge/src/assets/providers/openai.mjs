/**
 * gpt-image-1 adapter.
 *
 * Uses fetch directly rather than the SDK — this is one endpoint, and the
 * pipeline is already dependency-light enough to run on a clean machine.
 *
 * Two API facts shape this file:
 *   - `background: 'transparent'` REQUIRES png or webp output. Requesting jpeg
 *     silently gives an opaque square, which looks fine in isolation and wrong
 *     the moment it sits on a panel.
 *   - There is no negative-prompt parameter, so exclusions have to be folded
 *     into the prompt body.
 */

const ENDPOINT = 'https://api.openai.com/v1/images/generations';

/** gpt-image-1 accepts a fixed set of sizes; anything else is a 400. */
function nearestSize(canvas, aspect = 'square') {
  if (aspect === 'portrait') return '1024x1536';
  if (aspect === 'landscape') return '1536x1024';
  return '1024x1024';
}

export const meta = {
  id: 'openai',
  model: 'gpt-image-1',
  nativeAlpha: true,
  envKey: 'OPENAI_API_KEY',
};

export function available() {
  return Boolean(process.env.OPENAI_API_KEY);
}

/**
 * @param {object} asset  { key, prompt, negative, canvas, role }
 * @param {object} [opts] { quality, aspect, signal }
 * @returns {Promise<Buffer>} PNG bytes with alpha
 */
export async function generate(asset, opts = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  // No negative_prompt parameter exists, so exclusions go in the prompt body.
  const prompt = asset.negative
    ? `${asset.prompt}\n\nAvoid entirely: ${asset.negative}.`
    : asset.prompt;

  const body = {
    model: 'gpt-image-1',
    prompt,
    n: 1,
    size: nearestSize(asset.canvas, opts.aspect),
    quality: opts.quality ?? 'high',
    background: 'transparent',
    output_format: 'png', // required for transparency
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
    signal: opts.signal,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`gpt-image-1 ${res.status}: ${detail.slice(0, 400)}`);
  }

  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) throw new Error('gpt-image-1 returned no image data');
  return Buffer.from(b64, 'base64');
}
