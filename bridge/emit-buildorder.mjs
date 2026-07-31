/**
 * Build manifest -> a build order a builder agent executes one module at a time.
 *
 * The values half of this seam was solved by `emit-config.mjs`: a builder no longer
 * invents patch counts or cost curves. The structure half was not. Hand-building the
 * ruin loop produced ~620 lines of server and client architecture that came entirely
 * out of the builder's head — module boundaries, what each owns, what talks to what.
 * A second builder would have invented 620 different ones.
 *
 * So this emits the other half: modules in dependency order, each with its contract
 * values already resolved, its interface stated, its prohibitions listed, and its
 * acceptance criteria attached. A builder gets one module at a time and has to invent
 * implementation, not architecture.
 *
 * Deterministic, for the same reason as everything else at this seam: the judgement
 * about module boundaries happens once, in an Architecture sheet, and is recorded.
 * It is not re-derived per build by an agent that might slice it differently.
 */

/** Kahn's algorithm, stable: ties break alphabetically so the order is reproducible. */
function topoSort(modules) {
  const byId = new Map(modules.map((m) => [m.id, m]));
  const remaining = new Set(byId.keys());
  const done = new Set();
  const order = [];

  while (remaining.size) {
    const ready = [...remaining]
      .filter((id) => (byId.get(id).dependsOn ?? []).every((d) => done.has(d) || !byId.has(d)))
      .sort();
    if (ready.length === 0) {
      // The schema refuses cycles, so this is unreachable in a validated manifest.
      // Emit the rest in a stable order rather than looping forever.
      order.push(...[...remaining].sort().map((id) => byId.get(id)));
      break;
    }
    for (const id of ready) {
      order.push(byId.get(id));
      done.add(id);
      remaining.delete(id);
    }
  }
  return order;
}

const bullet = (items) => (items.length ? items.map((i) => `- ${i}`).join('\n') : '- none');

/**
 * Technical keys that describe the whole build rather than one module.
 *
 * These are read by most modules, so emitting them per module duplicated them badly: the
 * first build order after the architect stage landed was 6,427 lines, of which roughly 200k
 * characters were `interfaces` (14.8k chars) repeated for the ten modules that read it, plus
 * `tree` eleven times and `wiring` four.
 *
 * That is the same "same bytes delivered N times" waste the CID context pack was built to
 * remove, reappearing one stage down. A global fact belongs in one place a builder reads
 * once.
 *
 * `interfaces` is the exception that stays per module: a builder needs its own signatures
 * and its dependencies', and emphatically not the other eighteen.
 */
const GLOBAL_KEYS = ['tree', 'stateShape', 'wiring', 'representation'];

