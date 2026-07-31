/**
 * Both manifests, as one graph.
 *
 * WHY THIS REPLACED SIX HAND-WRITTEN CHECKS
 * ----------------------------------------
 * Four build trials produced seven defects with one shape: something is declared and nothing
 * connects to it. An upgrade nothing computes. A value computed and never applied. A state
 * field written and never constructed. A dependency edge nothing uses. An output channel with
 * no path to it. A field pushed to state and never sent to the player.
 *
 * Each got its own check, written after the trial that found it. That is a workaround, and
 * the shape of the workaround predicted the next defect: at six checks, the two manifests
 * carried **fourteen** distinct edge kinds, so eight relationships were unchecked and the
 * seventh defect was going to come from one of them.
 *
 * The root cause is that the manifest *is* a graph and was never written as one. Nodes were
 * scattered across `modules`, `upgrades`, `stateShape.fields`, `interfaces`, `representation`
 * and `declaresRemotes`; edges across fourteen ad-hoc fields; and every new relationship
 * needed a human to remember to write a new check.
 *
 * So: three tables and one traversal.
 *
 *   NODE_SOURCES   where nodes come from
 *   EDGE_SOURCES   where edges come from
 *   REQUIREMENTS   which edges must touch each kind of node, and what it means if none does
 *
 * The tables are data. The algorithm is one function. **Adding a relationship means adding a
 * row, and it is checked from that moment on** — which is the property the six checks did not
 * have and could not be given.
 */

/** A node id is `type:name`, so the graph is one flat namespace. */
import { SCHEMA as CREATIVE_SCHEMA } from '../bridge/schema.mjs';
import { TECH_SCHEMA } from './schema.mjs';

const id = (type, name) => `${type}:${name}`;

/** Read `a.b[].c` style paths against a manifest, yielding every leaf. */
function at(root, path) {
  let level = [root];
  for (const step of path.split('.')) {
    const next = [];
    for (const v of level) {
      if (v === undefined || v === null) continue;
      if (step === '[]') {
        if (Array.isArray(v)) next.push(...v);
      } else if (Array.isArray(v)) {
        for (const item of v) if (item?.[step] !== undefined) next.push(item[step]);
      } else if (v[step] !== undefined) {
        next.push(v[step]);
      }
    }
    level = next;
  }
  return level;
}

/**
 * Every node in the graph, and which manifest it lives in.
 *
 * `at` is called with the path minus its trailing field, then the field is read off each
 * object, so `modules.[].id` yields every module id.
 */
