/**
 * forge — game idea to verified screens, in one run.
 *
 *   idea  ->  ideation department  ->  build  ->  verification
 *             (creative, LLM)         (pure)     (rules + vision)
 *
 * The stage boundaries are deliberate. Creative work happens ONLY in the first
 * stage and only through schema-validated output; the build stage is a pure
 * function that cannot drift; verification is arithmetic first and judgement
 * second. That ordering is what makes the output consistent rather than merely
 * sometimes good.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, basename } from 'node:path';

import { generateTheme } from './theme/generate.mjs';
import { compose } from './compose/index.mjs';
import { transpile } from './transpile/to-html.mjs';
import { renderAndMeasure } from './render/browser.mjs';
import { validate } from './validate/rules.mjs';
import { planScreens } from './ideate/screens.mjs';
import { designBrief } from './ideate/brief.mjs';
import { critique } from './ideate/critic.mjs';
import { directUI, generateTemplates } from './ideate/templates.mjs';
import { proveTemplate } from './template/validate.mjs';
import { instantiate } from './template/instantiate.mjs';

const STAGE_HEX = '#6E6E73';
const STAGE_RGB = [0x6e, 0x6e, 0x73];

/**
 * @param {object} opts
 *   ctx, root, outDir, viewports, model, log
 *   critic  — run the vision pass (costs a call per screen)
 *   max     — how many screens to plan
 */
