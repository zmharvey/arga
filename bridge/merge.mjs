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
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
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
 * @param {string} root directory of CID spec sheets
 * @returns {Promise<{manifest: object, problems: string[], missing: string[], provenance: Record<string,string>, sheetsRead: number, sheetsContributing: number}>}
 */
export async function mergeSheets(root) {
  const files = await walk(root);
  const manifest = {};
  /** @type {Record<string,string>} key -> the sheet that provided it */
  const provenance = {};
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
      if (!(key in SCHEMA)) {
        problems.push(`${rel}: provides "${key}", which is not in the build contract. Known keys: ${Object.keys(SCHEMA).join(', ')}`);
        continue;
      }
      if (!('value' in block)) {
        problems.push(`${rel}: manifest block for "${key}" has no "value"`);
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

  const { problems: schemaProblems, missing } = validateManifest(manifest);
  problems.push(...schemaProblems);

  return {
    manifest,
    problems,
    missing,
    provenance,
    sheetsRead: files.length,
    sheetsContributing: contributing,
  };
}
