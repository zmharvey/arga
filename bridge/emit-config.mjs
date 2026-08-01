/**
 * Build manifest -> GameConfig.luau.
 *
 * The proof that the seam is real. `game/src/shared/GameConfig.luau` was hand-written
 * first, while building the ruin loop by hand, and every number in it was invented on
 * the spot because no spec sheet supplied one. This emitter regenerates that same file
 * from spec sheets instead.
 *
 * If the generated file passes the same checks the hand-written one passed, then CID
 * has an output a build stage can consume, which it has never had before.
 *
 * Note what is NOT emitted: the reasoning. The comments below cite the brief, but the
 * emitter writes them from the manifest's own structure — it does not try to carry
 * prose across. Prose belongs in the sheets, values belong here, and conflating them
 * is what made the previous handoff unusable.
 */

const HEADER = `--!strict
--[[
	GENERATED FILE — do not edit.

	Emitted from CID spec sheets by \`npm run bridge -- --emit\`. Edit the sheet that
	owns a value and re-emit; a hand edit here is overwritten and, worse, silently
	diverges from the sheet that is supposed to be the record.

	Every number below was supplied by a named sheet. \`npm run bridge\` prints which.

	This module constructs no Roblox types — RGB triples and plain numbers only — so it
	loads outside the engine and its curves can be executed by
	\`game/test/config.spec.luau\`. Config that only loads inside Roblox is config
	nobody checks.
]]

local GameConfig = {}
`;

const FOOTER = `
function GameConfig.upgradeCost(upgrade: { costBase: number, costGrowth: number }, level: number): number
	return math.floor(upgrade.costBase * (upgrade.costGrowth ^ level))
end

function GameConfig.tierByWeight(roll: number)
	local total = 0
	for _, t in ipairs(GameConfig.Tiers) do
		total += t.weight
	end
	local pick = roll * total
	local running = 0
	for index, t in ipairs(GameConfig.Tiers) do
		running += t.weight
		if pick <= running then
			return index, t
		end
	end
	return 1, GameConfig.Tiers[1]
end

return GameConfig
`;

const num = (n) => (Number.isInteger(n) ? String(n) : String(n));
const str = (s) => `"${String(s).replace(/"/g, '\\"')}"`;

/**
 * Any manifest value as a Luau literal.
 *
 * The nine original keys each get a hand-written block above, with the reasoning for why
 * that key exists. That was right for nine and is wrong for twenty-five: waves 2 and 3
 * promoted sixteen more, and hand-writing sixteen serialisers is sixteen chances to drop a
 * field silently — which is the failure mode this whole seam exists to remove.
 *
 * So the newer keys are emitted structurally. The reasoning stays in the sheet, which is
 * where the emitter's own header already says prose belongs.
 *
 * A key emitted here is emitted *whole*. A builder reading GameConfig sees every field the
 * sheet declared, not the subset an emitter author remembered.
 */
function luau(value, indent = '\t') {
  if (value === null || value === undefined) return 'nil';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return num(value);
  if (typeof value === 'string') return str(value);

  const inner = `${indent}\t`;
  if (Array.isArray(value)) {
    if (!value.length) return '{}';
    return `{\n${value.map((v) => `${inner}${luau(v, inner)},`).join('\n')}\n${indent}}`;
  }

  const entries = Object.entries(value);
  if (!entries.length) return '{}';
  return `{\n${entries.map(([k, v]) => {
    // A Luau identifier can be written bare; anything else needs bracket-quoting, and
    // getting that wrong produces a file that does not parse rather than one that is
    // subtly wrong — but only for the keys that need it, so it is worth checking.
    //
    // A RESERVED WORD LOOKS EXACTLY LIKE AN IDENTIFIER AND IS NOT ONE. `discovery.repeat`
    // emitted as `repeat = { ... }`, which is a syntax error five lines into a 4,000-line
    // generated file that every module requires — the whole game fails to load, and the
    // error names a keyword rather than the sheet that supplied the key. Caught by running
    // luau-analyze over the emitted file rather than by reading it.
    const lhs = /^[A-Za-z_][A-Za-z0-9_]*$/.test(k) && !RESERVED.has(k) ? k : `[${str(k)}]`;
    return `${inner}${lhs} = ${luau(v, inner)},`;
  }).join('\n')}\n${indent}}`;
}

