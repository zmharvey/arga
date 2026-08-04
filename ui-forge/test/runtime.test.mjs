/**
 * Does the emitted Luau actually survive contact with Roblox?
 *
 * WHY THIS EXISTS
 * ---------------
 * The first playtest of the pipeline-built game showed no HUD and dead keybinds. The cause
 * was one line in `UIBuilder`:
 *
 *     Text is not a valid member of ImageLabel "ReadoutIcon"   UIBuilder:466
 *
 * `placeholder` is overloaded. On a TextBox it is the placeholder string; on an ImageLabel
 * it names an asset that does not exist yet. `buildNode` gated its text branch on the field
 * being present rather than on the Instance being able to hold text, so an icon with no
 * asset set `.Text` on an ImageLabel and threw. That error propagated out of
 * `UIBuilder.build`, killed the client entry point on its second statement, and took the
 * whole HUD and every keybind with it.
 *
 * Three checks had already run over that exact file and none of them stopped it:
 *
 *   luau-analyze          only environmental noise; it has no Roblox definitions
 *   luau-lsp + real defs  40 errors in UIBuilder, which I read as pre-existing and skipped
 *   a stub harness        passed, because the fake Instance accepted every property write
 *
 * The third is the instructive one. **A fake that accepts everything proves nothing.** The
 * harness below refuses a property the class cannot hold, which is the single behaviour that
 * would have caught this before Studio did.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = promisify(execFile);
const ROOT = 'game/src/shared/';

/** Properties only some classes have. Enough to catch the class of bug, not a full API dump. */
const STUB = `
local TEXT_ONLY = { Text=true, TextColor3=true, TextSize=true, Font=true, TextWrapped=true,
	TextXAlignment=true, TextYAlignment=true, RichText=true, TextTruncate=true, TextScaled=true,
	LineHeight=true, FontFace=true, TextTransparency=true, PlaceholderText=true,
	PlaceholderColor3=true, ClearTextOnFocus=true, MultiLine=true }
local IMAGE_ONLY = { Image=true, ImageColor3=true, ImageTransparency=true, ScaleType=true,
	SliceCenter=true, TileSize=true, ResampleMode=true, HoverImage=true, PressedImage=true }
local HOLDS_TEXT = { TextLabel=true, TextButton=true, TextBox=true }
local HOLDS_IMAGE = { ImageLabel=true, ImageButton=true }
local violations, created = {}, 0
local function newInstance(class)
	created += 1
	local props, children = { ClassName = class, Name = class }, {}
	local proxy = {}
	setmetatable(proxy, {
		__isinst = true,
		__index = function(_, k)
			if k == 'GetChildren' then return function() return children end end
			if k == 'IsA' then return function(_, c)
				return c == class or c == 'GuiObject' or c == 'Instance' or c == 'GuiBase2d'
			end end
			if k == 'FindFirstChild' then return function(_, n)
				for _, ch in children do if ch.Name == n then return ch end end
				return nil
			end end
			if k == '_kids' then return children end
			return props[k]
		end,
		__newindex = function(t, k, v)
			if (TEXT_ONLY[k] and not HOLDS_TEXT[class]) or (IMAGE_ONLY[k] and not HOLDS_IMAGE[class]) then
				table.insert(violations, k .. ' is not a valid member of ' .. class .. ' "' .. tostring(props.Name) .. '"')
			end
			props[k] = v
			if k == 'Parent' and v ~= nil and (getmetatable(v) or {}).__isinst then table.insert(v._kids, t) end
		end,
	})
	return proxy
end
local Instance = { new = newInstance }
local function col(r,g,b) local c c = { R=r or 0, G=g or 0, B=b or 0 } c.Lerp = function() return c end return c end
local Color3 = { fromRGB = col, new = col, fromHSV = col }
local UDim2 = { new = function(a,b,c,d) return {X={Scale=a,Offset=b},Y={Scale=c,Offset=d}} end,
	fromScale=function(a,b) return {X={Scale=a,Offset=0},Y={Scale=b,Offset=0}} end,
	fromOffset=function(a,b) return {X={Scale=0,Offset=a},Y={Scale=0,Offset=b}} end }
local UDim = { new = function(a,b) return {Scale=a,Offset=b} end }
local Vector2 = { new = function(a,b) return {X=a,Y=b} end }
local Rect = { new = function() return {} end }
local TweenInfo = { new = function() return {} end }
local NumberSequence = { new = function() return {} end }
local ColorSequence = { new = function() return {} end }
local Font = { new = function() return {} end, fromEnum = function() return {} end }
local Enum = setmetatable({}, { __index = function() return setmetatable({}, { __index = function(_, k) return { Name = k, Value = 0 } end }) end })
local game = { GetService = function() return { Create = function() return { Play = function() end } end } end }
local workspace = { CurrentCamera = { ViewportSize = { X = 1280, Y = 720 } } }
local warn = function() end
`;

