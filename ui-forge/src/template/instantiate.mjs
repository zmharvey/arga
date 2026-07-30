/**
 * Template instantiation — template + content -> spec.
 *
 * A template is a spec tree with three additions: `$repeat`, `$if`, and
 * `{{path}}` interpolation. That is the entire language, on purpose.
 *
 * Templates are DATA, never code. The creative department invents structure by
 * writing one of these, and it then gets exactly the same treatment as a
 * hand-written pattern: schema-checked, instantiated, compiled, rendered and
 * measured. An LLM emitting JavaScript that we execute would be a different
 * risk category for no extra expressiveness.
 *
 * Structure varies per template; the CONTENT SHAPE does not. Every template
 * consumes { title, dismissible, chips[], items[], cta } so templates stay
 * interchangeable and the brief designer never has to know which one it is
 * writing for.
 */

const BINDING = /\{\{\s*([\w.]+)\s*\}\}/g;

/** Resolve "item.name" against the current binding scope. */
function lookup(scope, path) {
  return path.split('.').reduce((cur, seg) => (cur == null ? undefined : cur[seg]), scope);
}

/**
 * Interpolate a string. A binding that is the WHOLE string yields the raw value
 * so non-strings survive; embedded bindings stringify, as they must.
 */
function interpolate(str, scope) {
  const whole = str.match(/^\{\{\s*([\w.]+)\s*\}\}$/);
  if (whole) return lookup(scope, whole[1]);
  return str.replace(BINDING, (_, path) => {
    const v = lookup(scope, path);
    return v === undefined || v === null ? '' : String(v);
  });
}

function resolveValue(value, scope) {
  if (typeof value === 'string') return interpolate(value, scope);
  if (Array.isArray(value)) return value.map((v) => resolveValue(v, scope));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveValue(v, scope)]));
  }
  return value;
}

/**
 * Expand one template node into zero or more spec nodes.
 * Returns an array because `$repeat` fans out and `$if` can erase.
 */
const CONTROL_ONLY = new Set(['$repeat', '$if', '$chunk', 'as', 'node']);

/** A control node that also carries real spec properties is a container. */
const isHybrid = (node) => Object.keys(node).some((k) => !CONTROL_ONLY.has(k));

function expand(node, scope, ctx) {
  if (!node || typeof node !== 'object') return [];

  if (node.$if !== undefined) {
    const value = lookup(scope, node.$if);
    const present = Array.isArray(value) ? value.length > 0 : Boolean(value);
    if (!present) return [];
    // Hybrid: the node itself is conditional, rather than wrapping something.
    if (isHybrid(node)) {
      const { $if, node: inner, ...rest } = node;
      return expand({ ...rest, children: inner ? [inner, ...(rest.children ?? [])] : rest.children }, scope, ctx);
    }
    return expand(node.node, scope, ctx);
  }

  // Hybrid repeat: a real container whose CHILDREN are the repetition. This is
  // the shape anyone reaches for first — "a ScrollingFrame of rows" — and
  // forcing a separate wrapper node was pure ceremony.
  if (node.$repeat !== undefined && isHybrid(node)) {
    const { $repeat, $chunk, as, node: inner, children = [], ...rest } = node;
    const repeated = expand({ $repeat, $chunk, as, node: inner }, scope, ctx);
    const fixed = children.flatMap((c) => expand(c, scope, ctx));
    const [container] = expand({ ...rest, children: [] }, scope, ctx);
    container.children = [...fixed, ...repeated];
    return [container];
  }

  if (node.$repeat !== undefined) {
    const list = lookup(scope, node.$repeat);
    if (!Array.isArray(list)) {
      throw new Error(`$repeat over "${node.$repeat}" but that is not an array`);
    }
    const alias = node.as ?? 'item';
    // `$chunk` groups the list into rows of N, so a template can express a grid
    // without the generator having to hand-roll row nodes.
    if (node.$chunk) {
      const size = Number(node.$chunk);
      const rows = Array.from({ length: Math.ceil(list.length / size) }, (_, i) => list.slice(i * size, i * size + size));
      return rows.flatMap((row, rowIndex) => expand(node.node, { ...scope, [alias]: row, rowIndex, $row: row }, ctx));
    }
    return list.flatMap((entry, index) => expand(node.node, { ...scope, [alias]: entry, index, i: index }, ctx));
  }

  // A plain node: resolve its own fields, then its children.
  const { children, ...fields } = node;
  const out = resolveValue(fields, scope);

  // Names must stay unique after a repeat, or overrides and calibration paths
  // collide. Suffix with the loop index when one is in scope.
  if (out.name && scope.index !== undefined && String(node.name).includes('{{') === false) {
    out.name = `${out.name}_${scope.index}`;
  }

  if (children) {
    out.children = children.flatMap((child) => expand(child, scope, ctx));
  }
  ctx.count++;
  return [out];
}

/**
 * @param {object} template  { id, root }
 * @param {object} content   { title, dismissible, chips, items, cta }
 * @returns {object} a spec ready for compose()/transpile()
 */
export function instantiate(template, content, meta = {}) {
  if (!template?.root) throw new Error('template must have a root node');
  const ctx = { count: 0 };
  const scope = { ...content, content };
  const roots = expand(template.root, scope, ctx);

  if (roots.length !== 1) {
    throw new Error(`template root must expand to exactly one node, got ${roots.length}`);
  }
  return {
    name: meta.name ?? template.id,
    screen: meta.screen,
    focus: template.focus ?? 'Panel',
    template: template.id,
    root: roots[0],
  };
}