/** Luau's reserved words. Any of them as a table key must be bracket-quoted. */
const RESERVED = new Set([
  'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'if', 'in',
  'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while',
]);

/** `discovery` -> `Discovery`, so emitted names match the hand-written blocks' convention. */
const pascal = (key) => key.charAt(0).toUpperCase() + key.slice(1);

/**
 * Fields that document what a builder must NOT do, dropped before emitting.
 *
 * This file's own header states the rule: the emitter carries values, never prose. A list of
 * API names nobody may call is prose in an array — no runtime path reads it, and it is
 * addressed to the person writing the module, not to the module.
 *
 * Emitting it did active harm. `social/03` gives its exclusions checkable observables of the
 * form "no `leaderstats` anywhere under `game/src`", and the emitted config quoted
 * `leaderstats`, `OrderedDataStore` and `Player:IsFriendsWith` as data — so the grep matched
 * the generated file and the criterion could not pass however correct the build was. The
 * `world` builder hit it and had to choose between editing a generated file and quietly
 * narrowing the check. Both are wrong, which is the sign the emitter was.
 *
 * Named explicitly rather than matched by heuristic: three recurring field names, so a reader
 * can see exactly what is dropped and a fourth has to be added deliberately. Worth 4% of the
 * config's bytes; the point is the checks, not the size.
 */
const DOCUMENTATION_ONLY = new Set(['forbidden', 'forbiddenApis', 'invariants']);

function stripDocumentation(value) {
  if (Array.isArray(value)) return value.map(stripDocumentation);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([k]) => !DOCUMENTATION_ONLY.has(k))
      .map(([k, v]) => [k, stripDocumentation(v)]),
  );
}

function tiersBlock(tiers, source) {
  const rows = tiers.map((t) =>
    `\t{ name = ${str(t.name)}, shape = ${str(t.shape)}, rgb = { ${t.rgb.join(', ')} }, `
    + `value = ${num(t.value)}, weight = ${num(t.weight)}, height = ${num(t.height)} },`).join('\n');
  return `
-- Overgrowth tiers. From ${source}.
--
-- \`shape\` is the primary channel and \`rgb\` is secondary, because rarity has to stay
-- readable with the colour thrown away. The schema refuses two tiers that share a
-- shape, so this property cannot be lost by editing a sheet.
GameConfig.Tiers = {
${rows}
}
`;
}

function upgradesBlock(upgrades, source) {
  const rows = upgrades.map((u) => `	{
		id = ${str(u.id)},
		label = ${str(u.label)},
		blurb = ${str(u.blurb)},
		costBase = ${num(u.costBase)},
		costGrowth = ${num(u.costGrowth)},
		maxLevel = ${num(u.maxLevel)},
		perLevel = ${num(u.perLevel)},
		base = ${num(u.base)},
		mode = ${str(u.mode)},
	},`).join('\n');
  return `
-- The spend side of the loop. From ${source}.
--
-- \`base\` and \`mode\` exist because \`perLevel\` alone does not describe an effect. A builder
-- handed 1.1 cannot tell whether maxed Reach is 14.3 or 11.79, and both readings satisfied
-- every acceptance criterion that existed before the first build trial asked.
GameConfig.Upgrades = {
${rows}
}

-- The one formula. Every axis goes through here, so "additive or compounding" is answered
-- in one place rather than re-decided by each module that reads a level.
function GameConfig.upgradeEffect(upgrade: { base: number, perLevel: number, mode: string }, level: number): number
	if upgrade.mode == "compounding" then
		return upgrade.base * (upgrade.perLevel ^ level)
	end
	return upgrade.base + upgrade.perLevel * level
end
`;
}