const wrap = (src) => `(function()\n${src.replace(/^--!strict\s*/m, '')}\nend)()`;

/** Build one emitted screen under the strict stub and report what it did. */
async function buildScreen(screen, { mutate } = {}) {
  let ui = await readFile(`${ROOT}UIBuilder.luau`, 'utf8');
  if (mutate) ui = mutate(ui);

  const source = STUB
    + `\nlocal Theme = ${wrap(await readFile(`${ROOT}Theme.luau`, 'utf8'))}`
    + `\nlocal Screen = ${wrap(await readFile(`${ROOT}Screens/${screen}.luau`, 'utf8'))}`
    + `\nlocal UIBuilder = ${wrap(ui)}`
    + `
local parent = Instance.new('ScreenGui')
local ok, err = pcall(function() return UIBuilder.build(Screen, Theme, parent) end)
print(ok and 'THREW=no' or ('THREW=yes ' .. tostring(err)))
print('CREATED=' .. created)
for _, v in violations do print('VIOLATION=' .. v) end
`;

  const dir = await mkdtemp(join(tmpdir(), 'uiforge-'));
  const file = join(dir, 'run.luau');
  await writeFile(file, source, 'utf8');
  try {
    const { stdout } = await run('luau', [file]);
    return {
      threw: stdout.includes('THREW=yes'),
      created: Number(stdout.match(/CREATED=(\d+)/)?.[1] ?? 0),
      violations: [...stdout.matchAll(/^VIOLATION=(.+)$/gm)].map((m) => m[1]),
    };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// Screens this game actually ships. `client-main` requires exactly one of them.
const SHIPPED = ['hud'];

// The rest are ui-forge's sample corpus, kept because they exercise patterns the shipped
// screen does not. They must not set an impossible property either, but they are allowed to
// reference a theme this game does not have — see the roster test below.
const SAMPLES = ['shop', 'inventory', 'quests', 'crates'];

for (const screen of SHIPPED) {
  test(`${screen} ships, so it must build and set nothing impossible`, async () => {
    const r = await buildScreen(screen);
    assert.equal(r.threw, false, `UIBuilder.build threw on ${screen}`);
    assert.ok(r.created > 0, `${screen} produced no Instances`);
    assert.deepEqual(r.violations, [], `${screen} set properties its classes do not have`);
  });
}

for (const screen of SAMPLES) {
  test(`${screen} sets no property a class cannot hold`, async () => {
    const r = await buildScreen(screen);
    assert.deepEqual(r.violations, [], `${screen} set properties its classes do not have`);
  });
}

test('roster is a sample for a theme this game does not have, and fails loudly', async () => {
  // Found by this file on its first run. `roster` asks for `element.fire`, `.water`, `.earth`
  // and `.lightning` — a monster roster from earlier ui-forge work, against a theme that no
  // longer exists. The current theme is the ruin game's.
  //
  // This is the token system doing its job: an unknown token is refused rather than rendered
  // as some default, which is the rule that keeps reskin working. So the test asserts the
  // refusal rather than pretending the screen is fine, and roster stays as a corpus entry.
  const r = await buildScreen('roster');
  assert.equal(r.threw, true, 'roster must still be refused while its tokens are undefined');
  assert.deepEqual(r.violations, [], 'it must fail on the token, not on a bad property');
});

test('the harness catches the bug that shipped, so it is not vacuous', async () => {
  // Revert the one-line guard and confirm the exact Studio error comes back. Without this,
  // the six tests above would keep passing if the stub silently stopped checking.
  const r = await buildScreen('hud', {
    mutate: (src) => src.replace(
      /\tlocal holdsText = [^\n]*\n\tif holdsText and \(node\.text ~= nil or node\.placeholder ~= nil\) then/,
      '\tif node.text ~= nil or node.placeholder ~= nil then',
    ),
  });
  assert.ok(r.violations.length > 0, 'reverting the fix must reproduce the failure');
  assert.ok(
    r.violations.some((v) => v === 'Text is not a valid member of ImageLabel "ReadoutIcon"'),
    `expected the Studio error verbatim, got: ${r.violations.slice(0, 3).join(' | ')}`,
  );
});

test('an image placeholder still paints the node, rather than being skipped', async () => {
  // The guard must not throw the baby out: `placeholder` on an ImageLabel is meaningful and
  // is what makes a missing asset loud instead of invisible.
  const ui = await readFile(`${ROOT}UIBuilder.luau`, 'utf8');
  assert.match(ui, /elseif node\.placeholder and \(class == "ImageLabel"/);
  assert.match(ui, /Color3\.fromRGB\(255, 0, 200\)/);
});
