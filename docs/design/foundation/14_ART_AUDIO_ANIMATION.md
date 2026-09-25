# Art, Audio and Animation Direction

## Identity goal

Resonance must be recognizable without relying on gothic insect imagery, black silhouettes, mask motifs or ruined medieval-kingdom vocabulary.

The visual identity is **orbital industrial ecology**: engineered megastructures invaded/adapted by life, ceramic technology, conductive lattices, enormous rotating geometry and luminous force fields.


## Locked production format — 2.5D

The owner-selected visual direction is **2.5D**. Gameplay remains side-view and precision-platforming driven, while environments, lighting, large machinery, rotating ring geometry and many props are built in 3D. Characters may use stylized 3D rigs or 2D-looking rendered/shaded assets, but their collision and gameplay readability remain strictly 2D-plane oriented.

Why this format fits Resonance:

- world-scale ring rotation and gravity changes can be shown physically rather than faked through flat background swaps;
- dynamic lights, shadows, depth layers and massive machinery strengthen the orbital-world identity;
- multiplayer cameras can vary zoom and framing without redrawing bespoke 2D compositions;
- environment kits can be reused and reconfigured for transformed-world states;
- cinematic depth can be achieved without abandoning precise side-view controls.

Production rule: depth must never reduce gameplay readability. Walkable surfaces, hazards, Resonant anchors and enemy silhouettes occupy a clear gameplay plane; decorative depth cannot visually masquerade as reachable geometry.

## Character silhouette

Wayfarers should read as human/human-derived adults in agile field rigs.

Suggested design language:

- visible face or clearly human facial plane;
- asymmetrical utility suit;
- ceramic plates and braided conductive lines;
- compact gauntlet/forearm Resonance emitters;
- fabric elements that show motion/force direction;
- no horned mask silhouette;
- no needle/nail/sword-like signature weapon.

Each named playable Wayfarer should have a distinct silhouette but identical collision footprint for fairness.

## Environment art principles

Each region gets:

- one dominant geometry language;
- one material family;
- one motion motif;
- one atmospheric phenomenon;
- one landmark visible across multiple rooms.

Examples:

### Gravity Orchard

Geometry: cylinders and radial terraces.  
Material: grown wood integrated with ceramic supports.  
Motion: leaves/seed pods orbiting local gravity seams.  
Atmosphere: soft suspended soil/water particles.

### Solar Foundry

Geometry: huge parabolic reflectors and glass channels.  
Material: brass-like conductive frames, ceramic shields, molten translucent glass.  
Motion: rotating mirrors.  
Atmosphere: heat shimmer and hard directional light.

### Rust Sea

Geometry: buried brutalist machine-city forms.  
Material: powdered metal and corroded composites.  
Motion: granular waves responding to fields.  
Atmosphere: metallic dust clouds.

## Color strategy

Do not define regions solely by “blue zone / green zone.” Use material, lighting and motion.

Gameplay affordances require consistent visual treatment independent of region palettes.

Accessibility: force states cannot depend on red-vs-green alone.

## Resonance VFX

VFX should show:

- force direction;
- target relationship;
- intensity;
- unstable/overheated state.

Suggested language:

- thin field lines/particles bending along force direction;
- surface lattice illumination;
- brief distortion at high force;
- fabric/debris reacting physically;
- audio pitch rising with tension.

Avoid filling the screen with opaque glow.

## Animation philosophy

Character animation supports responsiveness.

Use:

- fast anticipation on attacks, but input response begins immediately;
- procedural/secondary motion for cables/fabric;
- strong poses at Resonance initiation;
- clear recovery silhouettes;
- movement animation blending that tolerates rapid direction changes.

Enemies need readable telegraphs before decorative flourish.

## Co-op readability

With 4 players:

- each player needs a subtle persistent identifier (accent light/pattern), configurable for accessibility;
- Link endpoints clearly show ownership;
- teammate attacks are visually quieter than enemy lethal effects;
- pings appear above effects;
- off-screen indicators show relative position.

## Cinematics

Favor in-engine scenes integrated into world scale.

Benefits:

- supports different player counts;
- reduces expensive bespoke animation;
- allows characters to retain cosmetics;
- keeps transitions fast.

Pre-rendered cinematics, if any, should be rare and reserved for opening/major finale.

## Music direction

Score should combine:

- acoustic/organic ensemble elements representing living cultures;
- processed resonant tones representing infrastructure;
- rhythmic pulses derived from machinery;
- regional melodic identities.

Avoid closely mimicking the instrumentation/melodic language of recognizable reference titles.

### Dynamic music

Layers can respond to:

- Resonance Heat;
- boss phase;
- player count;
- Link synchronization;
- world transformation.

Co-op should not simply make music louder; coordinated moments can trigger subtle harmonic convergence.

## Sound design

Resonance needs exceptionally clear audio.

Attract:

- rising tension, inward suction/tonal convergence.

Repel:

- short transient + expanding low-frequency body.

Link:

- continuous but quiet tonal thread whose pitch/tension changes with distance.

Perfect reflection:

- unmistakable high-information transient.

Overheat:

- escalating texture plus haptic feedback; never audio-only.

## Environmental audio

Use spatial sound to reinforce landmarks:

- Choir Array audible before visible;
- Foundry mirror servos create periodic world-scale movement cues;
- Rust Sea granular movement communicates buried activity;
- Flooded Observatory has muffled/shifted mix inside water spheres.

## Voice

Recommendation: selective voiced dialogue rather than every line, unless budget supports full voice consistently.

Critical characters may be voiced; incidental text can remain unvoiced. If co-op banter is included, prioritize quality and low repetition.

## Audio accessibility

Every mechanic requiring timing from sound must have visual equivalent.

Subtitles include:

- speaker name;
- important non-speech cues where relevant;
- direction indicators optionally.

## Art production constraints

To protect scope:

- modular environment kits per region;
- reusable Resonance shader/VFX system;
- skeleton/rig reuse across related enemy families where visually acceptable;
- boss assets budgeted individually;
- avoid unique animation sets for every cosmetic;
- design transformations to reuse core geometry with altered orientation/state rather than rebuild whole levels.
