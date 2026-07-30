#!/usr/bin/env node
/**
 * ui-forge render + validate pipeline.
 *
 *   node ui-forge/src/cli.mjs render --spec examples/shop.spec.mjs \
 *        --context examples/game-context.json [--viewport desktop|tablet|mobile|all]
 *
 * Exits non-zero when any rule reports an error, so this is usable as a gate
 * rather than something a human has to remember to look at.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { generateTheme } from './theme/generate.mjs';
import { transpile } from './transpile/to-html.mjs';
import { renderAndMeasure } from './render/browser.mjs';
import { validate } from './validate/rules.mjs';
import { compose, capabilities } from './compose/index.mjs';
import { buildGallery, writeGallery } from './gallery.mjs';
import { planAssets } from './assets/manifest.mjs';
import { emitLuau } from './emit/to-luau.mjs';
import { awaitReport } from './calibrate/server.mjs';
import { compare } from './calibrate/compare.mjs';
import { generateAssets, substituteAssets, loadIndex } from './assets/generate.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Read a .env from the repo root if present. Friendlier than setx on Windows,
// which needs a terminal restart before the variable is visible.
for (const candidate of [resolve(ROOT, '..', '.env'), resolve(ROOT, '.env')]) {
  if (existsSync(candidate) && typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(candidate);
    break;
  }
}

/** Real device classes, so mobile-first layouts get judged on a real phone. */
export const VIEWPORTS = {
  desktop: { width: 1920, height: 1080, label: 'Desktop 1080p' },
  tablet: { width: 1180, height: 820, label: 'Tablet landscape' },
  mobile: { width: 896, height: 414, label: 'Phone landscape' },
};

/** Neutral stage behind the GUI; contrast is judged against this, not the theme. */
const STAGE_HEX = '#6E6E73';
const STAGE_RGB = [0x6e, 0x6e, 0x73];

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    // A trailing boolean flag has no following token at all, so the optional
    // chain yields undefined and the old form silently consumed nothing —
    // `--write` at the end of the line parsed as undefined, not true.
    if (a.startsWith('--')) {
      const next = argv[i + 1];
      out[a.slice(2)] = next === undefined || next.startsWith('--') ? true : argv[++i];
    }
    else out._.push(a);
  }
  return out;
}

async function loadSpec(specPath) {
  const mod = await import(pathToFileURL(resolve(ROOT, specPath)).href);
  const spec = mod.spec ?? mod.default;
  if (!spec?.root) throw new Error(`${specPath} must export a spec with a .root node`);
  return spec;
}

export async function renderOne({ spec, theme, viewportKey, outDir, stem }) {
  const viewport = VIEWPORTS[viewportKey];
  if (!viewport) throw new Error(`Unknown viewport "${viewportKey}". Try: ${Object.keys(VIEWPORTS).join(', ')}, all`);

  const { html, warnings } = transpile(spec, theme, {
    viewport,
    background: STAGE_HEX,
    viewportClass: viewportKey,
  });

  const htmlPath = resolve(outDir, `${stem}.${viewportKey}.html`);
  const pngPath = resolve(outDir, `${stem}.${viewportKey}.png`);
  await writeFile(htmlPath, html, 'utf8');

  const snapshot = await renderAndMeasure(htmlPath, viewport, { pngPath, focus: spec.focus });
  const result = validate(snapshot, { theme, stage: STAGE_RGB });

  return { htmlPath, pngPath, viewport, warnings, snapshot, ...result };
}