function setsBlock(collection, source) {
  const rows = collection.sets.map((s) =>
    `\t{ id = ${str(s.id)}, label = ${str(s.label)}, depth = ${num(s.depth)}, `
    + `relics = { ${s.relics.map(str).join(', ')} } },`).join('\n');
  return `
-- The collection. From ${source}.
--
-- These names are CID's work, not the builder's. When they were absent the builder
-- invented six of them, which is the exact failure this seam exists to remove.
GameConfig.RelicSets = {
${rows}
}

GameConfig.RelicsPerArea = ${num(collection.relicsPerArea)}

-- How many areas exist at one depth. In SCHEMA but previously not emitted, so a
-- config-level predicate could not see the value it depended on. Found by the
-- depth-escalation sheet: a key that validates but never reaches the build is a key
-- nothing downstream can check.
GameConfig.AreasPerDepth = ${num(collection.areasPerDepth ?? 1)}

-- The player-facing word for the class. Renamed once already, by a ban list that the
-- merger enforces: the previous noun was occupied inside this game's own genre family.
GameConfig.FindNoun = { singular = ${str(collection.className)}, plural = ${str(collection.classPlural)} }
`;
}

/**
 * @param {object} manifest validated build manifest
 * @param {Record<string,string>} provenance key -> sheet that provided it
 * @returns {string} Luau source
 */
