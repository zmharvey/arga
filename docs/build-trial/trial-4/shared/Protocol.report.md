# Build report — protocol

## Stops

Three. None of them is a missing number: protocol needed no tuned value at all, and the
three *Values* blocks the pack shipped with this brief (`collection`, `upgrades`,
`currency`) are used by nothing in the module. The gaps are in the contract's own shape.

1. **The declared return type of `channel(name)` is not writable as stated.** The interface
   says it returns `RemoteEvent | RemoteFunction`. Under `--!strict` with the real Roblox
   type definitions, no member of that union is accessible without narrowing: `.OnClientEvent`
   and `:FireClient` exist only on the first arm, `.OnServerInvoke` and `:InvokeServer` only
   on the second. Every call site the wiring shows (`protocol.channel("BuyUpgrade").OnServerEvent`,
   `protocol.channel("RequestState"):InvokeServer()`, and so on) would fail to typecheck
   against that signature. The brief never says whether the five consumer modules are
   expected to cast, or whether protocol hands back something untyped. **I did not halt: I
   return `any`.** The alternatives I would otherwise have had to invent are a typed pair
   (`event(name): RemoteEvent` / `invoke(name): RemoteFunction`, which changes the *Must
   expose* list) or a mandated `:: RemoteEvent` cast convention in four other modules. The
   choice is not local to this file — it decides whether remote misuse is a compile error or
   a runtime one everywhere in the game.

2. **The snapshot's *shape* is only its field names.** protocol is told it "define[s] the
   shape of the state snapshot both sides agree on", but the only artifact specified is
   `snapshotShape(): { string }`. Nothing states the wire type of each field: whether
   `upgrades` crosses as the raw `map<upgradeId,integer>`, whether `found` crosses as the raw
   map or as a count, whether `clearedCount` travels with `area.patchCount` beside it or the
   HUD reads the total from `GameConfig.Area.patchCount`, and whether a `nil` field is legal.
   I therefore export no `Snapshot` type and no validator, because inventing per-field types
   here would silently become the contract. Two consequences a reader should know: a snapshot
   is untyped on both sides, and any disagreement between the module that builds one and the
   module that reads one will surface as a runtime `nil`, not as an analyzer error.

