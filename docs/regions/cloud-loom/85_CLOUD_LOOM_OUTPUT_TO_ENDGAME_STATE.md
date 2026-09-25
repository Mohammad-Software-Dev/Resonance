# Cloud Loom Output and Late-Game World-State Specification

**Purpose:** Define how Cloud Loom's decision feeds Broken Transit Crown and Periapsis without multiplying the game into separate campaigns.

# Outcome tags

Recommended:

- World.Anchor.Loom.Maximum
- World.Anchor.Loom.Stable
- World.Anchor.Loom.Distributed

# Maximum Harvest

## Global resources

- highest atmospheric throughput;
- strongest conventional power/resource reserve;
- more old systems can operate.

## Broken Transit Crown

- more active transit machinery;
- stronger current lanes;
- more Custodian-accessible systems;
- more powered hazards;
- some shortcuts active.

## Periapsis

- larger conventional correction budget;
- higher stress/thermal/current load;
- Restoration-oriented solutions become easier technically, not morally “correct.”

# Stable Envelope

## Global resources

- lower throughput;
- higher local structural safety;
- calmer exterior systems.

## Broken Transit Crown

- fewer active hazards;
- more dead machinery requiring Flux/Invert alternatives;
- worker support routes stronger.

## Periapsis

- lower raw reserve;
- lower current structural stress;
- some brute-force correction options unavailable.

# Distributed Lift

## Global resources

- medium aggregate throughput;
- spread across several support nodes;
- flexible cross-region support.

## Broken Transit Crown

- more distributed route options;
- multiple medium current lanes;
- selected prior-region assistance arrives.

## Periapsis

- broader configuration flexibility;
- no maximum single-system reserve;
- hybrid approaches may gain infrastructure support if other prerequisites exist.

# Interaction with prior decisions

The game should derive a small set of **late-state features**, not hand-author every combination.

Examples:

## Power Reserve

Inputs:

- Foundry outcome;
- Loom outcome.

Outputs:

- Low / Medium / High.

## Water / Thermal Stability

Inputs:

- Observatory;
- Orchard;
- Foundry.

## Field Communication

Inputs:

- Choir.

Outputs:

- Locked / Open / Partitioned.

## Material / Structural Access

Inputs:

- Rust Sea.

## Ecology / Habitat Adaptation

Inputs:

- Orchard / Observatory / Rust.

These aggregated states drive Periapsis variants.

# Broken Transit Crown

Crown rooms should reference outcome tags to choose:

- current profile;
- powered machinery;
- Phase visibility;
- Flux availability;
- NPC/support presence;
- enemy variant.

Avoid bespoke room copies for every combination.

# Periapsis

Use componentized state groups.

Example room may contain:

- PowerVariant;
- WaterVariant;
- ChoirVariant;
- RustVariant;
- LoomVariant.

Only combinations that are visually/mechanically meaningful receive custom override.

# Ending-path support

Cloud Loom outcome should influence feasibility/cost, not automatically choose ending.

Maximum Harvest may support Restoration tools.

Open Chorus elsewhere may support Communion.

Distributed Lift may support hybrid infrastructure.

But the player still makes final choices based on accumulated state/quests.

# Save schema

Persist one Loom outcome tag plus necessary quest/support flags.

Derived aggregate late-state values can be recalculated on load from authoritative world choices.

# Acceptance criteria

- Loom outcome materially changes Crown/Periapsis;
- prior outcomes combine through derived state, not combinatorial explosion;
- no Loom choice hard-locks one ending by itself;
- late-game spaces visibly reflect accumulated history;
- save data remains compact and deterministic.
