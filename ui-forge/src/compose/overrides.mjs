/**
 * Node overrides and slots.
 *
 * Variants cover the anticipated parameter space. These cover everything else —
 * specifically, a user looking at a built game and asking for a change nobody
 * enumerated in advance ("make the close button round", "put a timer above the
 * grid").
 *
 * The safety guarantee does NOT come from restricting what can be edited. It
 * comes from two invariants that hold however the tree was assembled:
 *   1. values are token references, so no invented colours or off-scale spacing
 *   2. the validator measures the real render, so no broken geometry ships
 *
 * Overrides are therefore allowed to touch any named node, and are applied
 * after the pattern builds — so the pattern stays the source of structure and
 * the override stays a visible, replayable diff on top of it.
 */

/**
 * Every property a spec node may carry.
 *
 * Overrides are validated against this because an unknown property is otherwise
 * silently ignored by the transpiler — the override appears to succeed, nothing
 * changes on screen, and there is no error anywhere. That is strictly worse than
 * failing: a plausible-looking `{ background: "surface.base" }` (the real key is
 * `bg`) would just quietly do nothing.
 */
export const SPEC_PROPS = new Set([
  'class', 'name', 'children', 'at',
  'size', 'pos', 'anchor', 'rotation', 'aspect', 'flex', 'zIndex', 'maxSize',
  'bg', 'bgTransparency', 'corner', 'stroke', 'gradient', 'padding', 'elevation',
  'layout', 'clip', 'scroll', 'bleed',
  'text', 'type', 'color', 'align', 'alignY', 'wrap', 'textTransparency', 'textStroke',
  'image', 'imageFit', 'imageTint', 'slice', 'placeholder', 'preview',
  'states', 'motion', 'state',
]);

/** Glob match supporting a trailing/leading `*` — "Item_*", "*Button". */
function globMatch(pattern, name) {
  if (pattern === name) return true;
  if (!pattern.includes('*')) return false;
  const rx = new RegExp(`^${pattern.split('*').map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*')}$`);
  return rx.test(name);
}

/** Depth-first walk yielding every node in the spec tree. */
function* walk(node) {
  yield node;
  for (const child of node.children ?? []) yield* walk(child);
}

/**
 * Apply `overrides` to a composed spec, in order.
 *
 * Each override is `{ node, set?, unset?, insert? }`:
 *   node   — exact name or glob ("Item_*")
 *   set    — properties replaced wholesale (property-level, not deep-merged,
 *            because a half-merged `size` is far more confusing than a replaced one)
 *   unset  — property names to delete
 *   insert — { position: 'before'|'after'|'firstChild'|'lastChild', nodes: [...] }
 *
 * Throws when a target matches nothing. A silently-ignored override is the
 * worst outcome here: the user sees no change and no error, and reports the
 * feature as broken.
 */
export function applyOverrides(spec, overrides = []) {
  const applied = [];

  for (const [i, ov] of overrides.entries()) {
    if (!ov.node) throw new Error(`overrides[${i}] is missing "node"`);

    const unknown = Object.keys(ov.set ?? {}).filter((k) => !SPEC_PROPS.has(k));
    if (unknown.length) {
      throw new Error(
        `overrides[${i}] targeting "${ov.node}" sets unknown propert${unknown.length === 1 ? 'y' : 'ies'}: ${unknown.join(', ')}.\n`
        + `  Valid properties: ${[...SPEC_PROPS].sort().join(', ')}`,
      );
    }

    // Re-walked per override so inserts from an earlier one are targetable.
    const all = [...walk(spec.root)];
    const parentOf = new Map();
    for (const n of all) for (const c of n.children ?? []) parentOf.set(c, n);

    const matches = all.filter((n) => n.name && globMatch(ov.node, n.name));
    if (!matches.length) {
      const names = [...new Set(all.map((n) => n.name).filter(Boolean))].sort();
      throw new Error(
        `overrides[${i}] targets "${ov.node}", which matches no node.\n`
        + `  Addressable nodes: ${names.join(', ')}`,
      );
    }

    for (const node of matches) {
      if (ov.set) Object.assign(node, ov.set);
      for (const key of ov.unset ?? []) delete node[key];

      if (ov.insert) {
        const { position = 'lastChild', nodes = [] } = ov.insert;
        if (position === 'firstChild' || position === 'lastChild') {
          node.children = node.children ?? [];
          node.children[position === 'firstChild' ? 'unshift' : 'push'](...structuredClone(nodes));
        } else {
          const parent = parentOf.get(node);
          if (!parent) throw new Error(`overrides[${i}] cannot insert ${position} the root node`);
          const at = parent.children.indexOf(node);
          parent.children.splice(position === 'before' ? at : at + 1, 0, ...structuredClone(nodes));
        }
      }
    }
    applied.push({ node: ov.node, matched: matches.length });
  }

  return { spec, applied };
}

/**
 * Fill pattern-declared slots. Slots are the sanctioned way to add structure
 * without knowing the pattern's internals; overrides are the escape hatch when
 * you do.
 */
export function applySlots(spec, slots = {}, declared = []) {
  for (const [name, nodes] of Object.entries(slots)) {
    if (!declared.includes(name)) {
      throw new Error(`Unknown slot "${name}"; this pattern declares: ${declared.join(', ') || '(none)'}`);
    }
    const host = [...walk(spec.root)].find((n) => n.name === `Slot_${name}`);
    if (!host) throw new Error(`Pattern declares slot "${name}" but emitted no Slot_${name} node`);
    host.children = [...(host.children ?? []), ...structuredClone(nodes)];
  }
  return spec;
}

/** Every addressable node name in a composed spec — the override target list. */
export function addressableNodes(spec) {
  return [...new Set([...walk(spec.root)].map((n) => n.name).filter(Boolean))].sort();
}
