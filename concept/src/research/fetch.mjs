/**
 * Source retrieval for reference games.
 *
 * The whole reason research is a live fetch rather than a question to the model:
 * Roblox games are patched weekly, and a model's recollection of Pet Simulator's
 * rebirth costs is confidently wrong in a way that is very hard to notice
 * downstream. A fetched page is either there or it is not.
 *
 * Two retrieval paths:
 *
 *   MediaWiki  For fandom.com and wikipedia.org, the api.php endpoint is used
 *              directly. Far better than scraping the rendered page — no
 *              navigation chrome, no ads, and search lets a bare game name find
 *              its own wiki.
 *   Generic    Anything else: fetch and strip. Lossy, but it means a dev-forum
 *              post or a design doc URL still works.
 *
 * When neither path finds anything, that is reported as a failure rather than
 * papered over. An unresearched reference is flagged all the way into the concept
 * document, because a claim with no source behind it should look different from
 * one with a source.
 */

const UA = 'arga-concept/0.1 (Roblox game design pipeline)';
const TIMEOUT_MS = 15_000;
const MAX_CHARS = 24_000;

/** A page below this is a stub. Below MIN_TOTAL_CHARS overall, retrieval failed. */
const MIN_PAGE_CHARS = 400;
const MIN_TOTAL_CHARS = 1_500;

export function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function get(url, { json = false } = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: json ? 'application/json' : 'text/html,*/*' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return json ? res.json() : res.text();
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", mdash: '—', ndash: '–' };

/**
 * HTML to readable text.
 *
 * Script, style and the wiki furniture (edit links, reference markers, nav boxes)
 * are dropped before tags are stripped — otherwise the useful text arrives buried
 * in citation numbers and "[edit]" markers, and the token budget goes to noise.
 */
export function htmlToText(html) {
  return String(html)
    .replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<table\b[^>]*\bclass="[^"]*\b(navbox|toc|metadata)\b[^"]*"[\s\S]*?<\/table>/gi, ' ')
    .replace(/<sup\b[^>]*\bclass="[^"]*reference[^"]*"[\s\S]*?<\/sup>/gi, ' ')
    .replace(/<span\b[^>]*\bclass="[^"]*mw-editsection[^"]*"[\s\S]*?<\/span>/gi, ' ')
    // Block-level boundaries become newlines so headings and list items do not
    // run together into one unreadable paragraph.
    .replace(/<\/(p|div|li|tr|h[1-6]|section|article)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] ?? (e[0] === '#' ? String.fromCharCode(Number(e.slice(1))) : m))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s*\[edit\]\s*$/gim, '')
    .trim()
    .slice(0, MAX_CHARS);
}

const isMediaWiki = (u) => /(^|\.)fandom\.com$/.test(u.hostname) || /(^|\.)wikipedia\.org$/.test(u.hostname);

async function mediawikiSearch(origin, query, limit = 3) {
  const url = `${origin}/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&format=json`;
  const data = await get(url, { json: true });
  return (data?.query?.search ?? []).map((s) => s.title);
}

async function mediawikiParse(origin, title) {
  // action=parse is core MediaWiki, unlike prop=extracts which needs the
  // TextExtracts extension — not every Fandom wiki has it, and a 404 there
  // looked like "the game does not exist".
  const url = `${origin}/api.php?action=parse&page=${encodeURIComponent(title)}&prop=text&redirects=1&format=json`;
  const data = await get(url, { json: true });
  const html = data?.parse?.text?.['*'];
  if (!html) throw new Error(`no parsed text for "${title}"`);
  return { title: data.parse.title ?? title, text: htmlToText(html) };
}

const GENERIC_WIKI = 'https://roblox.fandom.com';

/**
 * Wikis worth trying for a bare game name, most specific first.
 *
 * A game-dedicated wiki is trusted wholesale — if pet-simulator-99.fandom.com
 * exists, every page on it is about the right game. The generic Roblox wiki is
 * the opposite: it documents everything, so a hit there proves nothing until the
 * title is checked.
 */
function candidateOrigins(name) {
  const slug = slugify(name);
  const tight = slug.replace(/-/g, '');
  return [...new Set([
    `https://${slug}.fandom.com`,
    `https://${tight}.fandom.com`,
    GENERIC_WIKI,
  ])];
}

const STOPWORDS = new Set(['the', 'a', 'an', 'and', 'of', 'not', 'for', 'in', 'on', 'to', 'my', 'me', 'it', 'is']);
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
const significant = (name) => norm(name).split(' ').filter((t) => t.length >= 3 && !STOPWORDS.has(t));

