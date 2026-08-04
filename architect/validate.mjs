/**
 * Validation for the technical contract, plus the one check that replaces three.
 *
 * THE GENERAL RULE
 * ----------------
 * Three build trials produced four defects with one shape, each found one layer deeper
 * than the last, and each patched with its own special-case check:
 *
 *   1. `upgrades` had `value`, and no module computed a value multiplier.
 *      Patched with `orphanedUpgrades`.
 *   2. `Progression.walkSpeed` was computed, and nothing wrote it to a Humanoid.
 *      Patched with `modules[].applies`.
 *   3. `playerState` was written by modules, and nothing constructed it.
 *      Patched with `wiring.constructs`.
 *   4. `clearing` declared `plots` as a dependency and called none of its functions.
 *      Not patched, because by then the pattern was obvious.
 *
 * All four are the same defect: **something is declared and nothing connects to it.** A
 * fourth special case would have been followed by a fifth. So this file states the rule
 * once, over the union of both manifests, and the special cases go away.
 *
 * A declaration is *connected* when something else names it. An upgrade is connected by a
 * module applying it; a module by another module depending on it, or by being an entry
 * point; an interface by appearing in a wiring step or a dependency; a state field by
 * having a writer and a constructor. The check is deliberately structural: it asks whether
 * a name appears on both sides of the graph, never whether the code is any good.
 */

import { typeError } from '../bridge/schema.mjs';
import { TECH_SCHEMA } from './schema.mjs';
import { graphProblems } from './graph.mjs';

/** Shape-check one manifest against one schema. Same walk as the bridge's. */
export function validateShapes(schema, manifest) {
  const problems = [];
  const missing = [];

  for (const [key, spec] of Object.entries(schema)) {
    const value = manifest[key];
    if (value === undefined) {
      missing.push(`${key} — ${spec.doc}`);
      continue;
    }

    // Per key, not global. The original guard was `problems.length === 0`, meaning one key's
    // shape error silently skipped the cross-field check of every key after it. Two format
    // rules on `modules` never ran for that reason, and the only symptom was a gate that
    // said fewer problems than it had.
    const before = problems.length;

    if (spec.array) {
      if (!Array.isArray(value)) {
        problems.push(`${key} must be an array`);
        continue;
      }
      if (spec.minItems && value.length < spec.minItems) {
        problems.push(`${key} needs at least ${spec.minItems} entries, got ${value.length}`);
      }
      value.forEach((item, i) => {
        for (const [field, fieldSpec] of Object.entries(spec.array)) {
          if (item[field] === undefined) problems.push(`${key}[${i}].${field} is required`);
          else {
            const err = typeError(`${key}[${i}].${field}`, item[field], fieldSpec);
            if (err) problems.push(err);
          }
        }
      });
    } else if (spec.shape) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        problems.push(`${key} must be an object`);
        continue;
      }
      for (const [field, fieldSpec] of Object.entries(spec.shape)) {
        if (value[field] === undefined) problems.push(`${key}.${field} is required`);
        else {
          const err = typeError(`${key}.${field}`, value[field], fieldSpec);
          if (err) problems.push(err);
        }
      }
    }

    if (spec.check && problems.length === before) problems.push(...spec.check(value));
  }

  return { problems, missing };
}

/**
 * Every declared thing has a producer and a consumer.
 *
 * This used to be six hand-written checks, one per defect a build trial found: an orphaned
 * upgrade, an unapplied one, a state field with no constructor, a dead dependency edge, an
 * output with no path, an interface no module offers.
 *
 * Six checks against fourteen edge kinds meant eight relationships were unchecked, and the
 * next defect was going to come from one of them. `graph.mjs` states the rule once over a
 * derived graph, so a new relationship is checked from the moment it is declared rather than
 * from the moment somebody remembers to write a check for it.
 *
 * Kept as a named export because it is the vocabulary the rest of the pipeline uses.
 */
export function unconnected(creative, tech) {
  return graphProblems(creative, tech);
}

export function validateTech(techManifest, creativeManifest = {}) {
  const { problems, missing } = validateShapes(TECH_SCHEMA, techManifest);
  if (!missing.length) problems.push(...unconnected(creativeManifest, techManifest));
  return { problems, missing };
}
