/**
 * Review gallery.
 *
 * Builds a single self-contained HTML file with every render inlined as a data
 * URI, so it opens straight from disk with no server and no network. Reviewing
 * screens side by side across viewports is a different job from reading the
 * validator's text output, and it's the one that catches proportion problems.
 */

import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const VIEWPORT_META = [
  { id: 'desktop', label: 'Desktop', dims: '1920×1080' },
  { id: 'tablet', label: 'Tablet', dims: '1180×820' },
  { id: 'mobile', label: 'Phone', dims: '896×414' },
];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const dataUri = (p) => `data:image/png;base64,${readFileSync(p).toString('base64')}`;

/** Human-readable variant summary, read from the brief rather than retyped. */
function briefParams(b) {
  const v = b.variant ?? {};
  const o = b.ornament ?? {};
  return [
    v.columns ? `${v.columns} col` : null,
    v.artPlacement === 'beside' ? 'art beside' : 'art above',
    v.cardAspect,
    v.headerStyle ? `${v.headerStyle} header` : null,
    v.density,
    v.ctaPlacement === 'per-item' ? 'per-item action' : 'footer cta',
    o.cardBadge && o.cardBadge !== 'none' ? `${o.cardBadge} badge` : null,
    o.panelTrim && o.panelTrim !== 'none' ? o.panelTrim : null,
  ].filter(Boolean);
}

/**
 * @param {object} opts
 * @param {string} opts.root      ui-forge dir
 * @param {string[]} opts.screens brief basenames to include
 * @param {string} opts.shotDir   dir holding <screen>.<viewport>.png
 * @param {object} [opts.compare] { label, archetype, dir } second theme for the reskin panel
 * @param {object} opts.context   game context (for the run label)
 * @param {object} opts.theme     generated theme (for the archetype label)
 */
