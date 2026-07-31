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

    if (spec.check && problems.length === 0) problems.push(...spec.check(value));
  }

  return { problems, missing };
}

/**
 * Every declared thing has a producer and a consumer.
 *
 * @param {object} creative the validated CID manifest
 * @param {object} tech the validated technical manifest
 */
export function unconnected(creative, tech) {
  const problems = [];
  const modules = Array.isArray(tech.modules) ? tech.modules : [];
  const byId = new Map(modules.map((m) => [m.id, m]));

  /* ---- upgrades: something must compute it, and something must apply it ---- */

  const upgrades = Array.isArray(creative.upgrades) ? creative.upgrades : [];
  const exposed = modules.flatMap((m) => (m.exposes ?? []).map((e) => String(e).toLowerCase()));
  const applied = new Map();
  for (const m of modules) {
    for (const id of m.applies ?? []) {
      if (applied.has(id)) problems.push(`upgrade "${id}" is applied by both "${applied.get(id)}" and "${m.id}"; two writers race`);
      applied.set(id, m.id);
    }
  }
  for (const u of upgrades) {
    const id = String(u.id ?? '').toLowerCase();
    if (!id) continue;
    const computed = exposed.some((fn) => fn.includes(id) || id.includes(fn.replace(/\(.*/, '')));
    if (!computed) {
      problems.push(`upgrade "${u.id}" is in the ladder but no module exposes anything that reads it — nothing computes its effect`);
    }
    if (applied.size && !applied.has(u.id)) {
      problems.push(`upgrade "${u.id}" is computed but no module declares it in "applies" — a player buys it and sees nothing change`);
    }
  }
  for (const [id, mod] of applied) {
    if (!upgrades.some((u) => u.id === id)) problems.push(`module "${mod}" applies "${id}", which is not an upgrade`);
  }

  /* ---- modules: a module nothing depends on must be an entry point ---- */

  const dependedOn = new Set(modules.flatMap((m) => m.dependsOn ?? []));
  for (const m of modules) {
    const isEntry = /main$/.test(m.id) || (m.exposes ?? []).some((e) => /entry point/i.test(String(e)));
    if (!dependedOn.has(m.id) && !isEntry) {
      problems.push(`module "${m.id}" is depended on by nothing and is not an entry point — it would never run`);
    }
    // The fourth instance, never patched: clearing declared plots and called none of its
    // four functions.
    //
    // Scoped to modules that expose *callables*. A module exposing only data — `config`
    // exposes the `GameConfig` table — is consumed by requiring it, and there is no
    // function call to find. Flagging those made every module depending on config look
    // broken, which is a check nobody would keep.
    for (const dep of m.dependsOn ?? []) {
      const d = byId.get(dep);
      if (!d) continue;
      const callables = (d.exposes ?? []).filter((e) => /\(/.test(String(e)));
      if (!callables.length) continue;
      if (!(tech.interfaces ?? []).length) continue; // no interface list yet to check against
      const usesIt = (tech.interfaces ?? []).some((i) => i.module === dep)
        || [...(tech.wiring?.onJoin ?? []), ...(tech.wiring?.onSpawn ?? []), ...(tech.wiring?.onLeave ?? [])]
          .some((s) => s.module === dep);
      if (!usesIt) {
        problems.push(`module "${m.id}" depends on "${dep}", which exposes ${callables.length} function(s), but no interface or wiring step connects them — either the edge is dead or a function is missing`);
      }
    }
  }

  /* ---- outputs: a module that fires a channel must be able to reach it ---- */

  // The fifth instance of the same defect, found by the third build trial. `clearing` was
  // required by `wiring` to fire FindRevealed and AreaRestored, did not depend on
  // `protocol`, and `protocol.REMOTES` returns names rather than Instances. So the module
  // owning two outputs had no path to either, exactly like `walkSpeed` before it.
  //
  // The rule missed it because the requirement lived in wiring prose. `fires` makes the
  // claim structural, the same way `applies` did for upgrades.
  const remoteOwners = modules.filter((m) => (m.exposes ?? []).some((e) => /REMOTES/.test(String(e))));
  for (const m of modules) {
    const fires = m.fires ?? [];
    if (!fires.length) continue;
    if (!remoteOwners.length) {
      problems.push(`module "${m.id}" fires ${fires.length} channel(s) but no module owns the remote list`);
      continue;
    }
    const reachable = remoteOwners.some((o) => (m.dependsOn ?? []).includes(o.id));
    if (!reachable) {
      problems.push(
        `module "${m.id}" fires ${fires.map((f) => `"${f}"`).join(', ')} but does not depend on `
        + `${remoteOwners.map((o) => `"${o.id}"`).join(' or ')}, which owns the channels — `
        + 'it has an output and no way to reach it',
      );
    }
    // Firing a name nobody declared is the same defect pointed the other way.
    const declared = new Set(remoteOwners.flatMap((o) => o.declaresRemotes ?? []));
    if (declared.size) {
      for (const f of fires) {
        if (!declared.has(f)) problems.push(`module "${m.id}" fires "${f}", which is not a declared remote`);
      }
    }
  }

  /* ---- state: every field needs a writer that exists, and a constructor ---- */

  const fields = tech.stateShape?.fields ?? [];
  for (const f of fields) {
    if (f?.writtenBy && !byId.has(f.writtenBy)) {
      problems.push(`state field "${f.name}" is written by "${f.writtenBy}", which is not a module`);
    }
  }
  const constructed = new Set((tech.wiring?.constructs ?? []).flatMap((c) => c.initialises ?? []));
  if (constructed.size) {
    for (const f of fields) {
      if (f?.persisted && !constructed.has(f.name)) {
        problems.push(`state field "${f.name}" is persisted but nothing in wiring.constructs initialises it — a new player starts with it undefined`);
      }
    }
    for (const name of constructed) {
      if (!fields.some((f) => f.name === name)) {
        problems.push(`wiring.constructs initialises "${name}", which is not a state field`);
      }
    }
  }

  /* ---- representation: every subject must be something the game contains ---- */

  const subjects = new Set((tech.representation ?? []).map((r) => r.subject));
  for (const need of ['patch', 'relic']) {
    if (subjects.size && !subjects.has(need)) {
      problems.push(`representation does not say what a "${need}" is made of, and the game contains them`);
    }
  }

  /* ---- interfaces must belong to modules that exist and declare them ---- */

  for (const i of tech.interfaces ?? []) {
    const m = byId.get(i.module);
    if (!m) {
      problems.push(`interface ${i.module}.${i.fn} names a module that does not exist`);
      continue;
    }
    const declared = (m.exposes ?? []).some((e) => String(e).startsWith(i.fn.replace(/\(.*/, '')));
    if (!declared) {
      problems.push(`interface ${i.module}.${i.fn} is not in that module's exposes list — the two disagree about its surface`);
    }
  }

  return problems;
}

export function validateTech(techManifest, creativeManifest = {}) {
  const { problems, missing } = validateShapes(TECH_SCHEMA, techManifest);
  if (!missing.length) problems.push(...unconnected(creativeManifest, techManifest));
  return { problems, missing };
}