3. **Nothing owns the construction of a snapshot.** Two modules must produce one —
   server-main in four places (join, spawn, post-purchase, `RequestState`) and clearing once
   per changed tick — and the only thing they share is a list of names. My *Must expose* list
   has no `snapshot(state)` builder, so the loop that turns a `PlayerState` into a payload is
   written twice, in two modules, by two builders, and acceptance criterion 2 ("client and
   server both derive field names from this module rather than repeating literals") is
   enforced by nothing but goodwill. **I did not add a builder**, because adding an export the
   contract does not list is the same class of error as inventing a number. It is the single
   likeliest place for two builders to produce two different games from this specification.

## Decided without a stated value

### The contents of `REMOTES`

1. Entries carry exactly four fields — `class`, `direction`, `payload`, `firedBy` — because
   the interface names four. The brief's `handledBy` and `why` for each channel went into
   comments above each entry rather than into the table. Another builder who reads "the five
   channels below" as "put the whole block in the table" produces a different public shape.
2. The strings inside those fields are copied verbatim from the brief's channel table.
3. `firedBy` for `StateChanged` is therefore the sentence *"server-main on join, on spawn and
   after a successful purchase; clearing once per tick in which anything changed"*. The
   interface calls this field "the one module that originates it", and for this channel it is
   deliberately two. Anything that ever tries to *read* `firedBy` as a module id will work for
   four channels and break on the fifth.
4. `class` is typed as the literal union `"RemoteEvent" | "RemoteFunction"` and `direction` as
   `"client -> server" | "server -> client"`, rather than `string`. This is what makes a
   sixth channel with a bogus class a type error.
5. `export type ChannelDef` is exported. It is not on the *Must expose* list; it adds no
   runtime member and exists so a consumer can annotate. Removing it costs nothing.
6. `REMOTES` is a map, so iteration order is undefined and the five Instances are created in
   an arbitrary order. Nothing stated depends on it.
7. `table.freeze` is applied to every channel def, to `REMOTES` itself and to the snapshot
   field list. Nobody asked for immutability; I read "no other module may declare a remote"
   as worth enforcing rather than documenting. A module that tries to add a sixth channel at
   runtime now errors instead of succeeding.

### `snapshotShape()`

8. It returns the *same* frozen table on every call rather than a fresh copy. A builder who
   copies makes a caller's mutation harmless; I make it throw. Field order is exactly the
   order the interface lists it in, kept in case anything treats it as positional (nothing
   visibly does).
9. The five names are string literals in this file. They are unavoidable here — this is the
   declaring module — but note they are also, exactly, five `PlayerState` field names from
   03-state-shape, and nothing in the contract ties those two lists together. I assumed the
   correspondence is intentional (see *Assumed*).

### `createRemotes()`

10. **The idempotency rule is implemented per channel, not per folder.** The literal reading
    ("a second call creates nothing and returns the existing Folder") has a failure mode I was
    not willing to ship: an *empty* Folder named `Remotes` — left by a plugin, or added to
    `default.project.json` by someone who read the name here — would be adopted whole, and then
    every `channel()` call in the game would wait forever on a child that is never coming, with
    no error anywhere. So: adopt the Folder, then create only the channels that are missing. In
    the case the brief actually describes (a genuine second call) all five are present and
    nothing is created, exactly as specified.
11. A pre-existing Instance named `Remotes` that is **not** a Folder errors, rather than being
    renamed, destroyed or ignored.
12. A channel present with the **wrong class** errors, rather than being destroyed and
    recreated, because destroying it would invalidate a reference a caller may already hold.
13. That wrong-class test is `present.ClassName ~= def.class` (exact class equality), not
    `:IsA(def.class)`. A subclass would be rejected. There is no relevant subclass today.
14. The class is constructed with an explicit two-branch dispatch on `def.class` plus an
    unreachable `else` that errors, rather than the shorter `Instance.new(def.class)`. Both
    forms typecheck against the real Roblox definitions (I checked). I chose the branch form
    because **acceptance criterion 4 greps for `Instance.new("Remote`**, and the data-driven
    form makes that grep match *zero* files, which an automated checker would read as a
    failure. Worth flagging upward: that criterion quietly dictates an implementation shape,
    and it is in mild tension with "the class taken from that table". The unreachable `else`
    is there so that adding a third class to `ChannelDef` later cannot silently produce a
    `RemoteEvent`.
15. When the Folder is new it is parented to ReplicatedStorage **last**, after its children, so
    the folder and its five channels replicate in one go. When an existing Folder is being
    filled, children are parented one at a time. Neither is stated; `channel()` waits per name
    anyway, so this is belt and braces.
16. Nothing but `Name` and `Parent` is set on a remote. No `Archivable = false`, no attributes.
17. The client guard is `not RunService:IsServer()`, not `RunService:IsClient()`, so a Studio
    context that reports as both does not error.
18. The function returns only the Folder. No second return value reporting whether it created
    anything, and it logs nothing on success.

### `channel(name)`

19. The undeclared-name check runs **before** the folder is resolved, so a typo errors
    immediately rather than after a `WaitForChild` that will never return.
20. The check is `REMOTES[name] == nil` — exact, case-sensitive key match, no near-miss
    suggestion in the message, no listing of valid names (the list would print in arbitrary
    order).
21. `name` is typed `string`, not a union of the five literal names. A literal union would
    turn a typo into a *type* error at every call site, which is arguably what "an undeclared
    name is an error rather than a warning and a nil" is reaching for; I did not do it because
    the interface writes `name: string` and it would forbid a computed name.
22. `tostring(name)` is used when formatting the error, so a non-string argument arriving from
    untyped code produces the intended message instead of failing inside `string.format`.
23. Each resolved Instance is cached per name, not just the folder. The brief only asked for
    the folder to be cached. Consequence: if a remote were ever destroyed and recreated at
    runtime, this module would keep handing out the dead one.
24. `WaitForChild` is used with **no timeout**, for the folder and for each remote. So a
    server-side `channel()` call that somehow precedes `createRemotes()` hangs forever rather
    than erroring; Roblox's own "Infinite yield possible" warning after 5s is the only signal.
    A server-side `FindFirstChild`-and-error path would diagnose that better, and I did not add
    one because the brief asserts a server caller cannot get there.
25. Two coroutines racing on the first call both `WaitForChild` and the last write wins. Same
    Instance either way; no lock.
26. `direction` is documentation and nothing enforces it. A server caller can resolve
    `BuyUpgrade`, a client can resolve `StateChanged` and call `:FireServer()` on it. `channel()`
    also does not re-check the resolved Instance's class against `def.class`; only
    `createRemotes` does.

### Error strings (all three invented)

27. `Protocol.createRemotes may only be called from the server`
28. `Protocol.createRemotes: ReplicatedStorage.Remotes already exists and is a %s, not a Folder`
29. `Protocol.createRemotes: ReplicatedStorage.%s.%s is a %s, but channel %s is declared as a %s`
30. `Protocol.channel: %s is not a declared remote channel`
31. Caller-facing errors use `error(msg, 2)` so the traceback blames the call site. The
    unreachable "unsupported class" invariant error uses the default level, because that one is
    this file's own table being wrong.

### Shape of the file

32. Names I chose: `Protocol`, `REMOTES_FOLDER_NAME`, `SNAPSHOT_FIELDS`, `channelCache`,
    `remotesFolder`, `remotesRoot()`, `folderIsNew`, `existing`, `present`, `def`, `remote`.
33. `pairs(...)` explicitly rather than generalized iteration, matching `GameConfig`'s explicit
    `ipairs`. Tabs, `--[[ ]]` doc blocks above each function and long single-line comments also
    copied from `GameConfig`; there is no `stylua.toml` or `.editorconfig` in the working root
    to settle line length, so a couple of lines run past 100 characters, as `GameConfig`'s own
    do.
34. **`GameConfig` is not required at all.** protocol's declared dependency on `config` buys it
    nothing: no channel name, no class, no folder name and no snapshot field is a tuned value.
    An unused `require` would be dead weight and a lint warning, so there is no runtime edge
    from protocol to config in this build, contrary to the dependency graph.
35. The header comment restates several rationales from the brief in prose (why two originators
    are safe, why there is no clearing channel). That duplicates spec text into code, where it
    can drift from the sheet.

### How it was checked

36. `luau-analyze` (homebrew build, no `--defs` flag) has **no Roblox API definitions**, so
    against the file as written it reports only environmental diagnostics: `Unknown global
    'game'` ×2, `Unknown global 'Instance'` ×3, `Unknown type 'Folder'` ×2, `Unknown type
    'Instance'` ×3, and a `string.format` complaint that follows from those. There is no logic
    or lint finding. `GameConfig.luau` is clean under the same tool only because it constructs
    no Roblox types at all. I verified the module two further ways rather than accept that as
    "clean": (a) `luau-analyze` on a copy whose first 22 lines are a stub Roblox surface —
    **zero diagnostics under both the new and the old solver**; (b) `luau-lsp 1.69.0 analyze
    --definitions=globalTypes.d.luau` against the real Roblox API dump — **zero diagnostics**,
    with a deliberately seeded type error confirming the check was live. I also ran the module
    against a fake Instance tree to confirm five channels of the right classes, idempotency,
    the same Instance on repeat lookups, the undeclared-name error, the client-side
    `createRemotes` error, the frozen tables, and the two adoption cases in item 10.
37. One decision that this forced: I removed the module's reliance on `IsA` **type refinement**
    (hoisting `ClassName` before the check and writing `existing :: Folder`) because refinement
    across a class hierarchy cannot be modelled without a definitions file, and I wanted the
    file to check out under a bare analyzer as well as a Roblox-aware one. With real definitions
    the cast is redundant.

## Assumed about a dependency

1. `GameConfig.luau` exists at `game/src/shared/GameConfig.luau`, returns a plain table and is
   not callable. I read it; it is. protocol uses none of it.
2. **The brief contradicts itself on the shared root.** `tree.sharedRoot` is
   `ReplicatedStorage.UIForge` and every example uses it, but the `config` interface note says
   *"require(ReplicatedStorage.Shared.GameConfig) IS this table"*. It cost me nothing because I
   require nothing, but every other module in this build has two spellings to choose from and
   only one of them exists.
3. server-main calls `createRemotes()` exactly once at boot (wiring.boot step 2) before any
   server-side `channel()` call. Nothing in this module can enforce that ordering; a server
   module that calls `channel()` first yields forever.
4. No module destroys, renames or re-parents anything inside `ReplicatedStorage.Remotes` for the
   life of the server. The per-name cache depends on it.
5. `game/default.project.json` does not already declare a Folder named `Remotes` under
   ReplicatedStorage. Item 10 makes that survivable rather than fatal, but if it did, the
   brief's claim that these Instances are "made at runtime" and not Rojo-managed would be false.
   I could not check: the project file is not in my working root.
6. Consumers treat `channel()`'s result as the class `REMOTES` declares for that name
   (`OnServerInvoke` on the RemoteFunction, `FireClient`/`OnClientEvent` on the RemoteEvents).
   Since the return is `any`, nothing checks that for them — see Stop 1.
7. The five snapshot field names are the same strings as the corresponding `PlayerState` field
   names in 03-state-shape, so a builder can write `payload[field] = state[field]`. They match
   exactly; nothing states that they must.
8. No other file contains a remote-name literal or the string `"Remotes"` (acceptance criterion
   4). I cannot verify it — the other modules are not mine to read, and two of them I am
   forbidden to open. Within my own file the grep for `Instance.new("Remote` matches here and
   nowhere else in `game/src`.
9. `input` fires `BuyUpgrade` with exactly one string, and clearing fires `FindRevealed` with
   exactly one string. protocol enforces nothing about payloads and cannot: a RemoteEvent has no
   schema. The payload column of `REMOTES` is prose.