export async function forge(opts) {
  const { ctx, outDir, viewports, model, log = () => {}, max = 4, critic: runCritic = true } = opts;
  const theme = generateTheme(ctx);
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'theme.json'), JSON.stringify(theme, null, 2), 'utf8');

  /* --- stage 0: creative direction + bespoke templates ------------------ */
  //
  // Templates are generated per game rather than chosen from a fixed library.
  // Creativity happens here, once; every screen then inherits it. A template
  // must PROVE it builds — instantiated with deliberately awkward content and
  // measured at every viewport — before any screen is allowed to use it.
  let templates = [];
  let direction = null;
  if (opts.templates !== false) {
    log(`\n[0/4] direction — inventing a UI language for "${ctx.title}"`);
    direction = await directUI(ctx, { model });
    log(`      "${direction.languageName}" — ${direction.thesis}`);
    for (const m of direction.motifs) log(`      · ${m}`);

    let feedback = null;
    for (let attempt = 1; attempt <= 3 && !templates.length; attempt++) {
      log(`\n[0/4] templates — authoring (attempt ${attempt})`);
      // eslint-disable-next-line no-await-in-loop
      const set = await generateTemplates({ ctx, direction, model, feedback });
      const failures = [...set.failures];
      for (const f of set.failures) log(`      FAIL  (parse) ${f.slice(0, 90)}…`);
      for (const t of set.templates) {
        // eslint-disable-next-line no-await-in-loop
        const proof = await proveTemplate({
          template: t, theme, viewports, viewportTable: opts.viewportTable,
          outDir: resolve(outDir, 'templates'),
        });
        if (proof.ok) {
          log(`      ok    ${t.id} — ${t.describes}`);
          templates.push(t);
        } else {
          log(`      FAIL  ${t.id} (${proof.stage}): ${proof.problems[0]}`);
          // Keep the rejected document. Diagnosing a failure from an error
          // string alone is guesswork; the tree that produced it is the evidence.
          // eslint-disable-next-line no-await-in-loop
          await writeFile(
            resolve(outDir, 'templates', `${t.id}.rejected.json`),
            JSON.stringify({ stage: proof.stage, problems: proof.problems, template: t }, null, 2),
            'utf8',
          );
          failures.push(
            `Template "${t.id}" failed at ${proof.stage}:\n${proof.problems.map((p) => `  - ${p}`).join('\n')}`
            // Naming `bleed` matters: "shrink it" is actively wrong advice for a
            // relief plate or edge rail that is SUPPOSED to overhang, and without
            // the alternative the model keeps re-sending the same design.
            + '\n  Either make the node fit inside its parent (drop positive offsets stacked on a'
            + ' scale of 1, avoid negative positions), OR — if the overhang is deliberate, such as'
            + ' an edge rail or an offset relief plate — set "bleed": true on that node and keep'
            + ' the design exactly as it is.',
          );
        }
      }
      feedback = failures.join('\n\n');
    }

    if (templates.length) {
      await writeFile(resolve(outDir, 'templates.json'),
        JSON.stringify({ direction, templates }, null, 2), 'utf8');
    } else {
      // Falling back is honest: a broken bespoke template is worse than a plain
      // one that works, and silently shipping either would hide the failure.
      log('      no generated template survived validation — falling back to modal-grid');
    }
  }

  /* --- stage 1: ideation ------------------------------------------------ */
  log(`\n[1/4] ideation — planning screens for "${ctx.title}"`);
  const plan = await planScreens(ctx, { model, max });
  log(`      premise: ${plan.premise}`);
  for (const s of plan.screens) log(`      - ${s.id.padEnd(16)} ${s.title}  (${s.pattern})`);

  const screens = [];
  for (const entry of plan.screens) {
    log(`\n[2/4] brief — ${entry.id}`);
    let designed;
    try {
      // eslint-disable-next-line no-await-in-loop
      designed = await designBrief({ screen: entry, ctx, premise: plan.premise, model });
    } catch (err) {
      // One bad screen must not sink the run; report it and keep going.
      log(`      SKIPPED: ${err.message.split('\n')[0]}`);
      continue;
    }
    log(`      ${designed.reasoning}`);
    log(`      items: ${designed.brief.content.items.map((i) => i.name).join(', ')}`);
    await writeFile(
      resolve(outDir, `${entry.id}.brief.json`),
      `${JSON.stringify(designed.brief, null, 2)}\n`,
      'utf8',
    );
    screens.push({ entry, brief: designed.brief });
  }

  /* --- stage 3 + 4: build and verify ------------------------------------ */
  const results = [];
  for (const { entry, brief } of screens) {
    log(`\n[3/4] build — ${entry.id}`);
    // A generated template is instantiated directly; compose() is the fallback
    // path through the hand-written pattern. Both produce the same spec shape,
    // so everything downstream is identical.
    const template = templates.length
      ? templates[entry.priority % templates.length]
      : null;
    const spec = template
      ? instantiate(template, brief.content, { name: entry.id, screen: entry.id })
      : compose(brief);
    if (template) log(`      template: ${template.id}`);

    const perViewport = [];
    for (const vpKey of viewports) {
      const viewport = opts.viewportTable[vpKey];
      const { html } = transpile(spec, theme, { viewport, background: STAGE_HEX, viewportClass: vpKey });
      const htmlPath = resolve(outDir, `${entry.id}.${vpKey}.html`);
      const pngPath = resolve(outDir, `${entry.id}.${vpKey}.png`);
      // eslint-disable-next-line no-await-in-loop
      await writeFile(htmlPath, html, 'utf8');
      // eslint-disable-next-line no-await-in-loop
      const snapshot = await renderAndMeasure(htmlPath, viewport, { pngPath, focus: spec.focus });
      const v = validate(snapshot, { theme, stage: STAGE_RGB });
      perViewport.push({ viewport: vpKey, pngPath, ...v });
    }

    const errors = perViewport.reduce((n, r) => n + r.errors, 0);
    log(`[4/4] verify — ${entry.id}: ${errors ? `${errors} rule error(s)` : 'rules clean'}`);
    for (const r of perViewport) {
      for (const f of r.findings) log(`      ${f.severity === 'error' ? 'x' : '!'} [${r.viewport}/${f.rule}] ${f.label}: ${f.detail}`);
    }

    let review = null;
    if (runCritic) {
      const desktop = perViewport.find((r) => r.viewport === 'desktop') ?? perViewport[0];
      // eslint-disable-next-line no-await-in-loop
      review = await critique({
        pngPath: desktop.pngPath,
        brief,
        theme,
        deterministicClean: errors === 0,
        model,
      });
      log(`      critic: ${review.verdict} (${review.score}/5)`);
      for (const s of review.strengths) log(`        + ${s}`);
      for (const f of review.findings) log(`        ${f.severity === 'major' ? '!!' : ' !'} ${f.issue}`);
    }

    results.push({ id: entry.id, brief, errors, viewports: perViewport, review });
  }

  await writeFile(
    resolve(outDir, 'forge.report.json'),
    JSON.stringify({
      game: ctx.title,
      archetype: theme.meta.archetype,
      premise: plan.premise,
      screens: results.map((r) => ({
        id: r.id,
        errors: r.errors,
        review: r.review,
        // The critic's `feedback` strings are already in the form the patch
        // translator accepts, so a revision needs no human retyping.
        suggestedPatches: (r.review?.findings ?? []).map((f) => f.feedback),
      })),
    }, null, 2),
    'utf8',
  );

  return { theme, plan, results };
}
