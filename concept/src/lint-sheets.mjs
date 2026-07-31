#!/usr/bin/env node
// Deterministic gate on a /game-concept spec directory.
//
// Checks only what code can check without judgment. Semantic contradictions are the
// concept-verifier agent's job; this is the mechanical half, and it runs first because a
// failure here is unarguable and cheap to find.
//
//   node concept/src/lint-sheets.mjs concept/spec/{slug}
//
// Exit 0 = pass, 1 = fail. Warnings never fail the run.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

// ---------------------------------------------------------------- inventory
// Mirrors <inventory> in .claude/skills/game-concept/SKILL.md. Keep in sync.
const INVENTORY = [
  ["F", "theme / fantasy"], ["F", "tone"], ["F", "core loop"], ["F", "purpose"],
  ["F", "audience"],
  ["G", "players"], ["G", "genre"], ["G", "mechanics"], ["G", "controls & game feel"],
  ["G", "economy"], ["G", "content roster"], ["G", "onboarding / first session"],
  ["G", "failure & friction"],
  ["M", "objectives"], ["M", "world"], ["M", "replayability"],
  ["M", "monetization stance"], ["M", "scope & priority"], ["M", "extension cost"],
  ["P", "art direction"], ["P", "audio intent"], ["P", "visual feedback intent"],
  ["P", "technical shape"], ["P", "measurement"], ["P", "accessibility"], ["P", "integrity"],
  ["O", "discovery hook"], ["O", "live-ops intent"], ["O", "references"],
];

const TAGS = ["you said", "you chose", "you accepted", "you answered", "research", "I assumed"];
const PLACEHOLDERS = [/\bTBD\b/, /\bTODO\b/, /to be determined/i, /\bvarious\b/i];
const STOPWORDS = new Set(("the a an and or of to in is it be this that with for on at as by from " +
  "not no you your they what how why when which who whom all any both each few more most other " +
  "some such only own same so than too very can will just should now one two three four five " +
  "there here their them then these those has have had was were are been being does did doing " +
  "if but because until while about against between into through during before after above below " +
  "up down out off over under again further once i me my we our he she his her its " +
  // the spec format's own process vocabulary — never a domain term
  "declined accepted chose chosen assumed assume research researched open opened currently left " +
  "brief sheet sheets spec specs tag tags layer layers round rounds question questions answered " +
  "answer offered alternative alternatives deliberately explicitly consequence consequences " +
  "constraint constraints reference references note noted stated state settled interview " +
  "downstream upstream verification audit coverage simulated " +
  // ordinary English that is never a game's term of art
  "work works working player players world worlds game games rather still also thing things " +
  "something anything nothing everything means meant makes made make give gives given " +
  "need needs needed want wants better best worse first last next only even much many " +
  "real really actual actually genuine genuinely deliberately explicitly plainly simply " +
  "cannot never always ever already yet however though although since while whether " +
  "enough hard harder cheap cheaply expensive costs cost design designed designer " +
  "must should shall every each roblox shared other another same both " +
  "would could might may sheet-level toward against across within").split(" "));

const argPath = process.argv[2];
if (!argPath) {
  console.error("usage: node concept/src/lint-sheets.mjs concept/spec/{slug}");
  process.exit(2);
}
if (!existsSync(argPath)) {
  console.error(`no such directory: ${argPath}`);
  process.exit(2);
}