function report(r) {
  const status = r.errors ? `${r.errors} error${r.errors === 1 ? '' : 's'}` : 'clean';
  const warn = r.warnings ? `, ${r.warnings} warning${r.warnings === 1 ? '' : 's'}` : '';
  console.log(`\n${r.viewport.label}  (${r.viewport.width}x${r.viewport.height})  —  ${status}${warn}`);
  console.log(`  ${r.pngPath}`);
  for (const f of r.findings) {
    const mark = f.severity === 'error' ? 'x' : '!';
    console.log(`  ${mark} [${f.rule}] ${f.label}: ${f.detail}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0] ?? 'render';

  // The capability surface, for prompting and validating an idea agent. A brief
  // that names anything outside this cannot be compiled, by design.
  if (cmd === 'capabilities') {
    console.log(JSON.stringify(capabilities(), null, 2));
    return;
  }
  if (!['render', 'gallery', 'assets', 'emit', 'calibrate', 'feedback', 'forge'].includes(cmd)) {
    console.error(`Unknown command "${cmd}". Available: forge, render, gallery, assets, emit, calibrate, feedback, capabilities.`);
    process.exit(1);
  }

  const ctx = JSON.parse(await readFile(resolve(ROOT, args.context ?? 'examples/game-context.json'), 'utf8'));
  const theme = generateTheme(ctx);

  // Self-contained review page — opens from disk, no server, no network.
  if (cmd === 'gallery') {
    const html = buildGallery({
      root: ROOT,
      screens: (args.screens ?? 'shop,inventory,crates,quests').split(','),
      shotDir: args.shots ?? 'out-briefs',
      compare: args.compare === false ? null : {
        screen: 'shop',
        dir: args.compareDir ?? 'out-briefs-cozy',
        label: 'Meadow Cafe Hangout',
        archetype: 'minimal-soft',
      },
      context: ctx,
      theme,
    });
    const out = resolve(ROOT, args.out ?? 'review.html');
    writeGallery(out, html);
    console.log(`\nReview page written:\n  ${out}\n\nOpen it in a browser — it is fully self-contained.`);
    return;
  }

  // A brief is compiled; a spec is loaded directly. Specs are build artifacts,
  // so the brief path is the one the pipeline actually uses.
  let spec;
  let stem;
  if (args.brief) {
    const brief = JSON.parse(await readFile(resolve(ROOT, args.brief), 'utf8'));
    spec = compose(brief);
    stem = basename(args.brief).replace(/\.brief\.json$/, '');
  } else {
    const specPath = args.spec ?? 'examples/shop.spec.mjs';
    spec = await loadSpec(specPath);
    stem = basename(specPath).replace(/\.spec\.mjs$/, '');
  }

  const outDir = resolve(ROOT, args.out ?? 'out');
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'theme.json'), JSON.stringify(theme, null, 2), 'utf8');

  // Plan the art a spec needs, without generating anything. Reviewing prompts
  // before spending on generation is much cheaper than reviewing images.
  if (cmd === 'assets') {
    const outDir = resolve(ROOT, args.out ?? 'out-assets');
    await mkdir(outDir, { recursive: true });

    if (args.generate) {
      const r = await generateAssets({
        spec, theme, ctx, outDir,
        provider: args.provider,
        quality: args.quality,
        force: Boolean(args.force),
        only: args.only,
      });
      const made = r.results.filter((x) => !x.cached).length;
      console.log(`\nprovider: ${r.provider.id} (${r.provider.model})`);
      console.log(`${r.results.length} assets — ${made} generated, ${r.results.length - made} cached\n`);
      for (const a of r.analyses) {
        const bad = r.findings.filter((f) => f.key === a.key);
        const mark = bad.some((f) => f.severity === 'error') ? 'x' : bad.length ? '!' : '·';
        const fill = a.bbox ? `${((a.bbox.w * a.bbox.h) * 100).toFixed(0)}% fill` : 'empty';
        console.log(`  ${mark} ${a.key.padEnd(24)} ${a.width}x${a.height}  ${fill}  alpha ${(a.alphaCoverage * 100).toFixed(0)}%`);
        for (const f of bad) console.log(`      [${f.rule}] ${f.detail}`);
      }
      const errors = r.findings.filter((f) => f.severity === 'error').length;
      console.log(`\nindex: ${resolve(outDir, 'assets.index.json')}`);
      if (errors) { console.log(`${errors} asset error(s).`); process.exit(1); }
      return;
    }

    const { contract, assets } = planAssets(spec, theme, ctx);
    await writeFile(resolve(outDir, `${stem}.assets.json`), JSON.stringify({ contract, assets }, null, 2), 'utf8');

    console.log(`\nStyle contract — ${contract.archetype}`);
    console.log(`  medium   : ${contract.medium}`);
    console.log(`  lighting : ${contract.lighting}`);
    console.log(`  palette  : ${Object.entries(contract.palette).map(([k, v]) => `${k} ${v}`).join(', ')}`);
    console.log(`\n${assets.length} assets needed:\n`);
    for (const a of assets) console.log(`  ${a.role.padEnd(9)} ${a.key.padEnd(18)} ${a.canvas}px`);
    if (args.show) {
      const one = assets.find((a) => a.key === args.show) ?? assets[0];
      console.log(`\n--- prompt for "${one.key}" ---\n${one.prompt}\n\nnegative: ${one.negative}`);
    }
    console.log(`\nwritten: ${resolve(outDir, `${stem}.assets.json`)}`);
    return;
  }

  // idea -> ideation -> build -> verification, in one run.
  if (cmd === 'forge') {
    const { forge } = await import('./forge.mjs');
    const outDir = resolve(ROOT, args.out ?? 'out-forge');
    const viewports = args.viewport === 'all' ? Object.keys(VIEWPORTS) : [args.viewport ?? 'desktop'];
    const r = await forge({
      ctx,
      outDir,
      viewports,
      viewportTable: VIEWPORTS,
      model: args.model,
      max: Number(args.screens ?? 4),
      critic: args.critic !== 'off',
      log: (m) => console.log(m),
    });
    const bad = r.results.filter((x) => x.errors).length;
    const revise = r.results.filter((x) => x.review?.verdict === 'revise').length;
    console.log(`\n${r.results.length} screens built. ${bad} with rule errors, ${revise} the critic wants revised.`);
    console.log(`report: ${resolve(outDir, 'forge.report.json')}`);
    return;
  }

  // Natural-language feedback -> validated brief patch.
  if (cmd === 'feedback') {
    const text = args.say ?? args._[1];
    if (!text) throw new Error('Provide the feedback, e.g. --say "make the close button round"');
    if (!args.brief) throw new Error('feedback needs --brief (it patches a brief, not a spec)');

    const briefPath = resolve(ROOT, args.brief);
    const brief = JSON.parse(await readFile(briefPath, 'utf8'));
    const { translateFeedback } = await import('./feedback/translate.mjs');

    console.log(`\nfeedback: "${text}"`);
    const r = await translateFeedback({ brief, theme, feedback: text, model: args.model });
    console.log(`\n${r.patch.reasoning}\n`);
    if (Object.keys(r.patch.variant ?? {}).length) console.log(`  variant  : ${JSON.stringify(r.patch.variant)}`);
    if (Object.keys(r.patch.ornament ?? {}).length) console.log(`  ornament : ${JSON.stringify(r.patch.ornament)}`);
    for (const o of r.patch.overrides ?? []) console.log(`  override : ${o.node} -> ${JSON.stringify(o.set)}`);
    for (const [k, v] of Object.entries(r.patch.tokenOverrides ?? {})) console.log(`  token    : ${k} = ${v}`);
    for (const u of r.patch.unsupported ?? []) console.log(`  UNSUPPORTED: ${u}`);

    if (!r.ok) {
      console.log(`\nPatch rejected — the brief is unchanged:`);
      for (const p of r.problems) console.log(`  - ${p}`);
      process.exit(1);
    }
    if (args.write) {
      await writeFile(briefPath, `${JSON.stringify(r.patched, null, 2)}\n`, 'utf8');
      console.log(`\nPatch applied and compiled cleanly. Written to ${args.brief}`);
    } else {
      console.log('\nPatch compiles cleanly. Re-run with --write to apply it.');
    }
    return;
  }

  // Calibration: render the preview, then wait for the in-game probe to post
  // what the engine actually laid out, and diff them.
  if (cmd === 'calibrate') {
    const viewport = VIEWPORTS[args.viewport ?? 'desktop'];
    const { html } = transpile(spec, theme, { viewport, background: STAGE_HEX, viewportClass: args.viewport ?? 'desktop' });
    const outDir = resolve(ROOT, args.out ?? 'out-calibrate');
    await mkdir(outDir, { recursive: true });
    const htmlPath = resolve(outDir, `${stem}.html`);
    await writeFile(htmlPath, html, 'utf8');
    const snapshot = await renderAndMeasure(htmlPath, viewport, {});

    console.log(`\nPreview measured: ${snapshot.nodes.length} nodes at ${viewport.width}x${viewport.height}`);
    console.log('\nNow, in Roblox Studio:');
    console.log('  1. Game Settings > Security > Allow HTTP Requests = ON');
    console.log('  2. rojo serve (from game/) and connect the Rojo plugin');
    console.log('  3. Press Play');
    console.log('\nListening on http://127.0.0.1:34765 …');

    const studio = await awaitReport({ port: 34765 });
    const result = compare(snapshot, studio, Number(args.tolerance ?? 0.01));

    await writeFile(resolve(outDir, `${stem}.calibration.json`),
      JSON.stringify({ html: snapshot.nodes, studio, result }, null, 2), 'utf8');

    console.log(`\nEngine reported ${studio.nodes.length} nodes at ${studio.viewport.width}x${studio.viewport.height}`);
    console.log(`Matched ${result.matched}/${result.total} nodes; classes covered: ${result.coverage.join(', ')}`);
    if (!result.findings.length) {
      console.log('\nNo drift. The preview is a faithful stand-in for these mappings.');
      return;
    }
    console.log(`\n${result.findings.length} discrepancies:`);
    for (const f of result.findings.slice(0, 30)) console.log(`  [${f.kind}] ${f.key}: ${f.detail}`);
    process.exit(1);
  }

  // Emit Luau for Rojo. Assets keep their placeholder markers unless the index
  // carries a real rbxassetid — an invented id renders as a broken image, which
  // is far harder to notice than a magenta box.
  if (cmd === 'emit') {
    const outDir = resolve(ROOT, '..', args.out ?? 'game/src/shared');
    let assetIndex = null;
    if (args.assets) assetIndex = (await loadIndex(resolve(ROOT, args.assets)))?.index ?? null;
    const written = await emitLuau({ spec, theme, outDir, name: stem, assetIndex });
    console.log(`\nEmitted Luau for "${stem}":`);
    for (const f of written) console.log(`  ${f}`);
    const unresolved = assetIndex
      ? Object.values(assetIndex).filter((a) => !a.assetId).length
      : null;
    if (unresolved) {
      console.log(`\n${unresolved} asset(s) have no rbxassetid yet — they render as magenta placeholders in Studio.`);
      console.log('Open Cloud upload is the missing step.');
    }
    return;
  }

  // Swap placeholders for generated art when an index exists. Failed assets stay
  // as placeholders rather than being shown — a known-bad asset in the preview
  // launders a defect into something that looks deliberate.
  if (args.assets) {
    const loaded = await loadIndex(resolve(ROOT, args.assets));
    if (!loaded) throw new Error(`No assets.index.json in ${args.assets} — run the "assets --generate" command first`);
    substituteAssets(spec, loaded.index, { urlFor: (p) => pathToFileURL(p).href });
    console.log(`assets: ${Object.keys(loaded.index).length} from ${loaded.provider}`);
  }

  const targets = args.viewport === 'all' ? Object.keys(VIEWPORTS) : [args.viewport ?? 'desktop'];

  console.log(`${theme.meta.sourceTitle} — ${theme.meta.archetypeLabel} [${theme.meta.archetype}]`);

  const results = [];
  for (const vp of targets) {
    const r = await renderOne({ spec, theme, viewportKey: vp, outDir, stem });
    report(r);
    results.push({ viewport: vp, findings: r.findings, errors: r.errors, warnings: r.warnings });
  }

  await writeFile(
    resolve(outDir, `${stem}.findings.json`),
    JSON.stringify({ spec: stem, archetype: theme.meta.archetype, results }, null, 2),
    'utf8',
  );

  const totalErrors = results.reduce((n, r) => n + r.errors, 0);
  if (totalErrors) {
    console.log(`\n${totalErrors} error${totalErrors === 1 ? '' : 's'} across ${targets.length} viewport${targets.length === 1 ? '' : 's'}.`);
    process.exit(1);
  }
  console.log(`\nAll ${targets.length} viewport${targets.length === 1 ? '' : 's'} clean.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`\nui-forge failed: ${err.stack ?? err.message}`);
    process.exit(1);
  });
}
