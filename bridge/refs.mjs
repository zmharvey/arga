/**
 * Reference resolution for keys that cite other keys by path.
 *
 * WHY THIS EXISTS
 * ---------------
 * Across seven waves the single most-repeated defect was a field path quoted from memory
 * instead of read. Not a disagreement, not a bad decision — a string that looks like a
 * citation and resolves to nothing. It reads as safe, which is what makes it expensive.
 *
 * The census, all found by domains reading each other's work rather than by any gate:
 *
 *   `collection.total`            five sheets, three spellings, three categories. The key has
 *                                 className, classPlural, relicsPerArea, areasPerDepth, sets.
 *   `config.collection.totalFinds` a RUNTIME condition. `totalFinds()` is a local helper in
 *                                 HudBinding.luau; a nil compare in Luau is silently falsy, so
 *                                 the terminal state would simply never have fired.
 *   `styleGuide.roles.clearedStone` three domains, three spellings, one field.
 *   `environment.perLaneInstances` in the one sheet whose entire content is other keys' numbers.
 *   `collection.sets[].relics[].name` inside a NEIGHBOURING KEY'S OWN VALUE.
 *
 * A verifier can catch these one at a time forever. This module catches the class.
 *
 * WHY A REGISTRY AND NOT A DISCRIMINATOR
 * -------------------------------------
 * The obvious design is to deep-walk every merged value and treat any object with a `kind`
 * field as a reference. That breaks immediately: `economyHealth.readings[].alarm[].kind` is
 * live with `relative`/`invariant`/`share`/`absolute` — same field name, disjoint values,
 * inside a key being migrated. A walker would try to resolve an alarm as a reference.
 *
 * So a citing key DECLARES where its references live (`refSites`) and the resolver expands
 * only those. Outside a registered site, `kind` means nothing. The collision becomes
 * structurally impossible rather than whitelisted around.
 *
 * The KPI domain chose this over a discriminator on cost-to-check, and the argument is worth
 * keeping: verifying a discriminator means proving no intended reference forgot the flag,
 * which is a negative and unprovable. A registry is one bounded traversal. `refCount` closes
 * the only hole a registry has — an omitted site — with an integer comparison.
 *
 * RESOLUTION IS A TRIPLE, NOT A BOOLEAN
 * -------------------------------------
 * `absent` (the path does not exist — a problem), `present`, and `absentByDesign` (the value
 * equals a sentinel `tech/deploy/02` mandates: false, {}, 0, "none", or a more specific one a
 * key declares for itself). A sentinel is not a zero, and reading it as one is how a bay with
 * no Finds would report a perfect reveal gap.
 *
 * PROPOSALS RESOLVE TOO
 * ---------------------
 * The resolver runs against merged ∪ proposals. `merge.mjs` never merges a proposal, so a
 * proposed key's value never reaches the emitter and `deploy/02`'s null rule cannot fire on
 * it — which means nulls genuinely persist on the proposal side for as long as any citing key
 * is unpromoted. Today that is all of them. `presentButNull` therefore has a live case and is
 * not merely defensive.
 */

