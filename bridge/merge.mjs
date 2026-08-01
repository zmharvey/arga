/**
 * Spec sheets -> one validated build manifest.
 *
 * Deliberately not an agent. The whole reason this file exists is that prose has to
 * be re-interpreted by whoever reads it, and interpretation is where two build
 * agents diverge into two different games. A merger cannot interpret. It can only
 * collect declared values, refuse duplicates, and check them against the contract.
 *
 * Same argument as `ui-forge/src/compose/index.mjs` makes for its own seam: an LLM
 * here would be slower, non-reproducible, and free to drift from the schema in ways
 * a validator can only catch after the fact.
 *
 * A sheet contributes by carrying a fenced block:
 *
 *     ```manifest
 *     { "provides": "tiers", "value": [ ... ] }
 *     ```
 *
 * JSON rather than YAML because the repo has zero runtime dependencies and that is
 * worth keeping. The prose around the block stays the human-readable half and the
 * reasoning record; nothing downstream of here reads it.
 *
 * PROPOSING A KEY THE CONTRACT DOES NOT HAVE YET
 * ---------------------------------------------
 * The contract is 16 keys because it was derived from one hand-built game, and 41 of
 * the graph's 55 domains have not run. A domain that decides something real and finds
 * no slot for it is the signal the contract should grow — not an error to route around
 * by writing prose instead.
 *
 *     ```manifest
 *     { "provides": "environment", "status": "proposed", "value": { ... } }
 *     ```
 *
 * A proposal is collected and reported, never merged: nothing downstream reads a key
 * that has no shape to validate against, and promoting one is a deliberate edit to
 * `schema.mjs` by whoever owns the contract. `status` is required rather than inferred
 * from "key not in schema", so a typo in a real key (`tier` for `tiers`) stays the hard
 * error it should be instead of silently becoming a proposal.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { SCHEMA, validateManifest } from './schema.mjs';

const BLOCK = /```manifest\s*\n([\s\S]*?)\n```/g;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out.sort();
}

/**
 * @param {string} root directory of spec sheets
 * @param {object} [schema] which contract to merge against. Defaults to the creative one.
 *   The architect passes `TECH_SCHEMA` to merge technical sheets through the same collector,
 *   because "one key, one owning sheet" is worth enforcing on both contracts and is not
 *   worth writing twice. When a custom schema is given, validation is the caller's job:
 *   only this contract's own `validateManifest` knows the creative cross-key invariants.
 * @returns {Promise<{manifest: object, problems: string[], missing: string[], provenance: Record<string,string>, proposals: {key: string, sheet: string, value: any}[], sheetsRead: number, sheetsContributing: number}>}
 */
export async function mergeSheets(root, schema = SCHEMA) {
  const files = await walk(root);
  const manifest = {};
  /** @type {Record<string,string>} key -> the sheet that provided it */
  const provenance = {};
  /** @type {{key: string, sheet: string, value: any}[]} keys a domain wants that the contract lacks */
  const proposals = [];
  /** @type {string[]} sheets whose `status: proposed` outlived the promotion of their own key */
  const staleStatus = [];
  const problems = [];
  let contributing = 0;

  for (const file of files) {
    const rel = relative(root, file);
    const body = await readFile(file, 'utf8');
    let found = false;

    for (const match of body.matchAll(BLOCK)) {
      let block;
      try {
        block = JSON.parse(match[1]);
      } catch (err) {
        problems.push(`${rel}: manifest block is not valid JSON — ${err.message}`);
        continue;
      }

      const key = block.provides;
      if (typeof key !== 'string') {
        problems.push(`${rel}: manifest block needs a "provides" naming the key it supplies`);
        continue;
      }
      const proposed = block.status === 'proposed';

      if (!(key in schema) && !proposed) {
        problems.push(`${rel}: provides "${key}", which is not in the build contract. Known keys: ${Object.keys(schema).join(', ')}. If this is a genuinely new key, mark the block "status": "proposed".`);
        continue;
      }
      // A lingering `status: proposed` on a key the contract now has means one of two very
      // different things, and treating them alike caused real churn.
      //
      // If the sheet's own domain OWNS the key, this is stale metadata: the sheet proposed it,
      // the proposal was accepted, and the sheet has not been rewritten since. The value is
      // authoritative and the status is a leftover. Erroring there means every promotion has
      // to be followed by a rewrite of the very sheets that earned it, and any agent still
      // holding pre-promotion context re-breaks the merge on its next write. That happened
      // three times in one afternoon.
      //
      // If a DIFFERENT domain proposes it, that is a genuine ownership conflict and stays a
      // hard error -- two domains claiming one key is what this seam exists to refuse.
      if (key in schema && proposed) {
        const owner = schema[key].owner;
        const sheetDomain = dirname(rel);
        if (sheetDomain !== owner) {
          problems.push(`${rel}: proposes "${key}", which the contract already has and ${owner} owns. Two domains cannot claim one key.`);
          continue;
        }
        staleStatus.push(`${rel} still marks "${key}" proposed; it was promoted and this sheet owns it`);
      }
      if (!('value' in block)) {
        problems.push(`${rel}: manifest block for "${key}" has no "value"`);
        continue;
      }

      // A proposal is a finding, not a contribution. It is reported by name and never
      // merged: there is no shape to validate it against, so anything downstream reading
      // it would be reading an unchecked value — the exact thing this seam exists to stop.
      if (proposed && !(key in schema)) {
        const already = proposals.find((p) => p.key === key);
        if (already) {
          problems.push(`${rel}: proposes "${key}", already proposed by ${already.sheet}. One key, one owning sheet — that rule holds for proposals too.`);
          continue;
        }
        proposals.push({ key, sheet: rel, value: block.value });
        found = true;
        continue;
      }

      // The check that replaces a verifier agent hunting contradictions. Two sheets
      // asserting the same key is not a disagreement to adjudicate, it is a
      // duplicated responsibility, and the graph already says each key has one owner.
      if (key in manifest) {
        problems.push(`${rel}: "${key}" was already provided by ${provenance[key]}. One key, one owning sheet — decide which owns it and have the other reference it.`);
        continue;
      }

      manifest[key] = block.value;
      provenance[key] = rel;
      found = true;
    }
    if (found) contributing += 1;
  }

  // Only the creative contract's validator knows the creative cross-key invariants. A
  // caller merging a different schema validates it itself.
  let missing = [];
  if (schema === SCHEMA) {
    const { problems: schemaProblems, missing: absent } = validateManifest(manifest);
    problems.push(...schemaProblems);
    missing = absent;
  }

  return {
    manifest,
    problems,
    missing,
    provenance,
    proposals: proposals.sort((a, b) => a.key.localeCompare(b.key)),
    staleStatus,
    sheetsRead: files.length,
    sheetsContributing: contributing,
  };
}
