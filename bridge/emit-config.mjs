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
	},`).join('\n');
  return `
-- The spend side of the loop. From ${source}.
GameConfig.Upgrades = {
${rows}
}
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
GameConfig.ClearTickRate = ${num(r.clearTickRate)}
GameConfig.SaveIntervalSeconds = ${num(r.saveIntervalSeconds)}
GameConfig.DataStoreName = ${str(r.dataStoreName)}
`);

  parts.push(FOOTER);
  return parts.join('');
}
