/**
 * Wire schemas for the concept desks.
 *
 * Enumerated fields are typed as plain strings rather than JSON `enum`s, even
 * though enums would constrain the model harder. The reason is the escape hatch:
 * "custom:tide-based combat" is a legal value that no enum can express, and
 * splitting every enumerated field into kind + customLabel pairs would double the
 * size of a document that already has forty of them.
 *
 * That is an acceptable trade because the wire format was never the guarantee.
 * `validate.mjs` is, and it runs on every path in and out of here — the same
 * reasoning that lets ui-forge ship variant values as loose key/value pairs.
 *
 * The allowed values are injected into each field's description straight from
 * vocab.mjs, so widening a vocabulary widens the prompt in the same edit.
 */

import * as V from './vocab.mjs';

const list = (vocab) => V.keysOf(vocab).join(' | ');

/** An enumerated field: allowed values in the description, escape hatch spelled out. */
const pick = (vocab, note = '') =>
  ({ type: 'string', description: `${note ? `${note} ` : ''}One of: ${list(vocab)}. If genuinely none fit, use "custom:<short label>" — this gets flagged for review.` });

const pickMany = (vocab, note = '') =>
  ({ type: 'array', description: `${note ? `${note} ` : ''}Values from: ${list(vocab)}. "custom:<short label>" allowed but flagged.`, items: { type: 'string' } });

const text = (description) => ({ type: 'string', description });
const maybe = (description) => ({ type: ['string', 'null'], description: `${description} Use null if genuinely not applicable.` });
const strings = (description) => ({ type: 'array', description, items: { type: 'string' } });
const obj = (properties, description) => ({
  type: 'object',
  description,
  additionalProperties: false,
  required: Object.keys(properties),
  properties,
});

// ---------------------------------------------------------------------------
// Desk 1 — intake. What does the raw input already establish?
// ---------------------------------------------------------------------------

/**
 * Intake does not design anything. It reads the input and reports, per dimension,
 * what is already settled versus guessed versus absent.
 *
 * Keeping the read separate from the design is what makes the provenance
 * trustworthy later: a single pass that both extracts and invents cannot
 * afterwards tell you which it did.
 */
export const INTAKE_SCHEMA = obj({
  title: text('The game\'s working title. Invent a plausible one only if the input truly has none.'),
  titleStated: { type: 'boolean', description: 'True only if the input actually named the game.' },
  slug: text('kebab-case identifier derived from the title.'),
  logline: text('One sentence: who does what, and why it is compelling. Under 140 characters.'),
  restated: text('A faithful 3-5 sentence restatement of the input, adding nothing. Used to confirm nothing was misread.'),
  references: {
    type: 'array',
    description: 'Every existing game named in the input, plus any obvious unnamed antecedent the description clearly points at. Empty array if none.',
    items: obj({
      name: text('The game\'s name as players would search for it.'),
      url: maybe('A wiki or info URL if the input supplied one.'),
      relationship: pick(V.REFERENCE_RELATIONSHIPS),
      why: text('One line on why this game is relevant here.'),
      stated: { type: 'boolean', description: 'True if the input named it; false if you inferred it.' },
    }),
  },
  coverage: {
    type: 'array',
    description: 'EXACTLY one entry per dimension listed in the prompt, in that order. Do not skip any.',
    items: obj({
      dimension: text('The dimension id from the prompt.'),
      status: { type: 'string', description: 'stated | partial | absent' },
      evidence: maybe('The words in the input that establish it. Null when absent.'),
      provisional: maybe('Your best inference for this dimension, as a short prose answer, so it can be offered as a default. Null if you cannot responsibly guess.'),
      confidence: { type: 'string', description: 'high | medium | low — how sure you are of the provisional answer.' },
    }),
  },
  ambiguities: strings('Specific things the input says that could mean two different games. Empty array if none.'),
  contradictions: strings('Places the input contradicts itself. Empty array if none.'),
}, 'A reading of the raw input, with nothing designed yet.');

// ---------------------------------------------------------------------------
// Desk 2 — research synthesis, one call per reference game.
// ---------------------------------------------------------------------------

