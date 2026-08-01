# 04 — Runtime tree and require style

**Stage:** architect · **Key:** tree

## Decision

**Instance requires, three roots, and the roots are not all folders.**

```
ReplicatedStorage.UIForge              <- game/src/shared    a Folder
ServerScriptService.Game               <- game/src/server    a Script; init.server.luau IS this instance
StarterPlayer.StarterPlayerScripts.UIBoot  <- game/src/client   a LocalScript; init.client.luau IS this instance
```

A server or client module reaches shared with one `WaitForChild` on the root and plain
indexing after it. A server module reaches its siblings with `script.Parent`, and the server
entry point reaches them with `script` — **not** `script.Parent`, because the entry point is
the container. Same on the client.

The mapping above is `game/default.project.json` as it stands today. **This sheet does not
change it.**

## Why

- **Both build trials named the missing tree as their most likely cause of total failure**,
  and the reason is the second bullet above rather than the first. Rojo turns a directory
  containing `init.server.luau` into a *Script named after the directory's key*, with its
  siblings as **children of that Script**. So from inside `init.server.luau`,
  `script.Persistence` resolves and `script.Parent.Persistence` is nil. A builder who has
  only ever written `script.Parent` gets a nil index on line one of the entry point, and the
  error names a child, not the tree, so the diagnosis is not obvious. `src/shared` has no
  `init`, so it *is* a plain Folder and behaves the way people expect. The three roots are
  three different shapes and that is the whole hazard.
- **`UIForge` is kept, and it is a bad name.** `game/src/shared` now holds `GameConfig`,
  `Layout` and `Protocol`, none of which is a UI concern; the name is left over from
  `ui-forge` claiming that directory first. It stays because renaming it means editing
  `game/default.project.json` and `game/src/client/calibrate.client.luau`, **and no module in
  the build order owns either file.** A rename would be a required step with no owner, which
  is the exact defect class this stage exists to remove — introduced to fix a name. `[architect: flagged]`
  the rename below, with the full change set, for whoever adds a project-file step.
- **Instance requires, not string requires.** String requires are not the Roblox convention
  and do not resolve across `ReplicatedStorage` from `ServerScriptService`. `[architect: not arbitrary]`
  there is one right answer here.
- **`WaitForChild` on the root, direct indexing on the children.** A server Script can run
  before `ReplicatedStorage` has finished replicating its children, so the root needs the
  wait; once the Folder is present, Rojo has already populated it, so `.GameConfig` after it
  is safe and 140 `WaitForChild` calls per boot are not. One wait, at the top, assigned to a
  local. **There is exactly one other legitimate wait in the game and it is inside
  `Protocol.luau`:** `ReplicatedStorage.Remotes` is declared in the manifest as `remotesRoot`
  and created at runtime by
  `protocol.createRemotes()` rather than by Rojo, so it is not in this tree and a client can boot
  before it replicates. `protocol.channel(name)` waits for it once, on its first call, and caches
  it. No other file waits for a remote, and none searches for one.
- **No module runs work at require time.** Every module returns one table and does nothing
  else on load, so require order cannot matter. This is what makes the dependency order in
  `BUILD-ORDER.md` a build convenience rather than a runtime constraint.

