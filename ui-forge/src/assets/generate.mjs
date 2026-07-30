/**
 * Asset generation orchestrator: plan -> generate -> analyze -> validate.
 *
 * Caching is keyed on the prompt hash, not the asset key. Editing the style
 * contract therefore regenerates the whole set (correct — the set must stay
 * coherent), while re-running with no changes costs nothing.
 */

import { createHash } from 'node:crypto';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

import { planAssets } from './manifest.mjs';
import { analyzeAll, validateAssets } from './analyze.mjs';
import * as openai from './providers/openai.mjs';
import * as stub from './providers/stub.mjs';

export const PROVIDERS = { openai, stub };

const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 12);

export function pickProvider(name) {
  if (name && PROVIDERS[name]) return PROVIDERS[name];
  if (name) throw new Error(`Unknown provider "${name}". Available: ${Object.keys(PROVIDERS).join(', ')}`);
  return openai.available() ? openai : stub;
}

/**
 * @param {object} opts { spec, theme, ctx, outDir, provider, quality, force, concurrency }
 */
export async function generateAssets(opts) {
  const { spec, theme, ctx, outDir, quality, force = false, only } = opts;
  const provider = pickProvider(opts.provider);
  const planned = planAssets(spec, theme, ctx);
  const contract = planned.contract;

  // Style probing. Editing the style contract invalidates the whole cached set
  // (correct — coherence is a property of the set, not of one image), which
  // makes tuning art direction cost a full regeneration each round. Probing one
  // representative asset first cuts that to a single image per round.
  const wanted = only ? new Set(String(only).split(',').map((s) => s.trim())) : null;
  const assets = wanted ? planned.assets.filter((a) => wanted.has(a.key)) : planned.assets;
  if (wanted && !assets.length) {
    throw new Error(`--only matched nothing. Available: ${planned.assets.map((a) => a.key).join(', ')}`);
  }

  await mkdir(outDir, { recursive: true });

  // The stub reuses one browser across the set; the API adapter ignores it.
  const browser = provider.meta.id === 'stub' ? await chromium.launch() : null;
  const results = [];

  try {
    for (const asset of assets) {
      const stamp = hash(`${provider.meta.model}|${asset.prompt}|${asset.negative ?? ''}`);
      const file = resolve(outDir, `${asset.key}.${stamp}.png`);

      if (!force && existsSync(file)) {
        results.push({ ...asset, path: file, cached: true });
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      const bytes = await provider.generate(asset, { quality, browser });
      // eslint-disable-next-line no-await-in-loop
      await writeFile(file, bytes);
      results.push({ ...asset, path: file, cached: false });
    }
  } finally {
    if (browser) await browser.close();
  }

  const analyses = await analyzeAll(results.map((r) => ({ key: r.key, path: r.path, role: r.role })));
  const findings = validateAssets(analyses, theme);

  // A probe run must not clobber a full index with a one-asset one; merge instead.
  const prior = wanted ? (await loadIndex(outDir))?.index ?? {} : {};
  const index = { ...prior, ...Object.fromEntries(results.map((r) => [r.key, { path: r.path, role: r.role }])) };
  await writeFile(resolve(outDir, 'assets.index.json'),
    JSON.stringify({ provider: provider.meta.id, contract, index }, null, 2), 'utf8');

  return { provider: provider.meta, contract, results, analyses, findings, index };
}

/**
 * Swap placeholder references in a spec for generated files.
 *
 * Assets that failed validation are deliberately left as placeholders — showing
 * a known-bad asset in the preview would launder a defect into something that
 * looks intentional.
 */
export function substituteAssets(spec, index, { failed = new Set(), urlFor } = {}) {
  const walk = (node) => {
    const ph = node.image && typeof node.image === 'object' ? node.image.placeholder : null;
    if (ph && index[ph] && !failed.has(ph)) {
      node.image = urlFor ? urlFor(index[ph].path) : index[ph].path;
      node.imageFit = node.imageFit ?? 'fit';
    }
    for (const child of node.children ?? []) walk(child);
  };
  walk(spec.root);
  return spec;
}

/** Load a previously written index without regenerating. */
export async function loadIndex(outDir) {
  const p = resolve(outDir, 'assets.index.json');
  if (!existsSync(p)) return null;
  return JSON.parse(await readFile(p, 'utf8'));
}