// VERIFIED.md is the verifier's report *about* these sheets, not one of them. Scanning it
// lets its own quoted examples satisfy the checks it is reporting on — observed: quoting
// "[you chose]" in a finding silenced the zero-[you chose] failure it was describing.
const EXCLUDED = new Set(["VERIFIED.md"]);
const files = readdirSync(argPath).filter((f) => f.endsWith(".md") && !EXCLUDED.has(f));
const sheets = new Map();
for (const f of files) sheets.set(f, readFileSync(join(argPath, f), "utf8"));
const researchDir = join(argPath, "research");
if (existsSync(researchDir)) {
  for (const f of readdirSync(researchDir).filter((x) => x.endsWith(".md"))) {
    sheets.set(`research/${f}`, readFileSync(join(researchDir, f), "utf8"));
  }
}
const all = [...sheets.values()].join("\n");
// A tag inside backticks is documentation (a legend row, an example), not a claim. A
// placeholder word inside a quotation is the source's word, not the spec's. Strip both
// before the tag and placeholder scans, or every legend and every honest quote fails.
const stripQuoted = (s) => s
  .replace(/`[^`\n]*`/g, " ")        // inline code
  .replace(/\*"[^"]*"\*/g, " ")      // italic-quoted
  .replace(/"[^"\n]{0,300}"/g, " ")  // straight quotes
  .replace(/[“”][^“”\n]{0,300}[“”]/g, " ");
const allUnquoted = stripQuoted(all);
const numbered = [...sheets.entries()].filter(([f]) => /^(CONCEPT|\d\d-|00-)/.test(f));

const fails = [];
const warns = [];
const notes = [];
const fail = (check, msg) => fails.push({ check, msg });
const warn = (check, msg) => warns.push({ check, msg });

// ---------------------------------------------------------------- 1. required sheets
{
  const required = ["CONCEPT.md", "00-CORE.md", "OPEN.md", "HANDOFF.md", "GLOSSARY.md"];
  for (const r of required) if (!sheets.has(r)) fail("required-sheets", `missing ${r}`);
}

// ---------------------------------------------------------------- 2. audit table
const open = sheets.get("OPEN.md") ?? "";
const auditRows = [];
for (const line of open.split("\n")) {
  const m = line.match(/^\|\s*([FGMPO])\s*\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|/);
  if (m) auditRows.push({ layer: m[1], item: m[2], state: m[3], qs: m[4], where: m[5] });
}
const norm = (s) => s.replace(/[*`_]/g, "").replace(/\s+/g, " ").trim().toLowerCase();

if (!auditRows.length) {
  fail("audit-table", "no coverage audit table found in OPEN.md (process step 5 requires one)");
} else {
  for (const [layer, item] of INVENTORY) {
    const hit = auditRows.find((r) => norm(r.item).includes(norm(item).split(" / ")[0]));
    if (!hit) fail("audit-table", `inventory item has no audit row: [${layer}] ${item}`);
  }
  // foundation may not sit at zero questions
  for (const r of auditRows) {
    if (r.layer !== "F") continue;
    const n = norm(r.qs).match(/\d+/);
    if (n && Number(n[0]) === 0) {
      fail("foundation-gate", `foundation item at 0 questions: "${norm(r.item)}" — process step 5 forbids this`);
    }
  }
  notes.push(`${auditRows.length} audit rows, ${INVENTORY.length} inventory items`);
}

