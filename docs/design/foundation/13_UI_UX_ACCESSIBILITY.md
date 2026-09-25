# UI, UX and Accessibility

## UX philosophy

The game can be mysterious without hiding basic information. UI should preserve visual immersion while making fast co-op and force interactions understandable.


## Locked difficulty philosophy

The default game is **challenging and mastery-oriented**, not broadly flattened for accessibility. Accessibility is delivered through granular, preferably per-player assists so players can tune barriers without erasing the intended baseline for everyone else. A co-op party may therefore contain players using different incoming-damage, timing, targeting or traversal assists in the same session where technically feasible.

Assists should preserve mechanics rather than auto-completing the game. The goal is to let more players engage with the same movement, combat, puzzle and story content.

## HUD

Minimum combat HUD:

- Health / Fracture Health.
- Resonance Heat.
- Equipped Core technique state.
- Repair charges if present.
- Teammate status when multiplayer.
- Boss health/stability when relevant.

Avoid a dense RPG bar cluster.

## Fracture visualization

Health bar distinguishes:

- stable current health;
- temporarily recoverable fractured segment;
- incoming delayed loss if any.

Use shape/animation plus color so color-blind players can read the state.

## Resonance targeting UI

When targeting:

- valid target gets subtle contour/field arc;
- directional line indicates force relationship;
- fixed vs movable communicated by icon/shape;
- heavy/over-limit target feedback appears immediately;
- rescue target has unique high-priority signal.

Do not draw full-screen neon lines during ordinary movement.

## Map

Map features:

- explored room outlines;
- major landmarks;
- Relays;
- settlements;
- teammate positions;
- custom markers;
- inspected blockers with reason;
- filter for “now potentially accessible” routes after obtaining new ability;
- region transformation history/indicator;
- late-game optional completion data.

The map does not display every collectible by default.

## Ping system

Players can ping:

- location;
- enemy;
- anchor/object;
- route;
- “come here”;
- “wait”;
- “help”;
- “pull”;
- “launch me”;
- “secret?”

Pings fade quickly and have spam limits.

## Tutorials

Layered approach:

1. contextual one-line prompt;
2. safe use;
3. required simple use;
4. optional advanced application nearby;
5. menu glossary contains permanent explanation/short animation.

Do not interrupt with repeated modal tutorial boxes.

## Accessibility principles

Accessibility should be designed from the beginning because co-op skill gaps are a core use case.

### Controls

- Full remapping.
- Hold/toggle options for sustained Resonance inputs.
- adjustable stick dead zones where platform allows.
- vibration intensity.
- alternative rapid-input settings; no mandatory button mashing.

### Visual

- UI scale.
- subtitle size/background.
- high-contrast interactable option.
- multiple color-vision presets.
- non-color force indicators.
- reduced flashes.
- reduced screen shake.
- reduced particles.
- motion-reduced camera option.

### Audio

- separate music/effects/dialogue sliders.
- visual cues for critical audio-only mechanics.
- directional threat indicators optional.
- subtitles for voiced content and significant off-screen cues where appropriate.

### Difficulty assists

Prefer granular options over one “easy mode.”

Potential options:

- incoming damage multiplier.
- wider parry/reflect timing.
- longer Fracture recovery window.
- stronger rescue targeting.
- extra boss repair charge.
- reduced platforming hazard damage.
- slower game speed in solo (e.g., 90/80%) if engine permits.
- extra Echo recording duration.
- navigation hints.

Assists should not disable story completion or achievements broadly; challenge-specific leaderboards can require standard rules.

## Co-op skill-gap tools

A lower-skill player can enable:

- stronger tether follow;
- forgiving launch catch;
- individual damage reduction;
- automatic recovery after repeated traversal failures;
- simplified fine targeting.

These should be per-player so experienced friends retain normal challenge.

## Failure communication

After death, players should understand:

- damage source;
- hazard type;
- whether a rescue was possible;
- current checkpoint distance;

Avoid lengthy death screens.

## Quest/objective UX

No permanent giant quest arrow.

Provide:

- concise journal of active leads;
- region hints rather than exact GPS route by default;
- optional stronger guidance.

Narrative choices should preview which world/system is being affected without revealing every consequence.

## Inventory/loadout UX

Cores and Modules presented as rig configuration, visually distinct from charm/notch metaphors.

Requirements:

- compare module effects clearly;
- one-button equip/swap;
- show capacity cost;
- save presets mid/late game;
- usable at Relays, not during active combat.

## Multiplayer menus

Must make these states obvious:

- who is host;
- whose world state is active;
- whether guest will earn credit;
- privacy setting;
- latency/connection quality;
- pending Gather request;
- who is making an irreversible choice.

## Loading/transition UX

Because world transformations are important, hide loading where possible behind:

- Relay travel;
- ring rotation spectacle;
- transit machinery;
- controlled camera transitions.

Never compromise correctness to eliminate every loading screen; save integrity matters more.
