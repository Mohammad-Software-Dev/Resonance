# Periapsis — World-State Integration and Environmental Systems

**Purpose:** Define how prior regional outcomes alter the final region without creating combinatorial explosion.

# Inputs

Periapsis consumes the Crown snapshot:

- Power Reserve;
- Water/Thermal Stability;
- Structural Access;
- Field Communication;
- Atmospheric Support;
- Habitat/Adaptation Support;
- Astral Shepherd Alignment Reserve;
- faction/support quest flags.

# Periapsis subsystem petals

Each aggregate state primarily maps to one petal.

## Power Petal

Affects:

- active machinery;
- rail speed;
- overload hazards;
- conventional repair options.

## Thermal Petal

Affects:

- heat;
- coolant;
- pressure;
- water routing;
- recovery windows.

## Structural Petal

Affects:

- exposed braces;
- heavy-object routes;
- buried/dead supports;
- moving mass.

## Signal Petal

Affects:

- Relay clarity;
- Phase topology;
- Tessel manifestations;
- Signal Token availability.

## Atmospheric Petal

Affects:

- current direction/strength;
- recovery lanes;
- moving kite support;
- exterior hazard.

## Adaptation Petal

Affects:

- ecological damping;
- regional support;
- non-historical stabilization options.

This petal is not a morality meter.

# Orbital orientation system

Periapsis has authored orientation states.

Each OrientationState defines:

- room gravity direction;
- active floor/wall surfaces;
- anchor set;
- moving ring transform;
- recovery zones.

Transitions are:

- telegraphed;
- server-authoritative;
- deterministic.

No general local-gravity simulation is needed.

# Anchor-state recombination

Regional Anchor outcomes do not directly drive dozens of bespoke mechanics.

Instead each contributes tags/data to the aggregate petal.

Example:

Foundry Historical + Loom Maximum may yield High Power.

Foundry Civic + Loom Stable may yield Medium/Low Power but stronger support routing.

# Weak-state philosophy

A weak aggregate state makes one subsystem harder or changes the solution.

It must not make the finale unwinnable.

Examples:

- Low Power → more manual Flux/Inversion.
- Fragile Thermal → more pressure management.
- Buried Structural → fewer heavy conventional routes.
- Carrier Lock → fewer Tessel shortcuts.
- Stable Envelope → lower current assistance.

# Strong-state philosophy

A strong aggregate does not make the finale strictly easier in every way.

Example:

High Power:

- more shortcuts;
- but more overload hazards.

Open Field Communication:

- more Phase routes/support;
- but more interference pressure.

This prevents one world-state score from becoming “best.”

# Faction/support injection

Support actors can provide:

- one temporary recovery node;
- one alternate route;
- one stabilization assist;
- contextual dialogue.

Support never directly wins a boss phase.

# Alignment Reserve

Astral Shepherd completion or substitute calibration grants one Alignment Reserve.

Possible Anchor Zero effects:

- skip one repeated orientation cycle;
- create emergency anchor;
- widen stabilization window.

Final configuration effects:

- extra safety margin;
- not a new ending by itself.

# Tessel integration

Tessel expression varies by Field Communication.

Carrier Lock:

- minimal/bounded.

Open:

- active manifestations and communication.

Partitioned:

- bounded channels and selected bridges.

Final Open Resonance/Accord branches may alter this temporarily after PC16.

# Custodian integration

Custodian support after Crown may vary in tone and amount but Version 1 preserves technical interface access so standard finale cannot soft-lock.

# Validation rules

Every legal snapshot must pass:

- PC01–15 reachable;
- Anchor Zero module selection valid;
- Historical Continuity reachable;
- Distributed Meridian reachable;
- at least one final configuration available;
- all required ability licenses valid.

# Acceptance criteria

- prior choices visibly matter;
- no state creates “wrong campaign” failure;
- state variants remain modular;
- strong/weak states contain tradeoffs;
- Anchor Zero can select deterministic conflict modules;
- finale remains testable with bounded QA matrix.