/**
 * Is this search hit plausibly about the game we asked for?
 *
 * Only applied to the generic wiki, where MediaWiki search will cheerfully return
 * its best fuzzy match for a name that does not exist there — a query for a
 * made-up game came back with an unrelated group page, and the pipeline reported
 * that as successful research. Full-text search has no notion of "no results",
 * so the caller has to supply one.
 *
 * The test is the first two significant tokens of the name appearing contiguously
 * in the title. Loose enough for "Pet Simulator 99" to match "Pet Simulator 99
 * Wiki"; strict enough that a shared word like "game" is not sufficient.
 */
function plausible(title, name) {
  const tokens = significant(name);
  if (!tokens.length) return false;
  const needle = tokens.slice(0, 2).join(' ');
  return norm(title).includes(needle);
}

/**
 * Retrieve source text for one reference game.
 *
 * @param {object} ref { name, url }
 * @returns {Promise<{ok:boolean, name:string, sources:Array, errors:string[]}>}
 */
export async function fetchReference({ name, url }, { log = () => {} } = {}) {
  const sources = [];
  const errors = [];

  const tryUrl = async (raw) => {
    const u = new URL(raw);
    if (isMediaWiki(u)) {
      // A /wiki/Title URL carries the page title; use the API for that title
      // rather than scraping the page it points at.
      const m = u.pathname.match(/\/wiki\/(.+)$/);
      const title = m ? decodeURIComponent(m[1]).replace(/_/g, ' ') : null;
      const origin = u.origin;
      const titles = title ? [title] : await mediawikiSearch(origin, name);
      for (const t of titles.slice(0, 2)) {
        const page = await mediawikiParse(origin, t);
        if (page.text.length > 400) sources.push({ url: `${origin}/wiki/${encodeURIComponent(t.replace(/ /g, '_'))}`, title: page.title, text: page.text, via: 'mediawiki' });
      }
      return;
    }
    const html = await get(raw);
    const text = htmlToText(html);
    if (text.length < 200) throw new Error('page yielded almost no text');
    sources.push({ url: raw, title: name, text, via: 'generic' });
  };

  if (url) {
    try { await tryUrl(url); }
    catch (err) { errors.push(`${url}: ${err.message}`); }
  }

  // No usable URL, or the supplied one failed: go looking.
  if (!sources.length) {
    for (const origin of candidateOrigins(name)) {
      const dedicated = origin !== GENERIC_WIKI;
      try {
        let titles = await mediawikiSearch(origin, name, 4);
        if (!dedicated) {
          const before = titles.length;
          titles = titles.filter((t) => plausible(t, name));
          if (before && !titles.length) errors.push(`${origin}: ${before} hit(s), none plausibly about "${name}"`);
        }
        if (!titles.length) { errors.push(`${origin}: no usable search hits`); continue; }

        // Gather across several pages rather than trusting the top hit. Search
        // often ranks a wiki's Main_Page first, which is on-topic but far too
        // thin to research from — three real pages beat one landing page.
        let total = 0;
        for (const t of titles.slice(0, 3)) {
          if (total >= MIN_TOTAL_CHARS) break;
          try {
            // eslint-disable-next-line no-await-in-loop
            const page = await mediawikiParse(origin, t);
            if (page.text.length < MIN_PAGE_CHARS) { errors.push(`${origin}: "${t}" is a stub (${page.text.length} chars)`); continue; }
            log(`    found ${origin}/wiki/${page.title.replace(/ /g, '_')} (${page.text.length} chars)`);
            sources.push({ url: `${origin}/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`, title: page.title, text: page.text, via: 'mediawiki-search' });
            total += page.text.length;
          } catch (err) {
            errors.push(`${origin} "${t}": ${err.message}`);
          }
        }
        if (sources.length) break;
      } catch (err) {
        errors.push(`${origin}: ${err.message}`);
      }
    }
  }

  // Thin retrieval is reported as failure. Synthesizing design findings from 400
  // characters of landing page produces a confident-looking document sourced from
  // nothing, which is worse than an honest gap the developer can close with a URL.
  const gathered = sources.reduce((n, s) => n + s.text.length, 0);
  if (sources.length && gathered < MIN_TOTAL_CHARS) {
    errors.push(`only ${gathered} chars gathered across ${sources.length} page(s) — too thin to research from`);
    return { ok: false, name, sources, errors };
  }

  return { ok: sources.length > 0, name, sources, errors };
}
