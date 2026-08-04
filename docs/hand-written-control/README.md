# The hand-written control

These two files are the game as a person wrote it, in one sitting, before any of the
pipeline existed. 572 lines of server and 213 of client, as two monoliths.

They were built deliberately as a control: every number the design pipeline now produces is
on the contract because the person writing this had to invent it on the spot. `bridge/schema.mjs`
is, literally, the list of things that went wrong here.

They are kept out of the live tree because the pipeline now writes to the same two paths.
Four build trials ran with these files physically absent from the build root, so that a
generated module matching one of them meant something.

Read them to compare. Do not put them back without deciding which version ships.