// ---------------------------------------------------------------- 3. provenance tags
{
  const tagRe = /\[([^\]]{2,60})\]/g;
  const seen = new Map();
  let m;
  while ((m = tagRe.exec(all))) {
    // A tag wrapped in backticks is a legend row or an example, not a claim. Detect that
    // from its surroundings rather than by stripping code spans, because the source inside
    // a real tag — [research: `landscape.md`] — is itself backticked.
    if (all[m.index - 1] === "`" && all[m.index + m[0].length] === "`") continue;
    const body = m[1].trim();
    if (/^\[/.test(body) || /^\^/.test(body)) continue;
    if (/^(you |research|I assumed|unverified|playtest|cid:|brief:|simulated)/i.test(body)) {
      seen.set(body, (seen.get(body) ?? 0) + 1);
    }
  }
  // A synthetic run stands in for a developer that was never asked. Legal for testing the
  // gates, never legal as input to a build. Say so loudly rather than letting it pass as real.
  const sim = [...seen].filter(([t]) => /^simulated/i.test(t)).reduce((a, [, n]) => a + n, 0);
  if (sim) {
    warn("synthetic-run",
      `${sim} [simulated] tag(s) — no developer was interviewed. This brief is a test fixture and must not feed a build. Every simulated answer is really an [I assumed].`);
  }
  for (const [tag] of seen) {
    const known = TAGS.some((t) => tag.toLowerCase().startsWith(t.toLowerCase()))
      || /^(unverified|playtest|cid:|brief:|simulated)/i.test(tag);
    if (!known) warn("tags", `unrecognised provenance tag: [${tag}]`);
    if (/^research/i.test(tag) && !/https?:\/\/|`[^`]+`|\.md/.test(tag)) {
      fail("tags", `[research] tag with no source: [${tag}]`);
    }
  }
  const chose = [...seen].filter(([t]) => /^you chose/i.test(t)).reduce((a, [, n]) => a + n, 0);
  const accepted = [...seen].filter(([t]) => /^you accepted/i.test(t)).reduce((a, [, n]) => a + n, 0);
  const assumed = [...seen].filter(([t]) => /^I assumed/i.test(t)).reduce((a, [, n]) => a + n, 0);
  notes.push(`tags — you chose: ${chose}, you accepted: ${accepted}, I assumed: ${assumed}`);
  if (chose === 0) fail("tags", "zero [you chose] tags — no answer was a contested decision");
}

// ---------------------------------------------------------------- 4. placeholders
for (const [f, body] of sheets) {
  const prose = stripQuoted(body);
  for (const re of PLACEHOLDERS) {
    const m = prose.match(re);
    if (m) fail("placeholders", `${f} contains "${m[0]}" outside a quotation — <provenance> forbids it; commit and tag instead`);
  }
}

// ---------------------------------------------------------------- 5. declined-then-allowed
// Catches a term rejected in one sheet and permitted in another. Real instance found in v2:
// relic luck declined as an earned axis in 02-GAMEPLAY, allowed as a paid multiplier in 03-META.
{
  const NOISE = new Set(("declined offered rejected both were was also explicitly cut " +
    "alternatives alternative option options fourth third second first axis were").split(" "));
  const grams = (words, n) => {
    const out = [];
    for (let i = 0; i + n <= words.length; i++) out.push(words.slice(i, i + n).join(" "));
    return out;
  };
  const phrasesIn = (text) => {
    const words = text.toLowerCase().replace(/[^a-z\s-]/g, " ").split(/\s+/).filter(Boolean);
    return [...grams(words, 2), ...grams(words, 3)].filter((p) => {
      const ws = p.split(" ");
      if (ws.some((w) => NOISE.has(w))) return false;
      if (ws.every((w) => STOPWORDS.has(w))) return false;
      return ws.filter((w) => !STOPWORDS.has(w)).length >= 2;
    });
  };

  // Sentence-level, not line-level: a decline often wraps across a line break, e.g. v2's
  // "Relic luck as a fourth axis / was offered and declined."
  const sentencesOf = (body) => body
    .replace(/\r/g, "")
    .split(/\n\s*\n/)                       // paragraphs
    .flatMap((p) => p.replace(/\n/g, " ").split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);

  const declined = new Map(); // phrase -> file
  for (const [f, body] of numbered) {
    for (const s of sentencesOf(body)) {
      if (!/\b(declined|rejected|was cut|were cut|both offered)\b/i.test(s)) continue;
      // strike-through rows mark something already cut; consistent, not a conflict
      if (/~~/.test(s)) continue;
      for (const p of phrasesIn(s)) if (!declined.has(p)) declined.set(p, f);
    }
  }
  for (const [f, body] of numbered) {
    for (const line of body.split("\n")) {
      const t = line.trim();
      if (!/^[-*|]?\s*\*{0,2}(allowed|permitted)\b/i.test(t)) continue;
      const lower = t.toLowerCase();
      for (const [phrase, src] of declined) {
        if (src === f) continue;
        if (lower.includes(phrase)) {
          fail("declined-then-allowed",
            `"${phrase}" is declined in ${src} and listed as allowed in ${f}`);
        }
      }
    }
  }
}

// ---------------------------------------------------------------- 6. untagged recurring terms
// The naming words a spec uses everywhere are the ones a downstream reader will treat as
// settled. If a term recurs heavily and never appears on a line carrying a provenance tag,
// it is a working word masquerading as a decision. Real instance in v2: "relic" x38, untagged.
{
  const freq = new Map();
  const filesFor = new Map();
  for (const [f, body] of numbered) {
    for (const g of body.toLowerCase().matchAll(/\b([a-z][a-z-]{3,20})\b/g)) {
      const w = g[1];
      if (STOPWORDS.has(w)) continue;
      freq.set(w, (freq.get(w) ?? 0) + 1);
      if (!filesFor.has(w)) filesFor.set(w, new Set());
      filesFor.get(w).add(f);
    }
  }
  const tagged = new Set();
  for (const [, body] of numbered) {
    for (const line of body.split("\n")) {
      if (!/\[(you |research|I assumed)/i.test(line)) continue;
      for (const g of line.toLowerCase().matchAll(/\b([a-z][a-z-]{3,20})\b/g)) tagged.add(g[1]);
    }
  }
  // A recurring noun is a term of art whether or not anyone decided it was. GLOSSARY.md is
  // where it gets one meaning; a term missing from it is a term two sheets can define
  // differently. Observed: one noun for a collectible and a rolled multiplier; `share` for
  // both a payout percentage and a cash contribution; `capability` for a binary key and an
  // upgradeable stat. Each was two statements written an hour apart.
  const glossary = sheets.get("GLOSSARY.md") ?? "";
  const glossaryTerms = new Set();
  for (const line of glossary.split("\n")) {
    const m = line.match(/^\|\s*`?([a-z][a-z0-9 -]{2,30}?)`?\s*\|/i);
    if (m && !/^(term|-+)$/i.test(m[1].trim())) {
      const t = m[1].trim().toLowerCase();
      // A glossary should not need a row per verb form: `bid` must cover bids, bidding, bidder.
      const inflect = (w) => {
        const out = [w];
        const stem = w.endsWith("e") ? w.slice(0, -1) : w;
        const dbl = /[aeiou][bdgmnprt]$/.test(w) ? w + w.slice(-1) : w;
        out.push(w + "s", w + "es", stem + "ing", dbl + "ing", stem + "ed", dbl + "ed",
                 w + "er", dbl + "er", w + "ers", dbl + "ers");
        if (w.endsWith("s")) out.push(w.slice(0, -1));
        if (w.endsWith("y")) out.push(w.slice(0, -1) + "ies");
        return out;
      };
      for (const form of inflect(t)) glossaryTerms.add(form);
      for (const w of t.split(/\s+/)) {
        if (w.length > 3) for (const form of inflect(w)) glossaryTerms.add(form);
      }
    }
  }

  const suspects = [...freq]
    .filter(([w, n]) => n >= 12 && (filesFor.get(w)?.size ?? 0) >= 3)
    .sort((a, b) => b[1] - a[1]);

  const missing = suspects.filter(([w]) => !glossaryTerms.has(w)).slice(0, 12);
  if (glossary) {
    notes.push(`glossary: ${new Set([...glossaryTerms].filter((t) => t.includes(" ") || t.length > 3)).size} term form(s)`);
    for (const [w, n] of missing) {
      fail("glossary",
        `"${w}" used ${n}x across ${filesFor.get(w).size} sheets and is not in GLOSSARY.md — two sheets can define it differently`);
    }
  } else {
    for (const [w, n] of missing) {
      warn("glossary", `"${w}" used ${n}x across ${filesFor.get(w).size} sheets (no GLOSSARY.md to check against)`);
    }
  }

  // Naming declared open, then used concretely throughout. A downstream reader cannot tell a
  // placeholder from a decision, and will treat the heavily-used word as the name.
  // Real instance in v2: naming is left open, yet "relic" appears 38x and reads as settled.
  const namingOpen = /^\|.*\b(naming|all naming|names)\b/im.test(open)
    || /left open[^.]*\bnaming\b/i.test(open);
  // A glossary row — even one marked `working word` — is precisely the disclosure this check
  // asks for, so a term that has one is already handled. Only unglossed terms are a risk.
  if (namingOpen) {
    const domain = [...freq]
      .filter(([w]) => !glossaryTerms.has(w))
      .filter(([w, n]) => n >= 15 && (filesFor.get(w)?.size ?? 0) >= 3)
      .filter(([w]) => !/^(area|areas|clear|clearing|cleared|player|players|game|games|design|brief|sheet|sheets|first|session|every|means|which|there|because|would|could|about|other|still|reference|research|answer|question|round|item|items|thing|things|open|currently|collection)$/.test(w))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
    if (domain.length) {
      warn("naming-open-but-used",
        `naming is listed as left open, but these concrete terms are used throughout and will read as settled: ${domain.map(([w, n]) => `"${w}" ${n}x`).join(", ")}. Occupancy-check them or mark them as working words.`);
    }
  }
}

// ---------------------------------------------------------------- 6b. duplicated decisions
// Two sheets agreeing is a contradiction that has not happened yet: edit one and they
// diverge. The vibe key is the most-duplicated decision in every brief written so far, and
// it is the one whose divergence a downstream build actually reads.
{
  const VIBES = ["cartoon-vibrant", "clean-modern", "dark-tech", "horror-grim",
                 "fantasy-ornate", "premium-gloss", "minimal-soft"];
  // CONCEPT.md and HANDOFF.md restate decisions on purpose — one is the distilled picture
  // everyone reads, the other is an index. Repetition is therefore not the defect.
  // **Divergence is.** Check that every sheet naming a vibe key names the same one.
  // A sheet naming a key it *rejected* is doing the right thing — recording declined options
  // is a core rule. So only count a sheet's **declaration**: a line that says "vibe key" and
  // names one. A sheet with no such line but exactly one key mentioned (CONCEPT.md's "Look."
  // row) counts as an implied claim.
  const found = new Map(); // file -> the key that sheet claims
  for (const [f, body] of sheets) {
    let claim = null;
    for (const line of body.split("\n")) {
      if (!/vibe\s*key/i.test(line)) continue;
      const hit = VIBES.find((v) => line.includes(v));
      if (hit) { claim = hit; break; }
    }
    if (!claim) {
      const all = [...new Set(VIBES.filter((v) => body.includes(v)))];
      if (all.length === 1) claim = all[0];
    }
    if (claim) found.set(f, claim);
  }
  const union = new Set(found.values());
  if (union.size > 1) {
    fail("diverged-decision",
      `sheets disagree on the ui-forge vibe key — ${[...found].map(([f, v]) => `${f}: ${v}`).join(" · ")}`);
  } else if (union.size === 1 && found.size > 1) {
    notes.push(`vibe key \`${[...union][0]}\` consistent across ${found.size} sheets`);
  }
}