export const RESEARCH_SCHEMA = obj({
  name: text('The game as named in the sources.'),
  confident: { type: 'boolean', description: 'False if the sources were too thin to say much — say so rather than filling in from memory.' },
  summary: text('What this game is, in 2-3 sentences.'),
  genre: pick(V.GENRES, 'The genre this reference game is.'),
  playerMode: pick(V.PLAYER_MODES),
  coreLoop: strings('The reference game\'s loop as an ordered list of short verb phrases.'),
  progression: pickMany(V.PROGRESSION),
  monetization: pickMany(V.MONETIZATION),
  standoutMechanics: strings('Mechanics that specifically account for why it works. 2-5 entries.'),
  whyItWorks: strings('The design reasons it retains players. 2-4 entries.'),
  weaknesses: strings('Common complaints or structural problems. 1-4 entries.'),
  conventions: strings('Things players of this game will EXPECT any similar game to have. Breaking these costs goodwill.'),
  uncertain: strings('Claims you are unsure about because the sources did not cover them. Be honest — this list existing is the point.'),
}, 'Structured findings about one existing game, drawn ONLY from the supplied source text.');

// ---------------------------------------------------------------------------
// Desk 3 — questions, generated only for gaps.
// ---------------------------------------------------------------------------

export const QUESTIONS_SCHEMA = obj({
  reasoning: text('Two sentences on what you judged still genuinely unknown, and what you chose not to ask because research or the input already settled it.'),
  questions: {
    type: 'array',
    description: 'One question per genuine gap. Order by how much the answer changes the rest of the design — the most load-bearing first.',
    items: obj({
      id: text('kebab-case identifier, e.g. "loop-lap-length".'),
      dimension: text('Which dimension id this closes.'),
      question: text('The question, addressed to the developer. Concrete and answerable in a sentence.'),
      why: text('One line on what this answer changes downstream. This is what makes a long questionnaire worth filling in.'),
      kind: { type: 'string', description: 'single | multi | text | number' },
      options: {
        type: 'array',
        description: 'For single/multi: the choices, using vocabulary values where one applies. Empty array for text/number.',
        items: obj({
          value: text('The value to record — a vocabulary key where one fits.'),
          label: text('Short human-readable label.'),
          implication: text('One line on what picking this commits the game to.'),
        }),
      },
      suggested: maybe('The answer you would default to, and why in a few words. Null if you have no basis for a guess.'),
      blocking: { type: 'boolean', description: 'True when the concept cannot be compiled without an answer.' },
    }),
  },
}, 'An adaptive questionnaire covering exactly the unresolved dimensions.');

// ---------------------------------------------------------------------------
// Desk 4 — the concept document itself.
// ---------------------------------------------------------------------------

const PROVENANCE_ITEM = obj({
  dimension: text('The dimension id.'),
  source: { type: 'string', description: 'stated | researched | answered | inferred — where this dimension\'s content came from. Use the WEAKEST source that contributed.' },
  confidence: { type: 'string', description: 'high | medium | low' },
  note: maybe('Only when source is "inferred" and confidence is not high: what you assumed, so it can be checked.'),
});