```manifest
{
  "provides": "tree",
  "value": {
    "sharedRoot": "ReplicatedStorage.UIForge",
    "serverRoot": "ServerScriptService.Game",
    "clientRoot": "StarterPlayer.StarterPlayerScripts.UIBoot",
    "remotesRoot": "ReplicatedStorage.Remotes",
    "requireStyle": "instance",
    "requireExample": "local GameConfig = require(game:GetService(\"ReplicatedStorage\"):WaitForChild(\"UIForge\"):WaitForChild(\"GameConfig\"))",
    "projectFile": "game/default.project.json",
    "clientRuntimeRoot": "Players.LocalPlayer.PlayerScripts.UIBoot",
    "diskPaths": {
      "shared": "game/src/shared",
      "server": "game/src/server",
      "client": "game/src/client"
    },
    "rootClass": {
      "shared": "Folder — game/src/shared has no init file, so the root is a plain container",
      "server": "Script — game/src/server/init.server.luau IS ServerScriptService.Game; the other server modules are its children",
      "client": "LocalScript — game/src/client/init.client.luau IS StarterPlayerScripts.UIBoot; the other client modules are its children"
    },
    "examples": {
      "sharedFromAnySide": "local Shared = game:GetService(\"ReplicatedStorage\"):WaitForChild(\"UIForge\")\nlocal GameConfig = require(Shared.GameConfig)\nlocal Layout = require(Shared.Layout)\nlocal Protocol = require(Shared.Protocol)",
      "serverModuleFromTheServerEntryPoint": "local Persistence = require(script.Persistence)",
      "serverModuleFromAnotherServerModule": "local Progression = require(script.Parent.Progression)",
      "clientModuleFromTheClientEntryPoint": "local HudBinding = require(script.HudBinding)",
      "clientModuleFromAnotherClientModule": "local Input = require(script.Parent.Input)"
    },
    "fileNaming": {
      "module": "PascalCase.luau -> a ModuleScript of the same name. Persistence.luau -> ServerScriptService.Game.Persistence",
      "serverEntry": "init.server.luau -> the Script at serverRoot itself, not a child of it",
      "clientEntry": "init.client.luau -> the LocalScript at clientRoot itself, not a child of it",
      "extraClientScripts": "any other *.client.luau in game/src/client becomes a sibling LocalScript, e.g. calibrate.client.luau -> UIBoot.calibrate"
    },
    "rules": [
      "Every module returns exactly one table and performs no work at require time.",
      "WaitForChild the shared root once, into a local; index its children directly after that.",
      "Never require across sides except into shared. A server module may not require a client module and the reverse, and the module schema refuses it on paper.",
      "Never write clientRuntimeRoot as a literal path. A client module reaching a sibling uses script.Parent; the entry point uses script.",
      "The client tree is authored at clientRoot and replicated to clientRuntimeRoot per player. Both names are here so a builder recognises the second one in an error message, not so anything indexes it."
    ]
  }
}
```

## Consequences for the builders

A builder may now assume:

- Which of `script`, `script.Parent` and the shared root to use, per file, without opening a
  sibling to find out.
- That requiring a module has no side effects, so it may require its dependencies at the top
  of the file in any order.
- That `game/default.project.json` already maps all three roots and needs no edit. **Nothing
  in the build order is allowed to edit it**; if a module needs a fourth root, that is a stop.

A builder may **not** assume:

- That `UIForge` means UI. It is the shared root for everything, game modules included.
- That `Workspace.Baseplate` in the project file is the terrace. It is a lobby floor; the
  ground a player walks on is per-plot and comes from `representation`.

## Acceptance criteria

1. `game/default.project.json` maps `src/shared`, `src/server` and `src/client` to
   `sharedRoot`, `serverRoot` and `clientRoot` exactly as stated, with no edit required.
2. No `.luau` file under `game/src` requires a module across sides except into `sharedRoot`.
3. The server entry point requires its siblings as `script.<Name>`; every other server module
   requires them as `script.Parent.<Name>`. Same shape on the client.
4. `WaitForChild` appears at most once per file: on the shared root, or — in `Protocol.luau`
   alone — on the runtime-created `ReplicatedStorage.Remotes` folder. Nowhere does it appear on an
   individual remote, and `FindFirstChild` with a recursive flag appears nowhere at all.
5. Requiring every module in a bare Luau process, in any order, produces no output and no
   error other than the ones that need Roblox globals.

## Not decided here

**Flagged, not decided: rename `UIForge` to `Shared`.** The full change is three lines —
`game/default.project.json:7`, and the shared-root require in each of the two entry points —
plus one in `game/src/client/calibrate.client.luau`. It needs an owner for the project file
first. Routed to whoever adds a project-file step to `BUILD-ORDER.md`; not to CID, which has
no view on this.

What goes in `Workspace` beyond the plot (Art — Environment). Whether a second area gets a
second shared subfolder (`gameplay/meta`, when a second area exists). The `ui-forge` emit
target inside `sharedRoot`, which `npm run emit` already owns.
