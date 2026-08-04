/**
 * stateShape -> Types.luau.
 *
 * The same move `emit-config.mjs` makes for values, made for shapes.
 *
 * Six of ten builders in one wave reported that no module owns `PlayerState`. Five of them
 * declared their own copy, and two disagreed: `Persistence` had `player: Player?` because
 * `defaultState()` runs before a player is attached, while `Clearing` had `player: Player`
 * because by the time it ticks, one is. Both are locally right. Together they are a type
 * error across a module boundary that only passes because an instance require resolves to
 * `any`.
 *
 * That disagreement is not a builder mistake, it is a missing artifact. `stateShape` has
 * described these fields for a while; nothing turned the description into something a module
 * could require. So each builder turned it into Luau independently, which is exactly the
 * re-interpretation this repo exists to remove — one level below where it was last removed.
 *
 * Two types come out, because the state genuinely has two lives:
 *
 *   StoredState   what persistence loads and saves. Persisted fields only.
 *   PlayerState   the live table. StoredState plus the runtime fields.
 *
 * Naming both is what makes `Player?` unnecessary: the stored shape has no player because it
 * has no player, not because the field is sometimes missing.
 */

/** `map<upgradeId,integer>` and `Patch[]` are contract spellings, not Luau ones. */
function luauType(spec, types) {
  const t = String(spec).trim();

  const map = t.match(/^map<\s*([A-Za-z]+)\s*,\s*([A-Za-z]+)\s*>$/);
  if (map) {
    return `{ [${scalar(map[1])}]: ${scalar(map[2])} }`;
  }

  const arr = t.match(/^([A-Za-z]+)\[\]$/);
  if (arr) return `{ ${types[arr[1]] ? arr[1] : scalar(arr[1])} }`;

  return types[t] ? t : scalar(t);
}

function scalar(t) {
  const k = String(t).toLowerCase();
  switch (k) {
    case 'integer': case 'number': return 'number';
    case 'boolean': return 'boolean';
    case 'string': return 'string';
    default:
      // The contract names map keys for what they mean — `patchIndex`, `upgradeId`,
      // `relicName` — which is right for a reader and not a Luau type. An index is a number
      // and a name or id is a string; anything else is a Roblox class or a record from
      // stateShape.types and passes through.
      if (/index$|count$/i.test(k)) return 'number';
      if (/id$|name$|key$/i.test(k)) return 'string';
      return t;
  }
}

/** A record from `stateShape.types`, as a Luau type. `__roblox` means "the engine's". */
function recordType(name, def) {
  if (def && typeof def === 'object' && def.__roblox) return null;
  const fields = Object.entries(def ?? {})
    .map(([k, v]) => {
      const optional = String(v).endsWith('?');
      const bare = String(v).replace(/\?$/, '');
      return `\t${k}: ${scalar(bare)}${optional ? '?' : ''},`;
    })
    .join('\n');
  return `export type ${name} = {\n${fields}\n}`;
}

/**
 * @param {object} stateShape the validated technical key
 * @param {string} source the sheet that provided it
 */
export function emitTypes(stateShape, source = 'an unrecorded sheet') {
  const { fields = [], types = {} } = stateShape;

  const records = Object.entries(types)
    .map(([name, def]) => recordType(name, def))
    .filter(Boolean);

  const note = (n) => {
    const flat = String(n).replace(/\s+/g, ' ').trim();
    return flat.length > 88 ? `${flat.slice(0, 87)}…` : flat;
  };
  const line = (f) => `\t${f.name}: ${luauType(f.type, types)},${f.note ? ` -- ${note(f.note)}` : ''}`;
  const stored = fields.filter((f) => f.persisted);
  const live = fields.filter((f) => !f.persisted);

  return `--!strict
--[[
	GENERATED FILE — do not edit.

	Emitted from the \`stateShape\` key by \`npm run architect -- --emit\`. Edit
	${source} and re-emit.

	**Require this. Do not declare your own copy.** Five modules once declared their own
	\`PlayerState\` and two of them disagreed about whether \`player\` was optional, which is a
	type error across a module boundary that only passed because an instance require resolves
	to \`any\`. One generated type cannot disagree with itself.

	Two types, because the state has two lives. \`StoredState\` is what persistence reads and
	writes; \`PlayerState\` is the live table the server holds while a player is connected.
]]

${records.join('\n\n')}

--[[
	What survives a rejoin. Exactly the fields \`stateShape\` marks persisted, which is also
	exactly what \`persistence.save\` writes — the two cannot drift, because both come from
	the same list.
]]
export type StoredState = {
${stored.map(line).join('\n')}
}

--[[
	The live table. \`StoredState\` plus the fields that exist only while connected.

	\`player\` is not optional here. A state with no player is a \`StoredState\`, which is a
	different type rather than the same type with a hole in it.
]]
export type PlayerState = StoredState & {
${live.map(line).join('\n')}
}

--[[
	Many states, keyed the way \`stateShape.collection\` says. \`tick(states)\` was handed to a
	builder with no statement of what \`states\` was; one guessed a map keyed by Player and
	another by UserId.
]]
export type States = { [${(stateShape.collection?.keyedBy ?? 'number') === 'UserId' ? 'number' : 'Player'}]: PlayerState }

return {}
`;
}