export const CONCEPT_SCHEMA = obj({
  title: text('Final title.'),
  slug: text('kebab-case identifier.'),
  logline: text('One sentence, under 140 characters, that would make a Roblox player click.'),
  premise: text('2-4 sentences a new team member could read to understand the game.'),

  purpose: obj({
    kind: pick(V.PURPOSE_KINDS),
    statement: text('Why this game is being made, in the developer\'s terms.'),
    successMetric: text('The concrete outcome that would mean it worked, e.g. "500 CCU sustained for a month".'),
    differentiator: text('The one thing that makes it worth choosing over the games it resembles.'),
    nonGoals: strings('Things deliberately NOT being built. 1-4 entries — this is how scope stays honest.'),
  }),

  players: obj({
    mode: pick(V.PLAYER_MODES, 'The headline answer.'),
    structure: pick(V.PLAYER_STRUCTURES, 'How the server is actually shaped.'),
    serverSize: { type: 'integer', description: 'Max players per server. 1 for a true solo instance.' },
    interaction: text('What players can actually do to or with each other, one line. Say "nothing" if truly isolated.'),
  }),

  genre: obj({
    primary: pick(V.GENRES),
    secondary: maybe('A second genre if this is a genuine hybrid, as a genre key. Null otherwise.'),
    progression: pickMany(V.PROGRESSION, 'The progression shapes in use — usually 1-3.'),
    monetization: pickMany(V.MONETIZATION, 'Planned monetization. Use ["none"] if there is none.'),
  }),

  coreLoop: obj({
    summary: text('The loop in one sentence, as verbs.'),
    steps: {
      type: 'array',
      description: 'The ordered loop, 3-6 steps. Each is something the PLAYER DOES, never a screen they open.',
      items: obj({
        verb: pick(V.LOOP_VERBS),
        label: text('What this step is called in this game\'s terms, e.g. "hatch an egg". Under 30 characters.'),
        produces: text('What the player has after this step that they did not before.'),
        seconds: { type: 'integer', description: 'Roughly how long this step takes, in seconds.' },
      }),
    },
    lapSeconds: { type: 'integer', description: 'Total seconds for one full lap of the loop.' },
    closes: text('How the last step feeds back into the first. This is what makes it a loop rather than a funnel.'),
    hook: text('Why the player starts another lap instead of leaving.'),
    escalation: text('What changes between lap 1 and lap 100, so the loop does not go flat.'),
  }),

  mechanics: {
    type: 'array',
    description: '3-8 mechanics. Systems, not features — how something WORKS, not what screen it lives on.',
    items: obj({
      id: text('kebab-case identifier.'),
      kind: pick(V.MECHANIC_KINDS),
      label: text('Short name, under 30 characters.'),
      role: pick(V.MECHANIC_ROLES),
      description: text('How it works, concretely enough to be built. 1-3 sentences.'),
      dependsOn: strings('ids of mechanics this one requires. Empty array if standalone.'),
    }),
  },

  features: {
    type: 'array',
    description: '4-12 player-facing systems. Cover more than one dimension — a list that is all core-loop has no onboarding, retention or monetization thinking in it.',
    items: obj({
      id: text('kebab-case identifier.'),
      label: text('Short name.'),
      dimension: pick(V.FEATURE_DIMENSIONS),
      description: text('What the player can do, one or two sentences.'),
      priority: { type: 'integer', description: '1 = must ship first, 2 = launch, 3 = post-launch.' },
      screens: strings('kebab-case ids of the UI screens this needs, e.g. ["shop","inventory"]. Empty array if it needs no dedicated screen.'),
    }),
  },

  objectives: {
    type: 'array',
    description: '3-7 objectives. Must include at least one session-scope and at least one long-term or mastery-scope.',
    items: obj({
      scope: pick(V.OBJECTIVE_SCOPES),
      label: text('Short name.'),
      description: text('What the player is trying to do and why they care.'),
      measurable: text('How the game knows it happened, e.g. "owns all 12 elemental pets".'),
    }),
  },

  references: {
    type: 'array',
    description: 'Every game this is measured against. Carry through everything researched, including anti-patterns.',
    items: obj({
      name: text('Game name.'),
      slug: text('kebab-case identifier.'),
      url: maybe('Source URL if one was used.'),
      relationship: pick(V.REFERENCE_RELATIONSHIPS),
      takeaways: strings('What is specifically taken or learned from it. 1-4 entries.'),
      deltas: strings('How this game deliberately differs. REQUIRED and specific when relationship is "reskin-base" — otherwise the output is just that game again.'),
    }),
  },

  audience: obj({
    ageBand: pick(V.AGE_BANDS),
    experience: pick(V.AUDIENCE_EXPERIENCE),
    platformMix: obj({
      mobile: { type: 'number', description: '0-1 share.' },
      desktop: { type: 'number', description: '0-1 share.' },
      console: { type: 'number', description: '0-1 share.' },
    }, 'Must sum to 1. Roblox skews heavily mobile; assume so unless told otherwise.'),
    sessionMinutes: { type: 'integer', description: 'Expected length of one session.' },
    motivations: pickMany(V.MOTIVATIONS, '2-4 motivations, most important first.'),
    readingLoad: text('One line on how much text this audience will actually read. Drives UI density downstream.'),
  }),

  artDirection: obj({
    vibe: pick(V.VIBES, 'The visual archetype the design system will use.'),
    mood: strings('2-4 mood adjectives.'),
    paletteHints: strings('2-4 colour ideas in words, e.g. "cosmic purple", "gold reward".'),
    referenceNote: text('One line on the shape language — panel weight, outlines, how much reward juice.'),
  }),

  economy: obj({
    softCurrency: maybe('The grindable currency\'s in-game name.'),
    hardCurrency: maybe('The premium or rare currency\'s in-game name.'),
    premium: maybe('The real-money layer, usually "Robux".'),
    faucets: strings('Where currency enters. 1-4 entries.'),
    sinks: strings('Where currency leaves. 1-4 entries — an economy with no sink inflates until numbers stop meaning anything.'),
  }),

  risks: {
    type: 'array',
    description: '2-5 things most likely to make this fail, with what would be done about each.',
    items: obj({
      risk: text('What could go wrong.'),
      severity: { type: 'string', description: 'high | medium | low' },
      mitigation: text('What would be done about it.'),
    }),
  },

  provenance: {
    type: 'array',
    description: 'EXACTLY one entry per dimension id given in the prompt. This is how the developer sees what they told you versus what you decided for them.',
    items: PROVENANCE_ITEM,
  },

  openQuestions: strings('Things still genuinely undecided that a later stage will have to settle. Honest emptiness is fine, but do not hide a real gap here.'),
}, 'A complete, buildable game concept.');
