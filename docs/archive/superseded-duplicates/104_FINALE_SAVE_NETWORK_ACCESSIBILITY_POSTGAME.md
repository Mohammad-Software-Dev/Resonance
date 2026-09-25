# Finale — Save, Network, Accessibility and Postgame Specification

**Purpose:** Make the final sequence robust for online co-op, retries, irreversible choice and Version 1 postgame.

# Save boundaries

Required authoritative save points:

1. **Periapsis Entry Save** — PC01.
2. **Anchor Zero Pre-Fight Save** — PC13.
3. **Neutral Zero Save** — PC15.
4. **Pre-Commit Save** — immediately before branch irreversible commit.
5. **Completion Record** — after successful final encounter/credits trigger.

# Final choice authority

Host owns irreversible campaign state.

Guests receive:

- visible configuration projections;
- advisory vote;
- full mechanical participation;
- completion rewards/record.

The host gets a final confirmation showing:

- selected configuration;
- primary permanent losses;
- guest vote state;
- explicit “this determines this campaign ending” language.

# Vote behavior

Guest vote is advisory, not veto.

Recommended UI:

- each guest selects preference;
- host sees vote summary;
- host confirms or changes preview;
- final commit requires host hold/confirm.

No hidden host-only information about ending prerequisites.

# Retry rules

## Anchor Zero

Retry from PC13.

Skip repeated long dialogue.

## Final Configuration Encounter

Retry after configuration is committed from a branch-specific checkpoint.

The selected configuration remains committed for that retry sequence.

If the player wants another configuration:

- quit/return to Neutral Zero pre-commit save.

# Disconnect rules

## Guest disconnect

Encounter continues if remaining party can support adapted player count.

Dynamic scaling should transition only at safe encounter boundary or use pre-authored fallback.

## Host disconnect

Version 1 follows existing no-host-migration policy.

Session ends gracefully.

Host campaign save remains at last authoritative safe point.

No final commit is accepted without confirmed host save.

# Late join

Allowed only at safe anchors/phase boundaries.

Do not spawn a new guest:

- during orientation transition;
- in a branch commit animation;
- mid-final irreversible interaction.

Late join receives:

- host world-state snapshot;
- session ability licenses;
- selected configuration if already committed;
- encounter phase.

# Session licenses

Guests missing:

- Flux;
- Phase;
- Invert;

receive session licenses where the host finale requires them.

Licenses do not grant permanent progression unless normal guest reward rules say so.

# Final commit transaction

Treat final configuration as an atomic world-state transaction.

Sequence:

1. validate host authority;
2. validate prerequisites;
3. write Pre-Commit Save;
4. confirm player input;
5. set PendingConfiguration;
6. enter final encounter;
7. on successful completion set CompletedConfiguration record;
8. preserve Pre-Commit Save for Continue.

Avoid partially applying world-state epilogue flags before encounter completion.

# Crash/recovery

If crash occurs:

## Before commit

Reload PC15/16.

## After commit but before completion

Reload branch-specific final encounter checkpoint with selected configuration.

## After completion record

Credits/epilogue may be replayed from archive.

# Accessibility

All existing granular assists remain active.

Finale-specific options may include:

- slower orientation transition;
- longer subsystem overlap window;
- stronger state/anchor outlines;
- reduced VFX density;
- reduced camera shake;
- current-direction aid;
- target assist;
- Echo timing assistance;
- incoming damage adjustment.

No ending/configuration is disabled by accessibility use.

# Photosensitivity

Periapsis has high risk from:

- rotating geometry;
- Phase overlays;
- signal pulses;
- final commit effects.

Provide:

- reduced flash;
- reduced pulse frequency;
- reduced full-screen distortion;
- static alternative for certain background effects.

# Audio accessibility

All critical cues have visual equivalents.

Subtitles/captions include:

- Custodian communications;
- meaningful Tessel pattern interpretation when characters translate it;
- major system warnings.

# Postgame policy — Version 1

After credits:

**Continue** loads the preserved Neutral Zero / pre-commit state.

The player can:

- finish optional quests;
- fight optional bosses;
- improve builds;
- unlock missing finale prerequisites;
- choose another final configuration.

Completion records remain in a separate profile/meta structure.

# Configuration Archive

PC27 records:

- completed configurations;
- date/time of completion;
- optional mastery badges;
- epilogue recap.

It does not merge contradictory ending world states into the active campaign.

# New Game+

Recommendation:

**Not required for Version 1.**

Reasons:

- co-op progression/state complexity;
- transformed world-state dependencies;
- session-license complexity;
- significant balancing burden.

Design hooks may be preserved for a later update.

# Post-ending explorable world

Recommendation:

Do not build four fully explorable post-ending Meridian variants for Version 1.

Use:

- epilogue scenes;
- Configuration Archive;
- pre-commit Continue state.

This protects production scope while still supporting completionists.

# Completion rewards

Safe rewards:

- cosmetic;
- title/badge;
- Configuration Archive record;
- optional challenge modifier;
- art/lore unlock.

Avoid ending-exclusive raw power that pressures players to choose a philosophy for stats.

# Network tests

1. 1–4 players Anchor Zero.
2. guest disconnect during subsystem phase.
3. host disconnect before/after commit.
4. late join at safe branch point.
5. session licenses in finale.
6. guest vote replication.
7. final commit atomicity.
8. crash recovery after commit.
9. completion record persistence.
10. replay another configuration from pre-commit save.

# Acceptance criteria

- no irreversible state lost on crash;
- host authority remains explicit;
- guests remain participants;
- accessibility never changes ending access;
- postgame does not require four transformed world implementations;
- completion records and active campaign state remain separate.