const jsonBlock = (key, value, provenance) => {
  const from = provenance[key] ? ` *(from ${provenance[key]})*` : '';
  return `#### \`${key}\`${from}\n\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
};

/**
 * @param {object} manifest validated build manifest
 * @param {Record<string,string>} provenance key -> sheet that provided it
 * @returns {string} markdown build order
 */
export function emitBuildOrder(manifest, provenance = {}) {
  const modules = manifest.modules ?? [];
  const ordered = topoSort(modules);
  const out = [];

  out.push(`# Build order

**Generated — do not edit.** Emitted by \`npm run bridge -- --emit\` from CID spec sheets.
Edit the Architecture sheet that owns the module list and re-emit.

**${ordered.length} modules, in dependency order.** Build them in this order and each one's
dependencies already exist. Every value a module needs is resolved below, so nothing here
requires reading a spec sheet or inventing a number.

**Two rules for whoever builds these:**

1. **Do not invent a value.** If you need a number that is not listed under your module's
   *Values*, that is a gap in the contract. Stop and report it rather than choosing one —
   a chosen number is indistinguishable from a specified one once it is in the code.
2. **The prohibitions are not advice.** A module's *Must not* list exists because the
   design breaks if it is violated, usually for a reason recorded in the brief.

UI modules are absent on purpose: screens come from \`ui-forge\` via
\`npm run emit\`, not from here.
`);

  /* ---------------- the technical layer, stated once for every module ---------------- */

  const globals = GLOBAL_KEYS.filter((k) => manifest[k] !== undefined);
  if (globals.length) {
    out.push(`
---

# How this build is put together

**Read this once. It applies to every module below**, so it is not repeated in each one.
These are the architect's decisions, not the designers': where code lives, what a player's
state looks like, what each object is made of, and what happens in what order.

${globals.map((k) => jsonBlock(k, manifest[k], provenance)).join('\n\n')}
`);
  }

  /**
   * A module's outputs, emitted because the module list is where they are declared.
   *
   * `fires` and `declaresRemotes` are checked by `architect/validate.mjs` — a module cannot
   * fire a channel it has no path to, or a name nobody declared. That check is worth nothing
   * if the declaration never reaches the person writing the code: the third build trial's
   * builder invented a recursive tree search for a RemoteEvent precisely because the brief it
   * was handed said which channels to fire and nothing about how to get one.
   */
  const outputs = (m) => {
    const rows = [];
    if ((m.declaresRemotes ?? []).length) {
      rows.push(`**Declares the remote channels:** ${m.declaresRemotes.map((r) => `\`${r}\``).join(', ')}. `
        + 'You create them and you resolve them; no other module may look one up.');
    }
    if ((m.fires ?? []).length) {
      rows.push(`**Fires:** ${m.fires.map((r) => `\`${r}\``).join(', ')}. `
        + 'Resolve each one through the module that declares the channel list — never by searching '
        + 'the tree, and never by a name you typed yourself.');
    }
    return rows.length ? `\n\n${rows.join('\n\n')}` : '';
  };

  ordered.forEach((m, i) => {
    // Per module: the creative values it reads, plus only the signatures it can actually
    // call — its own and its dependencies'. Handing a builder all 22 interfaces was how the
    // brief for one module reached 982 lines.
    const ownAndDeps = new Set([m.id, ...(m.dependsOn ?? [])]);
    const resolved = (m.reads ?? [])
      .filter((key) => !GLOBAL_KEYS.includes(key))
      .map((key) => {
        if (key === 'interfaces') {
          const mine = (manifest.interfaces ?? []).filter((i) => ownAndDeps.has(i.module));
          return jsonBlock('interfaces (yours and your dependencies\')', mine, provenance);
        }
        return jsonBlock(key, manifest[key], provenance);
      });

    out.push(`
---

## ${i + 1}. \`${m.id}\` — ${m.side}

**Write to:** \`${m.path}\`

**Owns:** ${m.responsibility}

**Depends on:** ${(m.dependsOn ?? []).length ? m.dependsOn.map((d) => `\`${d}\``).join(', ') : 'nothing'}${outputs(m)}

### Must expose

${m.entryPoint
      ? '- nothing. This is an entry point: the engine runs it, and no module may require it.'
      : bullet((m.exposes ?? []).map((e) => `\`${e}\``))}

### Must not

${bullet(m.forbids ?? [])}

### Values

${resolved.length ? resolved.join('\n\n') : '- reads nothing from the contract'}

### Done when

${(m.criteria ?? []).map((c, n) => `${n + 1}. ${c}`).join('\n')}
`);
  });

  const unread = Object.keys(manifest).filter((k) => k !== 'modules'
    && !modules.some((m) => (m.reads ?? []).includes(k)));
  out.push(`
---

## Coverage

Every contract key below is read by at least one module, or it is listed as unread. An
unread key is either a decision nothing needs — worth questioning — or a module that has
not been declared yet.

${unread.length ? bullet(unread.map((k) => `**${k}** is supplied but no module reads it`)) : '- every supplied key is read by a module'}
`);

  return out.join('');
}