// ---------------------------------------------------------------- 7. build capability
{
  const pres = sheets.get("04-PRESENTATION.md") ?? "";
  let registry = null;
  try {
    const { execFileSync } = await import("node:child_process");
    registry = JSON.parse(execFileSync("npm", ["run", "capabilities", "--silent"], {
      encoding: "utf8", cwd: process.cwd(), stdio: ["ignore", "pipe", "ignore"],
    }));
  } catch { /* registry unavailable; skip rather than guess */ }

  if (!registry) {
    warn("capability", "could not read the pattern registry (npm run capabilities) — check skipped");
  } else {
    const patterns = Object.keys(registry);
    notes.push(`build registry: ${patterns.length} pattern(s) — ${patterns.join(", ")}`);
    // Backticked kebab-case is not automatically a screen id: vibe keys, pattern names and
    // tool names all share the shape. Subtract the ones we can name.
    const NOT_SCREENS = new Set([
      ...patterns, "ui-forge", "game-context", "cartoon-vibrant", "clean-modern", "dark-tech",
      "horror-grim", "fantasy-ornate", "premium-gloss", "minimal-soft", "game-concept",
    ]);
    const screens = [...pres.matchAll(/`([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`/g)]
      .map((m) => m[1]).filter((s) => !NOT_SCREENS.has(s) && !s.endsWith(".md"));
    const unbuildable = /\b(persistent HUD|HUD|minimap|map screen|settings list|text input|leaderboard|scrolling list)\b/i;
    const hits = [...pres.matchAll(new RegExp(unbuildable, "gi"))].map((m) => m[0].toLowerCase());
    if (hits.length && !/cannot yet make|capability warning|does not fit|cannot build/i.test(pres)) {
      fail("capability",
        `04-PRESENTATION names ${[...new Set(hits)].join(", ")} but carries no capability warning; registry has only: ${patterns.join(", ")}`);
    }
    if (screens.length) notes.push(`${new Set(screens).size} screen id(s) named in 04-PRESENTATION`);
  }
}

// ---------------------------------------------------------------- report
const label = { fail: "FAIL", warn: "WARN" };
console.log(`\nlint-sheets — ${basename(argPath)}  (${sheets.size} sheets)\n`);
for (const n of notes) console.log(`  · ${n}`);
if (fails.length || warns.length) console.log("");
for (const { check, msg } of fails) console.log(`  ${label.fail}  [${check}] ${msg}`);
for (const { check, msg } of warns) console.log(`  ${label.warn}  [${check}] ${msg}`);
console.log(`\n${fails.length} failure(s), ${warns.length} warning(s)\n`);
process.exit(fails.length ? 1 : 0);