export function emitGameConfig(manifest, provenance = {}) {
  const src = (key) => provenance[key] ?? 'an unrecorded sheet';
  const a = manifest.area;
  const m = manifest.movement;
  const p = manifest.patch;
  const r = manifest.runtime;

  const parts = [HEADER];

  parts.push(tiersBlock(manifest.tiers, src('tiers')));
  parts.push(upgradesBlock(manifest.upgrades, src('upgrades')));

  parts.push(`
-- Movement, before upgrades. From ${src('movement')}.
GameConfig.BaseClearRadius = ${num(m.baseClearRadius)}
GameConfig.BaseWalkSpeed = ${num(m.baseWalkSpeed)}
`);

  const cur = manifest.currency;
  parts.push(`
-- The currency. From ${src('currency')}.
--
-- This existed as the bare string "SHARDS" in a HUD brief and in the shipped screen
-- before any sheet owned it, which is how an unowned value hides: the merger cannot see
-- a literal nobody declared. Every display of the currency now derives from here.
GameConfig.Currency = {
	name = ${str(cur.name)},
	plural = ${str(cur.plural)},
	icon = ${str(cur.icon)},
}
`);

  parts.push(`
-- One patch's physical footprint. From ${src('patch')}.
GameConfig.Patch = {
	footprint = ${num(p.footprint)},
	collides = ${p.collides ? 'true' : 'false'},
	material = ${str(p.material)},
}
`);

  parts.push(`
-- The area. From ${src('area')}.
--
-- The schema checks that patchCount actually fits at this size and spacing, so an
-- area cannot quietly under-fill and be smaller than it claims.
GameConfig.Area = {
	id = ${str(a.id)},
	label = ${str(a.label)},
	originXZ = { ${a.originXZ.join(', ')} },
	size = ${num(a.size)},
	patchCount = ${num(a.patchCount)},
	minSpacing = ${num(a.minSpacing)},
}
`);

  parts.push(setsBlock(manifest.collection, src('collection')));

  parts.push(`
-- From ${src('onboarding')}. The first find is placed, not rolled, so the promise
-- that the first patch has something under it cannot be broken by the shuffle.
GameConfig.GuaranteedFirstRelic = ${manifest.onboarding.guaranteedFirstRelic ? 'true' : 'false'}
`);

  parts.push(`
-- Server cadences. From ${src('runtime')}.
--
-- RespawnDelaySeconds is here rather than in a task.wait literal because
-- Players.CharacterAutoLoads is off, which makes the engine's own Players.RespawnTime
-- dead and hands the whole respawn to server-main. The first playtest found nobody
-- had been handed it: a player who died stayed dead for the session.
GameConfig.ClearTickRate = ${num(r.clearTickRate)}
GameConfig.SaveIntervalSeconds = ${num(r.saveIntervalSeconds)}
GameConfig.RespawnDelaySeconds = ${num(r.respawnDelaySeconds)}
GameConfig.DataStoreName = ${str(r.dataStoreName)}

-- LayoutSeed is the ONLY seed in the game. layout.composition draws an area's chunk run
-- from (layoutSeed, areaOrdinal) and layout.anchorSource derives every patch anchor from
-- hash(layoutSeed, chunkId), so a second source of randomness makes state.cleared -- which
-- is keyed by patch index -- meaningless across a rejoin. MaxPlayers is a READ-ONLY
-- assertion: Players.MaxPlayers cannot be written from a script, so world.configure()
-- compares this against the live value and warns.
--
-- Both were added to runtime after the hand-written block above was written, and the
-- structural emitter below skips runtime because this block claims it. That is how a value
-- can validate, be documented in an interface, and reach nothing: interfaces names
-- GameConfig.LayoutSeed, and until this line existed there was no such field.
${r.layoutSeed === undefined ? '' : `GameConfig.LayoutSeed = ${num(r.layoutSeed)}`}
${r.maxPlayers === undefined ? '' : `GameConfig.MaxPlayers = ${num(r.maxPlayers)}`}
`);

  // Everything waves 2 and 3 added, emitted structurally. `HAND_WRITTEN` is the set above;
  // deriving the remainder from the schema rather than listing it means a key promoted later
  // reaches the build without anyone remembering to add it here. A key that validates but
  // never reaches the build is a key nothing downstream can check — which is exactly how
  // `areasPerDepth` sat unemitted until a sheet needed it.
  // `vocabulary` is deliberately NOT in this set, though it was.
  //
  // Every other name here is claimed by a hand-written block above that actually emits it.
  // `vocabulary` was claimed and then emitted by nothing, so `GameConfig.Vocabulary` did not
  // exist — the same "validates, is named in an interface, and reaches nothing" failure the
  // `layoutSeed` comment describes, one key over.
  //
  // It was not free. The `pressables` builder needed `maxLabelChars` to size a button's text,
  // found no config field, and wrote `14` as a literal in a client module; the `config`
  // builder then found the cause. Two modules hard-coding two different truncations is
  // exactly what a contract key exists to prevent, and re-emitting could not have fixed
  // either one.
  const HAND_WRITTEN = new Set([
    'tiers', 'upgrades', 'movement', 'currency', 'patch', 'area', 'collection',
    'onboarding', 'runtime',
  ]);
  // Technical keys that are a SPECIFICATION rather than tuned values, and that already have
  // their own emitted artifact. Dumping them here put 2,700 lines of module plan, interface
  // notes and lifecycle prose into a runtime module every file requires -- and dragged the
  // strings "Enum.PartType.Ball" and "Vector3.new(...)" into a file whose own contract says
  // it constructs no Roblox type, where a grep for either now finds a false positive.
  //
  //   stateShape -> game/src/shared/Types.luau      (architect/emit-types.mjs)
  //   modules    -> docs/BUILD-ORDER.md             (bridge/emit-buildorder.mjs)
  //   tree, interfaces, representation, wiring -> the build brief, read by a builder and
  //                                               never by a running module
  //
  // `runtime` is deliberately NOT here: it is tuned values, and the hand-written block above
  // emits it.
  const SPECIFICATION_ONLY = new Set([
    'tree', 'modules', 'interfaces', 'representation', 'stateShape', 'wiring',
  ]);
  const derived = Object.keys(manifest)
    .filter((k) => !HAND_WRITTEN.has(k) && !SPECIFICATION_ONLY.has(k))
    .sort();
  if (derived.length) {
    parts.push(`
-- ==========================================================================
-- Waves 2-3. Emitted structurally from the manifest, whole.
--
-- The reasoning for each lives in the sheet named beside it. The emitter carries values,
-- never prose -- conflating the two is what made the pre-bridge handoff unusable.
-- ==========================================================================
`);
    for (const key of derived) {
      parts.push(`
-- From ${src(key)}.
GameConfig.${pascal(key)} = ${luau(stripDocumentation(manifest[key]))}
`);
    }
  }

  parts.push(FOOTER);
  return parts.join('');
}