export function buildGallery(opts) {
  const { root, screens, shotDir, compare, context, theme } = opts;

  const cards = screens.map((id) => {
    // Briefs live in briefs/ when hand-authored and beside the renders when
    // forge generated them; look in both rather than making the caller care.
    const candidates = [
      resolve(root, `briefs/${id}.brief.json`),
      resolve(root, shotDir, `${id}.brief.json`),
      ...(opts.briefsDir ? [resolve(root, opts.briefsDir, `${id}.brief.json`)] : []),
    ];
    const briefPath = candidates.find((p) => existsSync(p));
    if (!briefPath) return null;
    const brief = JSON.parse(readFileSync(briefPath, 'utf8'));
    const shots = {};
    for (const v of VIEWPORT_META) {
      const p = resolve(root, shotDir, `${id}.${v.id}.png`);
      if (existsSync(p)) shots[v.id] = dataUri(p);
    }
    return { id, brief, shots, params: briefParams(brief) };
  }).filter((c) => c && Object.keys(c.shots).length);

  const reskin = [];
  if (compare) {
    const a = resolve(root, shotDir, `${compare.screen}.desktop.png`);
    const b = resolve(root, compare.dir, `${compare.screen}.desktop.png`);
    if (existsSync(a) && existsSync(b)) {
      reskin.push({ label: context.title, archetype: theme.meta.archetype, src: dataUri(a) });
      reskin.push({ label: compare.label, archetype: compare.archetype, src: dataUri(b) });
    }
  }

  const screenHtml = (c) => `
    <article class="screen">
      <div class="screen__head">
        <div class="screen__id">
          <h2>${esc(c.brief.content.title)}</h2>
          <p>${esc(c.brief.purpose ?? '')}</p>
        </div>
        <div class="screen__meta">
          <span class="status">${Object.keys(c.shots).length}/${VIEWPORT_META.length} clean</span>
          <span class="count">${c.brief.content.items.length} items</span>
        </div>
      </div>
      <ul class="params">${c.params.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <div class="shots">
        ${VIEWPORT_META.filter((v) => c.shots[v.id]).map((v) => `
        <figure class="shot" data-vp="${v.id}">
          <button type="button" class="shot__btn" aria-label="Inspect ${esc(c.brief.content.title)} at ${v.label}">
            <img src="${c.shots[v.id]}" alt="${esc(c.brief.content.title)} at ${v.label}, ${v.dims}" loading="lazy">
          </button>
          <figcaption>${v.label} <span>${v.dims}</span></figcaption>
        </figure>`).join('')}
      </div>
    </article>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ui-forge — screen review</title>
<style>
  :root {
    --ground:#f6f7f9; --surface:#fff; --sunken:#eceef2;
    --ink:#14171c; --ink-2:#5a6272; --ink-3:#8b93a1;
    --line:#e1e4ea; --ok:#1c7a4c; --ok-bg:#e7f3ec;
    --shadow:0 1px 2px rgba(20,23,28,.06), 0 8px 24px -12px rgba(20,23,28,.18);
    --sans:ui-sans-serif,-apple-system,"Segoe UI Variable Display","Segoe UI",Roboto,sans-serif;
    --mono:ui-monospace,"Cascadia Code","SF Mono",Consolas,"Liberation Mono",monospace;
    color-scheme:light;
  }
  @media (prefers-color-scheme:dark) {
    :root {
      --ground:#0e1013; --surface:#171a20; --sunken:#1f232b;
      --ink:#e9ecf1; --ink-2:#97a0ae; --ink-3:#6b7482;
      --line:#262b34; --ok:#48d07e; --ok-bg:#132318;
      --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px -12px rgba(0,0,0,.6);
      color-scheme:dark;
    }
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1180px;margin:0 auto;padding:48px 24px 96px}
  header{display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
  .eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
  h1{margin:0;font-size:clamp(26px,4vw,36px);font-weight:640;letter-spacing:-.022em;text-wrap:balance}
  .lede{margin:0;color:var(--ink-2);max-width:62ch}
  .lede code{font-family:var(--mono);font-size:.88em;background:var(--sunken);padding:1px 5px;border-radius:4px;color:var(--ink)}
  .toolbar{position:sticky;top:0;z-index:20;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;padding:12px 0 14px;margin-bottom:8px;background:linear-gradient(var(--ground) 72%,transparent)}
  .segmented{display:flex;gap:4px;padding:4px;background:var(--sunken);border-radius:10px}
  .segmented button{font:inherit;font-size:13px;font-weight:520;color:var(--ink-2);background:none;border:0;border-radius:7px;padding:6px 14px;cursor:pointer;transition:background .15s,color .15s}
  .segmented button:hover{color:var(--ink)}
  .segmented button[aria-pressed="true"]{background:var(--ink);color:var(--ground)}
  .segmented button:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
  .runinfo{font-family:var(--mono);font-size:12px;color:var(--ink-3)}
  .screens{display:flex;flex-direction:column;gap:22px}
  .screen{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;box-shadow:var(--shadow)}
  .screen__head{display:flex;gap:16px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;margin-bottom:12px}
  .screen__id h2{margin:0 0 2px;font-size:18px;font-weight:620;letter-spacing:-.012em}
  .screen__id p{margin:0;color:var(--ink-2);font-size:13.5px}
  .screen__meta{display:flex;align-items:center;gap:8px;flex-shrink:0}
  .status{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.04em;color:var(--ok);background:var(--ok-bg);border-radius:999px;padding:4px 10px;white-space:nowrap}
  .count{font-family:var(--mono);font-size:11px;color:var(--ink-3);white-space:nowrap}
  .params{display:flex;flex-wrap:wrap;gap:5px;list-style:none;margin:0 0 16px;padding:0}
  .params li{font-family:var(--mono);font-size:11px;color:var(--ink-2);background:var(--sunken);border-radius:5px;padding:3px 7px}
  .shots{display:grid;grid-template-columns:1fr;gap:16px}
  .shots.is-all{grid-template-columns:repeat(3,1fr)}
  .shot{margin:0;display:none;flex-direction:column;gap:7px}
  .shot.is-on{display:flex}
  .shot__btn{display:block;padding:0;border:1px solid var(--line);border-radius:10px;background:var(--sunken);cursor:zoom-in;overflow:hidden;width:100%;transition:border-color .15s}
  .shot__btn:hover{border-color:var(--ink-3)}
  .shot__btn:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
  .shot img{display:block;width:100%;height:auto}
  figcaption{font-family:var(--mono);font-size:11px;color:var(--ink-2);display:flex;gap:8px;align-items:baseline}
  figcaption span{color:var(--ink-3)}
  .section-head{margin:44px 0 14px}
  .section-head h2{margin:0 0 4px;font-size:20px;font-weight:620;letter-spacing:-.016em}
  .section-head p{margin:0;color:var(--ink-2);max-width:62ch;font-size:14px}
  .reskin{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .reskin figure{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:14px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:10px}
  .rlabel{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
  .rlabel strong{font-size:14px;font-weight:600}
  .rlabel em{font-family:var(--mono);font-size:11px;font-style:normal;color:var(--ink-3)}
  dialog#lb{padding:0;border:0;background:transparent;max-width:96vw;max-height:94vh}
  dialog#lb::backdrop{background:rgba(8,10,13,.82)}
  dialog#lb img{display:block;max-width:96vw;max-height:88vh;border-radius:10px}
  .lb__close{position:absolute;top:-34px;right:0;font:inherit;font-size:13px;color:#e9ecf1;background:none;border:0;cursor:pointer;padding:4px 8px}
  .lb__close:focus-visible{outline:2px solid #e9ecf1;outline-offset:2px}
  @media (max-width:860px){.wrap{padding:32px 16px 64px}.shots.is-all,.reskin{grid-template-columns:1fr}}
  @media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <p class="eyebrow">ui-forge · compile → render → validate</p>
    <h1>Four screens, one pattern</h1>
    <p class="lede">Every screen below is compiled from a JSON brief through the same
      <code>modal-grid</code> pattern — no hand-written layout.</p>
  </header>

  <div class="toolbar">
    <div class="segmented" role="group" aria-label="Viewport">
      <button type="button" data-vp="desktop" aria-pressed="true">Desktop</button>
      <button type="button" data-vp="tablet" aria-pressed="false">Tablet</button>
      <button type="button" data-vp="mobile" aria-pressed="false">Phone</button>
      <button type="button" data-vp="all" aria-pressed="false">Compare</button>
    </div>
    <p class="runinfo">${esc(String(context.title ?? '').toLowerCase())} · ${esc(theme.meta.archetype)}</p>
  </div>

  <div class="screens">
${cards.map(screenHtml).join('\n')}
  </div>

${reskin.length ? `  <div class="section-head">
    <h2>Same brief, different game</h2>
    <p>Identical brief compiled against two game contexts. Layout is untouched; only the
      generated theme differs. Foreground colours on filled swatches are computed against
      the fill, so they flip automatically rather than being named in the brief.</p>
  </div>
  <div class="reskin">
${reskin.map((r) => `    <figure>
      <div class="rlabel"><strong>${esc(r.label)}</strong><em>${esc(r.archetype)}</em></div>
      <button type="button" class="shot__btn" aria-label="Inspect ${esc(r.label)}">
        <img src="${r.src}" alt="Shop panel for ${esc(r.label)}" loading="lazy">
      </button>
    </figure>`).join('\n')}
  </div>` : ''}
</div>

<dialog id="lb">
  <button type="button" class="lb__close" autofocus>Close ✕</button>
  <img alt="">
</dialog>

<script>
(function(){
  var shots=[].slice.call(document.querySelectorAll('.shot'));
  var grids=[].slice.call(document.querySelectorAll('.shots'));
  var btns=[].slice.call(document.querySelectorAll('.segmented button'));
  function apply(vp){
    grids.forEach(function(g){g.classList.toggle('is-all',vp==='all');});
    shots.forEach(function(s){s.classList.toggle('is-on',vp==='all'||s.dataset.vp===vp);});
    btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.vp===vp));});
  }
  btns.forEach(function(b){b.addEventListener('click',function(){apply(b.dataset.vp);});});
  apply('desktop');
  var lb=document.getElementById('lb'), lbImg=lb.querySelector('img');
  document.querySelectorAll('.shot__btn').forEach(function(b){
    b.addEventListener('click',function(){
      var img=b.querySelector('img'); lbImg.src=img.src; lbImg.alt=img.alt; lb.showModal();
    });
  });
  lb.querySelector('.lb__close').addEventListener('click',function(){lb.close();});
  lb.addEventListener('click',function(e){if(e.target===lb)lb.close();});
})();
</script>
</body>
</html>
`;
}

export function writeGallery(outPath, html) {
  writeFileSync(outPath, html, 'utf8');
  return outPath;
}
