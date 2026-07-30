/**
 * Template validation.
 *
 * A generated template is untrusted structure. Before any screen is allowed to
 * use it, it must survive the whole pipeline against stress content: instantiate,
 * compile, render at every viewport, and pass the geometry and contrast rules.
 *
 * This is where the architecture pays off. Validating a template once covers
 * every screen that will ever use it — whereas validating per screen means each
 * one rediscovers the same defect.
 */

import { instantiate } from './instantiate.mjs';
import { SPEC_PROPS } from '../compose/overrides.mjs';
import { transpile } from '../transpile/to-html.mjs';
import { renderAndMeasure } from '../render/browser.mjs';
import { validate as validateRender } from '../validate/rules.mjs';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const CONTROL_KEYS = new Set(['$repeat', '$if', '$chunk', 'as', 'node']);

/**
 * Stress content, not typical content.
 *
 * Long names and many items are what actually break layouts, and a template that
 * only works with three short labels is a template that will fail in production
 * on the first busy screen.
 */
export function stressContent() {
  return {
    title: 'LONGEST PLAUSIBLE TITLE',
    dismissible: true,
    chips: [
      { label: 'Primary', value: '128,400', icon: 'coin' },
      { label: 'Second', value: '9,999,999', icon: 'gem' },
    ],
    items: Array.from({ length: 6 }, (_, i) => ({
      name: ['Short', 'A Much Longer Name', 'Mid Length', 'Tiny', 'Another Long One', 'Ok'][i],
      price: ['1,250,000', 'EQUIP', '25,000', 'CLAIM', '999', 'LOCKED'][i],
      art: `stress-${i}`,
      badge: i % 2 ? 'BEST' : null,
    })),
    cta: { label: 'PRIMARY ACTION', emphasis: 'primary' },
  };
}

/** Structural check on the template document itself. */
export function lintTemplate(template) {
  const problems = [];
  if (!template?.id) problems.push('template is missing "id"');
  if (!template?.root) problems.push('template is missing "root"');

  // A root with nothing in it passes every downstream gate: no overflow, no
  // contrast failures, no undersized buttons — because there is nothing to
  // check. An empty template is the one shape that satisfies a validator by
  // being vacuous, so it has to be rejected explicitly.
  if (template?.root && !(template.root.children ?? []).length
      && template.root.$repeat === undefined && template.root.$if === undefined) {
    problems.push('root has no children — the template renders nothing');
  }

  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return;

    if (node.$repeat !== undefined || node.$if !== undefined) {
      if (!node.node) problems.push(`${path}: control node needs a "node" child`);
      // A control node may also carry spec properties — that form means "this
      // container, whose children repeat". Only genuinely unknown keys are an
      // error, so those are checked the same way as on any other node.
      const extra = Object.keys(node).filter((k) => !CONTROL_KEYS.has(k) && k !== 'children');
      const unknown = extra.filter((k) => !SPEC_PROPS.has(k));
      if (unknown.length) problems.push(`${path}: unknown propert${unknown.length === 1 ? 'y' : 'ies'} ${unknown.join(', ')}`);
      walk(node.node, `${path}>node`);
      for (const [i, child] of (node.children ?? []).entries()) walk(child, `${path}>${i}`);
      return;
    }

    const unknown = Object.keys(node).filter((k) => k !== 'children' && !SPEC_PROPS.has(k));
    if (unknown.length) {
      problems.push(`${path}: unknown propert${unknown.length === 1 ? 'y' : 'ies'} ${unknown.join(', ')}`);
    }
    for (const [i, child] of (node.children ?? []).entries()) {
      walk(child, `${path}>${node.name ?? node.class ?? i}`);
    }
  };
  walk(template.root, 'root');
  return problems;
}

/**
 * Full proof: lint, instantiate under stress, render, measure.
 *
 * @param {object} opts { template, theme, viewports, viewportTable, outDir }
 */
export async function proveTemplate({ template, theme, viewports, viewportTable, outDir }) {
  const problems = lintTemplate(template);
  if (problems.length) return { ok: false, stage: 'lint', problems };

  let spec;
  try {
    spec = instantiate(template, stressContent(), { name: `${template.id}-proof` });
  } catch (err) {
    return { ok: false, stage: 'instantiate', problems: [err.message] };
  }

  await mkdir(outDir, { recursive: true });
  const findings = [];
  for (const vpKey of viewports) {
    const viewport = viewportTable[vpKey];
    let html;
    try {
      ({ html } = transpile(spec, theme, { viewport, background: '#6E6E73', viewportClass: vpKey }));
    } catch (err) {
      return { ok: false, stage: 'transpile', problems: [`${vpKey}: ${err.message}`] };
    }
    const htmlPath = resolve(outDir, `${template.id}.proof.${vpKey}.html`);
    const pngPath = resolve(outDir, `${template.id}.proof.${vpKey}.png`);
    // eslint-disable-next-line no-await-in-loop
    await writeFile(htmlPath, html, 'utf8');
    // eslint-disable-next-line no-await-in-loop
    const snapshot = await renderAndMeasure(htmlPath, viewport, { pngPath, focus: spec.focus });
    const r = validateRender(snapshot, { theme, stage: [0x6e, 0x6e, 0x73] });
    for (const f of r.findings.filter((x) => x.severity === 'error')) {
      findings.push(`${vpKey}/${f.rule} ${f.label}: ${f.detail}`);
    }

    // Content coverage. The geometry rules confirm nothing is BROKEN; this
    // confirms something is actually THERE. A template that ignores the content
    // it was handed renders a coloured rectangle and passes everything else.
    const rendered = snapshot.nodes.map((n) => n.text ?? '').join(' ');
    const stress = stressContent();
    const missing = [];
    if (!rendered.includes(stress.title)) missing.push('the title');
    const shownItems = stress.items.filter((i) => rendered.includes(i.name)).length;
    if (shownItems < stress.items.length) {
      missing.push(`${stress.items.length - shownItems} of ${stress.items.length} item names`);
    }
    if (!stress.chips.every((c) => rendered.includes(c.value))) missing.push('chip values');
    if (!rendered.includes(stress.cta.label)) missing.push('the CTA label');
    if (missing.length) {
      findings.push(`${vpKey}/content-coverage: template never renders ${missing.join(', ')}`);
    }
  }

  return findings.length
    ? { ok: false, stage: 'render', problems: findings }
    : { ok: true, stage: 'passed', problems: [] };
}