const NODE_SOURCES = [
  { type: 'module', from: 'tech', path: 'modules.[].id' },
  { type: 'upgrade', from: 'creative', path: 'upgrades.[].id' },
  { type: 'field', from: 'tech', path: 'stateShape.fields.[].name' },
  { type: 'subject', from: 'tech', path: 'representation.[].subject' },
  { type: 'channel', from: 'tech', path: 'modules.[].declaresRemotes.[]' },
  // An interface node is `module.fn`, so two modules may expose the same function name.
  { type: 'fn', from: 'tech', path: 'interfaces.[]', map: (i) => `${i.module}.${String(i.fn).replace(/\(.*/, '')}` },
  // Also from `exposes`, or a module offering something the interfaces list has not caught up
  // with reads as an edge to a node that does not exist rather than as the real finding: an
  // interface nobody resolved.
  {
    type: 'fn',
    from: 'tech',
    path: 'modules.[]',
    mapMany: (m) => (m.exposes ?? [])
      .map((e) => String(e).replace(/\(.*/, '').trim())
      .filter((n) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(n))
      .map((n) => `${m.id}.${n}`),
  },
  // A module's `reads` names keys from either contract, so both supply contractKey nodes.
  // Scoping this to the creative manifest alone reported 40 phantom problems on the first
  // run, because every module reading `tree` looked like it read something that did not
  // exist.
  { type: 'contractKey', from: 'creative', path: '__keys' },
  { type: 'contractKey', from: 'tech', path: '__keys' },
];

/**
 * Every edge, as (kind, from-node, to-node).
 *
 * `each` walks a collection and returns [fromId, toIds[]] pairs. This is the one place in the
 * codebase that knows where a relationship is written down.
 */
const EDGE_SOURCES = [
  {
    kind: 'dependsOn',
    each: (c, t) => (t.modules ?? []).map((m) => [id('module', m.id), (m.dependsOn ?? []).map((d) => id('module', d))]),
  },
  {
    kind: 'reads',
    each: (c, t) => (t.modules ?? []).map((m) => [id('module', m.id), (m.reads ?? []).map((k) => id('contractKey', k))]),
  },
  {
    kind: 'applies',
    each: (c, t) => (t.modules ?? []).map((m) => [id('module', m.id), (m.applies ?? []).map((u) => id('upgrade', u))]),
  },
  {
    kind: 'fires',
    each: (c, t) => (t.modules ?? []).map((m) => [id('module', m.id), (m.fires ?? []).map((r) => id('channel', r))]),
  },
  {
    kind: 'declares',
    each: (c, t) => (t.modules ?? []).map((m) => [id('module', m.id), (m.declaresRemotes ?? []).map((r) => id('channel', r))]),
  },
  {
    kind: 'exposes',
    // An `exposes` entry is prose-ish (`award(state, amount)`); the fn node is `module.name`.
    each: (c, t) => (t.modules ?? []).map((m) => [
      id('module', m.id),
      (m.exposes ?? [])
        .map((e) => String(e).replace(/\(.*/, '').trim())
        .filter((n) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(n))
        .map((n) => id('fn', `${m.id}.${n}`)),
    ]),
  },
  {
    kind: 'declaresInterface',
    each: (c, t) => (t.interfaces ?? []).map((i) => [id('module', i.module), [id('fn', `${i.module}.${String(i.fn).replace(/\(.*/, '')}`)]]),
  },
  {
    kind: 'writes',
    each: (c, t) => (t.stateShape?.fields ?? []).map((f) => [id('module', f.writtenBy), [id('field', f.name)]]),
  },
  {
    kind: 'constructs',
    each: (c, t) => (t.wiring?.constructs ?? []).map((k) => [id('module', k.module), (k.initialises ?? []).map((f) => id('field', f))]),
  },
  {
    kind: 'creates',
    each: (c, t) => (t.representation ?? [])
      // `"nothing"` is the schema's way of saying a subject has no creator, so it must not
      // become an edge from a module called "nothing".
      .filter((r) => r.createdBy && r.createdBy !== 'nothing' && /^[a-z][a-z-]*$/.test(String(r.createdBy)))
      .map((r) => [id('module', r.createdBy), [id('subject', r.subject)]]),
  },
  {
    // Every wiring step is a call: `calledBy` invokes `module.fn`.
    kind: 'calls',
    each: (c, t) => {
      const phases = Object.entries(t.wiring ?? {})
        .filter(([k]) => k !== 'constructs')
        .flatMap(([, steps]) => (Array.isArray(steps) ? steps : []));
      const moduleIds = new Set((t.modules ?? []).map((m) => m.id));
      return phases
        // A step's `fn` is an edge only when it names a module function. Steps like
        // `player:LoadCharacter` are engine calls and have no node to point at.
        .filter((s) => s.module && s.fn && moduleIds.has(s.module) && !/[:.]/.test(String(s.fn).replace(/\(.*/, '')))
        .map((s) => [
          id('module', s.calledBy && moduleIds.has(s.calledBy) ? s.calledBy : s.module),
          [id('fn', `${s.module}.${String(s.fn).replace(/\(.*/, '')}`)],
        ]);
    },
  },
];

/**
 * What must touch each kind of node.
 *
 * Every row here is a defect a build trial actually found, or the same defect pointed at a
 * node type that has not failed yet. `why` is the message; it is written for whoever has to
 * fix it, not for whoever wrote the check.
 *
 * `unless` names an escape that is legitimately correct rather than a hole.
 */
const REQUIREMENTS = {
  upgrade: [
    { edge: 'applies', dir: 'in', why: 'no module applies it, so a player buys it and sees nothing change' },
  ],
  field: [
    { edge: 'writes', dir: 'in', why: 'no module writes it, so it never changes' },
    { edge: 'constructs', dir: 'in', why: 'nothing initialises it, so a new player starts with it undefined', unless: (n, g) => !g.meta.persisted.has(n.name) },
  ],
  channel: [
    { edge: 'declares', dir: 'in', why: 'no module owns it, so nobody can create the Instance' },
    { edge: 'fires', dir: 'in', why: 'nothing ever sends on it', unless: (n, g) => g.meta.clientFired.has(n.name) },
  ],
  fn: [
    { edge: 'exposes', dir: 'in', why: 'declared as an interface but its module does not expose it — the two disagree' },
    // The whole point of the interfaces key is that a builder never guesses a parameter. A
    // callable with no interface entry is a signature somebody will have to infer.
    {
      edge: 'declaresInterface',
      dir: 'in',
      why: 'exposed as a callable but has no interface entry, so its parameters are unresolved',
      unless: (n, g) => !g.meta.callables.has(n.name),
    },
    // No `calls` rule. The contract records lifecycle steps, not every call, so requiring a
    // caller per function reported 13 functions as dead that are called from inside another
    // module's implementation. Reachability is already covered one level up: a function on a
    // module nothing depends on is caught by the module rule.
  ],
  module: [
    { edge: 'dependsOn', dir: 'in', why: 'nothing depends on it, so it would never run', unless: (n, g) => g.meta.entryPoints.has(n.name) },
  ],
  subject: [
    { edge: 'creates', dir: 'in', why: 'nothing creates it', unless: (n, g) => g.meta.noInstance.has(n.name) },
  ],
  contractKey: [
    {
      edge: 'reads',
      dir: 'in',
      why: 'supplied but no module reads it, so the decision never reaches the build',
      // A key marked `consumedBy: 'tooling'` reaches the build by rejecting values rather
      // than by being read. `vocabulary` fails the merge on a banned word, which is stronger
      // than any module reading it.
      unless: (n, g) => g.meta.toolingKeys.has(n.name),
    },
  ],
};

export function buildGraph(creative, tech) {
  const nodes = new Map();
  const addNode = (type, name) => {
    if (name === undefined || name === null || name === '') return;
    const key = id(type, String(name));
    if (!nodes.has(key)) nodes.set(key, { key, type, name: String(name) });
  };

  const sources = { creative, tech };
  for (const spec of NODE_SOURCES) {
    const manifest = sources[spec.from];
    if (spec.path === '__keys') {
      for (const k of Object.keys(manifest)) addNode(spec.type, k);
      continue;
    }
    const parts = spec.path.split('.');
    const last = parts.pop();
    const collection = at(manifest, parts.join('.') || '__self');
    const items = parts.length ? collection : [manifest];
    for (const item of items) {
      const vals = last === '[]' ? (Array.isArray(item) ? item : []) : at(item, last);
      if (spec.map) {
        for (const o of (Array.isArray(item) ? item : [item])) addNode(spec.type, spec.map(o));
      } else if (spec.mapMany) {
        for (const o of (Array.isArray(item) ? item : [item])) for (const v of spec.mapMany(o)) addNode(spec.type, v);
      } else {
        for (const v of vals) addNode(spec.type, v);
      }
    }
  }

  const edges = [];
  for (const spec of EDGE_SOURCES) {
    for (const [from, tos] of spec.each(creative, tech) ?? []) {
      for (const to of tos ?? []) edges.push({ kind: spec.kind, from, to });
    }
  }

  // Facts the requirements table needs but cannot read off a node.
  const meta = {
    // Read the declared field. This used to infer an entry point from `/main$/` on the id or
    // from prose in `exposes` — and once the format rule outlawed that prose, the second half
    // matched nothing while the first half still guessed from a naming convention. A module
    // called `bootstrap` with `entryPoint: true` was reported as unreachable. Found by the
    // architect reading the check that had just demanded the field.
    entryPoints: new Set((tech.modules ?? []).filter((m) => m.entryPoint === true).map((m) => m.id)),
    persisted: new Set((tech.stateShape?.fields ?? []).filter((f) => f.persisted).map((f) => f.name)),
    // A client -> server channel is fired by a client module the server contract cannot see.
    clientFired: new Set((tech.interfaces ?? []).flatMap((i) => {
      if (typeof i.returns !== 'string' || !/client\s*->\s*server/i.test(i.returns)) return [];
      return [...i.returns.matchAll(/\b([A-Z][A-Za-z]+)\s*\(/g)].map((m) => m[1]);
    })),
    // Exposed names that carry parens are callables; a bare name is a data table.
    callables: new Set((tech.modules ?? []).flatMap((m) => (m.exposes ?? [])
      .filter((e) => /\(/.test(String(e)))
      .map((e) => `${m.id}.${String(e).replace(/\(.*/, '').trim()}`))),
    // A subject with no Instance has nothing to create.
    noInstance: new Set((tech.representation ?? []).filter((r) => r.kind === 'none').map((r) => r.subject)),
    // Keys enforced by tooling rather than read by a module, declared in the schemas.
    toolingKeys: new Set([
      ...Object.entries(CREATIVE_SCHEMA).filter(([, v]) => v.consumedBy === 'tooling').map(([k]) => k),
      ...Object.entries(TECH_SCHEMA).filter(([, v]) => v.consumedBy === 'tooling').map(([k]) => k),
    ]),
  };

  return { nodes, edges, meta };
}

/**
 * One traversal, every rule.
 *
 * @param {object} creative validated creative manifest
 * @param {object} tech validated technical manifest
 */
export function graphProblems(creative, tech) {
  const graph = buildGraph(creative, tech);
  const { nodes, edges } = graph;
  const problems = [];

  const inbound = new Map();
  const outbound = new Map();
  for (const e of edges) {
    if (!inbound.has(e.to)) inbound.set(e.to, []);
    inbound.get(e.to).push(e);
    if (!outbound.has(e.from)) outbound.set(e.from, []);
    outbound.get(e.from).push(e);
  }

  // 1. An edge to or from a node that does not exist. Catches a typo, a renamed module, and
  //    a dependency on something deleted — without a check per edge kind.
  for (const e of edges) {
    for (const end of ['from', 'to']) {
      if (!nodes.has(e[end])) {
        const [type, name] = e[end].split(/:(.*)/s);
        problems.push(`${e.kind}: "${name}" is named as a ${type} but no such ${type} exists (${e.from} -> ${e.to})`);
      }
    }
  }

  // 2. Every node must be touched by the edges its type requires.
  for (const node of nodes.values()) {
    for (const rule of REQUIREMENTS[node.type] ?? []) {
      if (rule.unless?.(node, graph)) continue;
      const touching = (rule.dir === 'in' ? inbound : outbound).get(node.key) ?? [];
      if (!touching.some((e) => e.kind === rule.edge)) {
        problems.push(`${node.type} "${node.name}": ${rule.why}`);
      }
    }
  }

  // 3. Two modules claiming one exclusive relationship. Applies to any edge kind marked
  //    exclusive rather than to `applies` alone, which is how the original check was written.
  for (const kind of ['applies', 'declares', 'writes', 'creates']) {
    const byTarget = new Map();
    for (const e of edges.filter((x) => x.kind === kind)) {
      if (!byTarget.has(e.to)) byTarget.set(e.to, new Set());
      byTarget.get(e.to).add(e.from);
    }
    for (const [target, froms] of byTarget) {
      if (froms.size > 1) {
        const [type, name] = target.split(/:(.*)/s);
        problems.push(`${type} "${name}" is ${kind} by ${froms.size} modules (${[...froms].map((f) => f.split(':')[1]).join(', ')}); one owner or they race`);
      }
    }
  }

  // 4. A module that fires a channel must depend on the module that declares it. This is the
  //    one rule about a *pair* of edges rather than a node, and it generalises the
  //    output-with-no-path defect to any channel owner.
  const declaredBy = new Map();
  for (const e of edges.filter((x) => x.kind === 'declares')) declaredBy.set(e.to, e.from);
  for (const e of edges.filter((x) => x.kind === 'fires')) {
    const owner = declaredBy.get(e.to);
    if (!owner || owner === e.from) continue;
    const deps = (outbound.get(e.from) ?? []).filter((x) => x.kind === 'dependsOn').map((x) => x.to);
    if (!deps.includes(owner)) {
      problems.push(`module "${e.from.split(':')[1]}" fires "${e.to.split(':')[1]}" but does not depend on `
        + `"${owner.split(':')[1]}", which declares it — an output with no way to reach it`);
    }
  }

  return problems;
}

/** For reporting: how much of the graph exists, so growth is visible. */
export function graphSummary(creative, tech) {
  const { nodes, edges } = buildGraph(creative, tech);
  const byType = {};
  for (const n of nodes.values()) byType[n.type] = (byType[n.type] ?? 0) + 1;
  const byKind = {};
  for (const e of edges) byKind[e.kind] = (byKind[e.kind] ?? 0) + 1;
  return { nodes: nodes.size, edges: edges.length, byType, byKind };
}