/** A path segment: an identifier, optionally subscripted. */
const SEGMENT = /^([A-Za-z_][A-Za-z0-9_]*)(?:\[(\*|\?|\d+|"[^"]*")\])?$/;

/**
 * Sentinels `tech/deploy/02` mandates for "this field has no value", by type.
 *
 * An emitted config cannot carry an explicit null — `emit-config.mjs` maps it to nil and Luau
 * drops the key, so a reader cannot tell "no value" from "never emitted". A key may declare a
 * more specific sentinel for itself: `mix` declares `""` because `SoundId` is a ContentId
 * string with an empty engine default, and `products` keeps `0` because a game-pass id is a
 * number. Neither transfers to the other.
 */
const SENTINELS = new Set(['none', 'unbounded', '']);
const isSentinel = (v) =>
  v === false || v === 0 || (typeof v === 'string' && SENTINELS.has(v))
  || (v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0);

/** Parse a dotted path into segments, or return null with the reason. */
export function parsePath(path) {
  if (typeof path !== 'string' || path === '') return { error: 'path must be a non-empty string' };
  const parts = path.split('.');
  const segs = [];
  for (const p of parts) {
    const m = SEGMENT.exec(p);
    if (!m) return { error: `segment "${p}" is not IDENT or IDENT[subscript]` };
    const [, ident, sub] = m;
    // A bare numeric segment (`areas.0.patchCount`) is a parse failure rather than an index:
    // an index belongs inside brackets, and admitting both spellings is how one field ends up
    // with two paths that both "work" until one of them does not.
    segs.push({ ident, sub: sub ?? null });
  }
  return { segs };
}

/**
 * Walk one parsed path against a root value.
 *
 * Quantifiers, which exist because a target is often a column rather than a cell:
 *   [*]  ALL   — every element must carry the remainder
 *   [?]  ANY   — at least one must
 *   [n]  EXACT — that index, or that key for a string subscript
 */
function walk(root, segs) {
  let cursors = [root];
  for (let i = 0; i < segs.length; i += 1) {
    const { ident, sub } = segs[i];
    const next = [];
    for (const c of cursors) {
      if (c === null || c === undefined || typeof c !== 'object') return { status: 'absent' };
      const v = c[ident];
      if (v === undefined) return { status: 'absent' };
      if (sub === null) { next.push(v); continue; }
      if (!Array.isArray(v)) return { status: 'absent' };
      if (sub === '*') next.push(...v);
      else if (sub === '?') {
        // ANY has to branch here rather than fan out. Fanning out and letting the next segment
        // reject the first element that lacks the field is ALL wearing a `?` — which is what
        // this did until a test asked it the difference. Resolve the remainder per element and
        // keep the ones that carry it; the quantifier is satisfied if any does.
        if (!v.length) return { status: 'absent' };
        const rest = segs.slice(i + 1);
        const hits = v.map((el) => walk(el, rest)).filter((r) => r.status !== 'absent');
        if (!hits.length) return { status: 'absent' };
        const values = hits.flatMap((h) => h.values ?? []);
        return values.every(isSentinel) ? { status: 'absentByDesign', values } : { status: 'present', values };
      }
      else if (/^\d+$/.test(sub)) {
        if (v[+sub] === undefined) return { status: 'absent' };
        next.push(v[+sub]);
      } else {
        // A quoted subscript selects by a row's `id`, `name` or `key` — the three spellings
        // the sheets actually use for a row's identity.
        const want = sub.slice(1, -1);
        const row = v.find((r) => r && (r.id === want || r.name === want || r.key === want));
        if (row === undefined) return { status: 'absent' };
        next.push(row);
      }
    }
    cursors = next;
    if (!cursors.length) return { status: 'absent' };
  }
  if (cursors.some((v) => v === undefined)) return { status: 'absent' };
  if (cursors.every(isSentinel)) return { status: 'absentByDesign', values: cursors };
  return { status: 'present', values: cursors };
}

/**
 * Resolve every declared reference across a manifest and its proposals.
 *
 * @param {object} merged   the merged manifest
 * @param {{key: string, value: any}[]} proposals  keys collected but not merged
 * @returns {{problems: string[], notes: string[], resolved: number, pending: number}}
 */
export function resolveRefs(merged, proposals = []) {
  const problems = [];
  const notes = [];
  const universe = { ...merged };
  for (const p of proposals) universe[p.key] = p.value;

  const citing = Object.entries(universe).filter(([, v]) => v && v.refShape === 1);
  let resolved = 0;
  let pending = 0;

  for (const [key, value] of citing) {
    if (!Array.isArray(value.refSites)) {
      // Declaring `refShape` without a registry is the half-migration: the key says its refs
      // have the right shape but not where they are, so nothing can check them. A note rather
      // than a problem, because it hardens once every citing key carries one.
      notes.push(`${key}: carries refShape 1 but no refSites[], so its references are undeclared and unchecked`);
      continue;
    }

    let found = 0;
    for (const site of value.refSites) {
      const parsed = parsePath(site);
      if (parsed.error) {
        problems.push(`${key}.refSites: "${site}" is not a legal path — ${parsed.error}`);
        continue;
      }
      const at = walk(value, parsed.segs);
      if (at.status === 'absent') {
        problems.push(`${key}.refSites names "${site}", which does not exist in this key`);
        continue;
      }
      for (const ref of at.values ?? []) {
        if (!ref || typeof ref !== 'object') continue;
        found += 1;
        problems.push(...checkRef(key, site, ref, universe));
        if (ref.kind === 'manifestField' && ref.path) {
          const head = String(ref.path).split(/[.[]/)[0];
          if (proposals.some((p) => p.key === head)) pending += 1; else resolved += 1;
        }
      }
    }

    if (typeof value.refCount === 'number' && value.refCount !== found) {
      problems.push(`${key}.refCount says ${value.refCount} but its refSites expand to ${found}. `
        + `A registry's only hole is an omitted site, and this integer is what closes it.`);
    }
  }

  return { problems, notes, resolved, pending };
}

/** One reference, checked against the universe of merged keys plus proposals. */
function checkRef(key, site, ref, universe) {
  const problems = [];
  const where = `${key} at ${site}`;

  // Dispatch on `kind` and never infer from a null path: a `manifestField` with no path is a
  // sheet that forgot, and a `briefLine` with no path is correct by construction. Folding them
  // together loses exactly the distinction the field exists to make.
  const kind = ref.kind;
  if (kind === undefined) {
    problems.push(`${where}: a registered reference must carry "kind" (manifestField | commandOutput | briefLine)`);
    return problems;
  }
  if (kind === 'briefLine') {
    if (!ref.sheet) problems.push(`${where}: kind briefLine must name the "sheet" it quotes`);
    return problems;
  }
  if (kind === 'commandOutput') {
    if (!ref.command || !ref.field) problems.push(`${where}: kind commandOutput needs both "command" and "field"`);
    return problems;
  }
  if (kind !== 'manifestField') {
    problems.push(`${where}: unknown reference kind "${kind}"`);
    return problems;
  }

  if (!ref.path) {
    problems.push(`${where}: kind manifestField must carry a "path"`);
    return problems;
  }
  const parsed = parsePath(ref.path);
  if (parsed.error) {
    problems.push(`${where}: path "${ref.path}" is not legal — ${parsed.error}`);
    return problems;
  }

  // A numeric literal in a path is legal only inside brackets. K5 — the rule that a target is
  // a pointer and never a copied number — is enforced on the ROW rather than on the path, so
  // the two do not contradict each other.
  const head = parsed.segs[0].ident;
  if (!(head in universe)) {
    problems.push(`${where}: path "${ref.path}" names key "${head}", which no sheet supplies or proposes`);
    return problems;
  }

  const at = walk(universe[head], parsed.segs.slice(1));
  if (at.status === 'absent') {
    problems.push(`${where}: path "${ref.path}" does not resolve. The key exists; the field does not.`);
  } else if (at.status === 'absentByDesign' && ref.requireNonNull) {
    // `requireNonNull` has to fail on a sentinel as well as on a null, or it guards nothing
    // once `deploy/02` replaces the nulls it was written against.
    problems.push(`${where}: path "${ref.path}" resolves to a sentinel and this reference sets requireNonNull`);
  }

  for (const also of ref.alsoReads ?? []) {
    const p2 = parsePath(also);
    if (p2.error) { problems.push(`${where}: alsoReads "${also}" is not legal — ${p2.error}`); continue; }
    const h2 = p2.segs[0].ident;
    if (!(h2 in universe)) { problems.push(`${where}: alsoReads "${also}" names unknown key "${h2}"`); continue; }
    if (walk(universe[h2], p2.segs.slice(1)).status === 'absent') {
      problems.push(`${where}: alsoReads "${also}" does not resolve`);
    }
  }
  return problems;
}

/**
 * `sharedPredicate` blocks: one fact, one home, two readers.
 *
 * Two domains inverted twice in three rounds over one field — each adopting the other's
 * PREVIOUS position, both correct alone, contradictory jointly. The instrument that stops it
 * is a block naming the definer, the readers and the mapping in one place, so neither key
 * yields to the other because neither is the source.
 *
 * The third assertion is the one neither block had and the Analytics verifier asked for:
 * `definedBy` must name the key CARRYING the block. Without it, two keys can each define a
 * block for the other's field — reproducing the inversion inside the mechanism built to
 * prevent it. That failure mode is not hypothetical; it is what happened, twice.
 */
export function sharedPredicateProblems(merged, proposals = []) {
  const problems = [];
  const universe = { ...merged };
  for (const p of proposals) universe[p.key] = p.value;

  const claimed = new Map();
  for (const [key, value] of Object.entries(universe)) {
    const sp = value && value.sharedPredicate;
    if (!sp || typeof sp !== 'object') continue;

    if (sp.definedBy !== key) {
      problems.push(`${key}.sharedPredicate.definedBy is "${sp.definedBy}", not "${key}". `
        + `A block must be carried by the key that defines the fact, or two keys can each define one for the other.`);
    }
    if (typeof sp.field !== 'string' || parsePath(sp.field).error) {
      problems.push(`${key}.sharedPredicate.field must be a path, not a bare name — `
        + `uniqueness is undefined otherwise, and two blocks at "CustomField03" would collide falsely.`);
    } else if (claimed.has(sp.field)) {
      problems.push(`${key}.sharedPredicate.field "${sp.field}" is already claimed by ${claimed.get(sp.field)}. One fact, one home.`);
    } else {
      claimed.set(sp.field, key);
    }

    for (const r of sp.readBy ?? []) {
      const p2 = parsePath(r);
      if (p2.error) { problems.push(`${key}.sharedPredicate.readBy "${r}" is not a legal path`); continue; }
      const h = p2.segs[0].ident;
      if (!(h in universe)) problems.push(`${key}.sharedPredicate.readBy "${r}" names unknown key "${h}"`);
      else if (walk(universe[h], p2.segs.slice(1)).status === 'absent') {
        problems.push(`${key}.sharedPredicate.readBy "${r}" does not resolve`);
      }
    }
  }
  return problems;
}
