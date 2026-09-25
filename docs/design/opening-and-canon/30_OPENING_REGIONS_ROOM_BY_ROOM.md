# Opening Regions — Room-by-Room Production Specification

**Coverage:** Wayfarer Scar → Early Transit Spine → Gravity Orchard → The Pendulum    
**Target first-play duration:** 2.5–3.5 hours critical route; 3.5–5 hours exploratory    
**Purpose:** Greybox-ready content specification

## Room ID convention

- **WS** — Wayfarer Scar / opening failure sequence.  
- **TS** — early Transit Spine.  
- **GO** — Gravity Orchard.  
- **CC** — Convergence Chamber.

A “room” means a gameplay space with one dominant purpose, not necessarily a literal enclosed room.

## Global opening rules

- Every critical traversal is solvable solo.  
- Human co-op can solve multi-actor interactions without Echo.  
- Extra players receive parallel responsibility rather than extra switches.  
- The first three hours introduce one new system at a time, then combine them.  
- Main-path rooms should rarely exceed 90 seconds without a meaningful state change, encounter, discovery, or vista.  
- Main boss retry path is under 20 seconds from a Relay/loadout point.  
- All mechanics are tuned as data, not hard-coded per room.

# Wayfarer Scar

## WS01 — Transit Hull / Cold Open

**Purpose:** Put the player in control before exposition.

**Entry:** New game / session start.    
**Exit:** WS02.

### Gameplay

- Run, jump, crouch/drop if available.  
- One collapsing walkway.  
- One non-lethal fall correction demonstrates forgiving ledge logic.  
- One damaged Scrapper blocks a door and can be defeated with basic attacks.

### Multiplayer

Players start in adjacent lanes that visually cross each other but do not require synchronization. This immediately establishes that every player has independent camera control and their own local framing.

### Narrative

Only radio fragments:

- Anchor Seven failed.  
- Transit Spine alignment is collapsing.  
- Emergency field nodes are still active.

### Art proof

Exterior gas giant visible through torn hull. First demonstration of 2.5D depth without placing gameplay-important surfaces in ambiguous background layers.

---

## WS02 — Cargo Spine

**Purpose:** Teach fixed-anchor Attract.

### Layout

Three increasingly difficult gaps:

1. anchor directly above destination;  
2. anchor offset vertically;  
3. anchor behind the player's initial movement direction.

### Rules

- First gap cannot kill.  
- Second can drop player to a recovery ledge.  
- Third introduces directional target selection.

### Optional

Small side shelf reachable by releasing Attract early contains first Salvage bundle and a field log showing that Mass Anchor repairs have previously displaced habitats.

### Multiplayer

No required cooperation. Players can observe each other and naturally race.

---

## WS03 — Broken Lift Shaft

**Purpose:** Teach Repel and mass relationship.

### Sequence

- Repel from fixed wall node to cross shaft.  
- Repel a light cargo canister.  
- Use the canister to trigger a mechanical latch.  
- Survey Spark fires a slow Resonant bolt.  
- Player is prompted once to Repel it back.

### Readability rule

The same VFX language must clearly show:

- player moving because world object is anchored;  
- object moving because object is light;  
- projectile reversing because projectile is light/high-energy.

---

## WS04 — Maintenance Crossing

**Purpose:** First real mixed encounter.

### Enemies

- 2 Scrappers solo.  
- 2 Scrappers + 1 Survey Spark at 2P.  
- 3 Scrappers + 1 Survey Spark at 3P.  
- 3 Scrappers + 2 Survey Sparks at 4P.

One Scrapper has a visibly loosenable forearm plate.

### Learning objective

- attack to crack component;  
- Attract plate off;  
- Repel plate into second enemy.

### Failure

Nearest recovery point is directly outside encounter. No currency loss.

---

## WS05 — Decompression Gallery

**Purpose:** Short spectacle and movement test.

A wall breach creates directional airflow. Airflow does not replace Resonance; it modifies trajectories.

Player must:

- jump;  
- Attract to one anchor;  
- release;  
- Repel from second anchor to clear debris.

### Co-op opportunity

A linked player can become a moving intermediate anchor, creating a faster optional route.

### Secret

Advanced launch reaches an intact observation blister with a view of Gravity Orchard.

---

## WS06 — Relay Rupture

**Purpose:** Introduce session-safe Relay fiction and Link/Echo.

### Solo

Relay reconstructs a short temporal field trace and unlocks **Echo**.

First exercise:

1. record walking to a pressure pad;  
2. replay;  
3. current player passes through gate.

Recording cap for tutorial: 4 seconds.

### Multiplayer

Relay synchronizes active Wayfarer rigs and unlocks **Link**.

Safe exercises:

- attach Link;  
- separate;  
- pull;  
- use teammate as anchor;  
- cancel Link.

### Network requirement

This room is the earliest deterministic four-client validation space. Four players must be able to Link in pairs simultaneously without target ambiguity.

---

## WS07 — Split Bridge

**Purpose:** First dual-actor mechanic.

A rotating bridge section has two field arms.

### Solo

Record Echo maintaining force on Arm A; current player manipulates Arm B.

### 2P

Each player controls one arm.

### 3P

Two players control arms; third stabilizes a debris shield that prevents repeated projectile interruption.

### 4P

Pairs control one arm each while periodic debris streams require one player per pair to alternate defense/force.

Extra players reduce execution pressure through teamwork, not by standing idle.

### Result

Bridge rotates permanently and creates the first visible “the world can change” event.

---

## WS08 — Scar Approach

**Purpose:** Pacing downshift and first NPC rescue.

A trapped maintenance worker is pinned behind a light Resonant panel.

Player may:

- Attract panel;  
- Repel it aside;  
- ignore and continue.

Rescue creates an NPC at Wayfarer Scar and later unlocks an early module discount, but no main-path power is missable.

---

## WS09 — Wayfarer Scar Settlement

**Purpose:** First safe social hub.

### Services

- Relay/save.  
- Map.  
- Core configuration.  
- Module equip.  
- basic shop/salvage service.  
- party management.

### NPCs

- Keph, traveling salvager.  
- Taren Holt, local Anchor technician.  
- rescued maintenance worker if saved.  
- one family member searching for people in Orchard.

### Required dialogue

Maximum 60–90 seconds if player follows only critical lines.

### First module choice

Player chooses one of two free starter modules:

- **Return Current:** perfect projectile Repel cools a small amount of Heat.  
- **Soft Landing:** high-speed landing preserves more control and reduces recovery.

The unchosen module becomes purchasable shortly after; no irreversible build trap.

---

## WS10 — Outer Rail Fork

**Purpose:** Teach route choice.

Two routes:

### WS10A — Exterior Rail

Movement-focused, fewer enemies, one advanced launch secret.

### WS10B — Service Interior

Combat-focused, introduces Clamp enemy.

Both routes reconnect at WS11.

The map shows both paths after discovering the junction but does not reveal their rewards.

---

## WS11 — Alignment Yard

**Purpose:** Combine anchor denial with environment.

### Enemy

First **Clamp** attaches to a key traversal anchor.

Player can:

- kill Clamp conventionally;  
- crack attachment and pull it off;  
- bait Survey Spark projectile into Clamp.

This is the first encounter where Resonance is materially easier than pure attacks.

---

## WS12 — Alignment Hound Arena

**Purpose:** Opening mini-boss.

Detailed encounter remains governed by existing first-hour spec.

### Arena

Long rail lane with two elevated anchor points and a central maintenance trench.

### Phase A

- Hound charge.  
- armor plate crack/remove/throw.  
- charge telegraph teaches horizontal danger.

### Phase B

- Hound clamps two structures.  
- opposing force interaction.  
- player-count scaling changes simultaneous objectives.

### Reward

Access key to local stabilizer; first Anchor Shard.

---

## WS13 — Local Stabilizer

**Purpose:** First moral consequence.

Player activates stabilizer. A Transit ring segment rotates into alignment.

Immediate benefit:

- Wayfarer Scar power stabilizes.  
- Relay connection to Transit Spine becomes available.

Visible consequence:

- distant agricultural habitat loses its previous gravity condition;  
- water and plant structures fall/reorient.

This is not a player choice yet. It is a lesson that “repair” has consequences.

---

## WS14 — Transit Gate

**Purpose:** Establish next destination and first return hook.

Map opens Transit Spine route.

Locked side door displays a readable **Flux-inert lattice** marker that the player cannot yet manipulate. Map remembers the blocker for future return.

# Early Transit Spine

## TS01 — Scar Junction

**Purpose:** Reframe tutorial area into connected world.

Wayfarer Scar now visibly connects to a much larger network.

Branches visible:

- Gravity Orchard route active;  
- Solar Foundry route damaged but partially accessible later;  
- two dark routes marked as unavailable infrastructure.

---

## TS02 — Freight Relay

**Purpose:** Teach Relay fast travel.

Player activates second Relay and gains Relay-to-Relay travel.

Fast travel is optional; no forced tutorial teleport.

---

## TS03 — Moving Freight Frames

**Purpose:** Moving anchors.

Large cargo frames travel on rails through foreground/background depth.

Player can Attract to selected active frame nodes.

### Multiplayer

Players can travel independently; one player's camera never pulls another.

### Network

Frame movement is host authoritative. Client prediction must hide small corrections.

---

## TS04 — Clamp + Survey Encounter

**Purpose:** First role-combination combat.

Clamp disables useful anchor while Survey Spark pressures from range.

The room should make “remove the Clamp first” discoverable, not mandatory.

Four-player version uses two anchor lanes, not simply more enemy HP.

---

## TS05 — Transit Lookout

**Purpose:** Landmark orientation.

Large vista shows:

- Gravity Orchard rotating off-axis;  
- Solar Foundry mirrors;  
- distant Cloud Loom silhouette.

Map receives named landmark pins only after player visually inspects them.

---

## TS06 — Salvage Spur

**Purpose:** Optional early side room.

Contains Keph side interaction and first purchasable module.

Reward: **Loose Circuit** module — removing enemy armor briefly improves object-launch efficiency.

---

## TS07 — Failed Rail Loop

**Purpose:** Teach a visible future gate.

A route nearly works but requires **Latch** for safe sustained pull.

Player can attempt a difficult sequence break using perfect Attract/Repel timing. Success grants a small optional reward, not main progression.

---

## TS08 — Orchard Transfer

**Purpose:** Entry transition.

The transit structure enters rotating agricultural cylinder geometry. Gravity reference begins changing visually before control rules change.

No loading-screen lore dump.

# Gravity Orchard — Lower Ring

## GO01 — Radial Verge

**Purpose:** Teach local gravity seams.

A wall becomes a “floor” through environmental orientation, but player controls remain screen-space consistent unless a authored gravity transition explicitly rotates the gameplay plane.

The first transition occurs safely and slowly.

---

## GO02 — Seed Lift

**Purpose:** Introduce moving organic masses.

Large seed pods contain conductive growth bands.

Player can Attract toward pod, then Repel away.

Pods follow predictable looping paths.

### Multiplayer

Pods are shared world objects. Players may use the same pod independently without knocking one another off.

---

## GO03 — Orchard Workers' Camp

**Purpose:** Regional social context.

Meet:

- Ily-associated field researcher.  
- orchard keeper Sera Mol.  
- workers trying to preserve low-gravity farming.

Quest seed: repairing the regional Anchor may make suspended agriculture impossible.

No decision yet.

---

## GO04 — Rootcoil Garden

**Purpose:** Introduce Rootcoil enemy/hazard.

Rootcoil creates a temporary gravity seam that changes projectile/movement trajectories.

Player can destroy it or manipulate its exposed Resonant bulb.

---

## GO05 — Latch Nursery

**Purpose:** Award **Latch**.

Fiction: an agricultural stabilizer uses persistent attachment fields.

Tutorial:

1. tap Latch to commit pull;  
2. attack while traveling;  
3. cancel into jump;  
4. optional challenge chains two anchors.

### Multiplayer

Latch is personal; no shared-state dependency.

---

## GO06 — Split Canopy

**Purpose:** First Latch combat.

Skimmers orbit high anchors while a Podback controls floor space.

Player is encouraged to Latch upward, attack aerial target, then use Podback armor as projectile.

---

## GO07 — Water Roots

**Purpose:** Environmental story + later transformation setup.

Water remains suspended in elongated low-gravity ribbons.

Player can move through but cannot yet manipulate water directly.

After Orchard Anchor decision, this room changes significantly.

---

## GO08 — Orchard Shortcut A

**Purpose:** Loop closure.

Player opens a one-way agricultural lift back to GO03 camp.

Target return time from camp to GO08 after unlock: under 90 seconds.

---

## GO09 — Grazer Terrace

**Purpose:** Neutral fauna and ethical texture.

Orchard Grazers are non-hostile unless attacked or panicked.

Players can use a Grazer as a moving anchor by attracting to conductive harness growths.

Killing them gives minor Salvage but worsens one NPC reaction; no unique power reward encourages slaughter.

---

## GO10 — Pollination Shafts

**Purpose:** First Seed Swarm interaction.

Swarm behaves as a cloud.

- Attract gathers it.  
- Repel disperses it.  
- gathered swarm can activate pollination sensors.

Combat version later weaponizes this behavior.

---

## GO11 — Convergence Chamber 01 Entrance

Optional challenge unlocks once Latch is acquired.

See CC01 below.

---

## GO12 — Crown Grazer Approach

**Purpose:** Mini-boss foreshadow.

Environment shows broken harness plates and damaged supports.

Players learn that stripping a large creature's plates changes both defense and movement behavior.

---

## GO13 — Crown Grazer Arena

**Mini-boss:** Crown Grazer.

### Phase 1

Heavy, slow, armored.

### Phase 2

Each removed plate exposes movement muscles/field nodes and increases speed.

The optimal question becomes: remove all armor for damage opportunity or keep some armor attached to preserve predictable movement?

### Multiplayer

Additional players create more potential plate interaction, but boss receives better multi-target turns rather than huge health scaling.

### Reward

First major capacity upgrade component and access to upper Orchard.

---

## GO14 — Upper Orchard Ascent

**Purpose:** Sustained Latch challenge.

Three-route structure:

- safe main route;  
- medium route with combat;  
- advanced momentum route with collectible.

Routes reconnect before next Relay.

---

## GO15 — Anchor Service Relay

**Purpose:** Pre-boss-region checkpoint and loadout point.

Provides:

- Relay.  
- module swap.  
- local map update.  
- dialogue explaining Pendulum function.

The Pendulum is not originally a weapon; it is a mass-balancing agricultural engine that now overcorrects unstable gravity.

---

## GO16 — Pendulum Galleries

**Purpose:** Teach boss grammar outside boss.

Players encounter smaller balancing arms that:

- swing between pivots;  
- can act as moving anchors;  
- expose plates after hitting hard stops.

This prevents boss mechanics from feeling arbitrary.

---

## GO17 — Broken Irrigation Ring

**Purpose:** Multi-actor manipulation with player-count scaling.

Two balancing gates regulate suspended irrigation masses.

### Solo

Echo holds Gate A while player adjusts Gate B.

### 2P

One per gate.

### 3P

Third player redirects Seed Swarm that periodically clogs the mechanism.

### 4P

Pairs split across gates: one controls force, one protects/clears moving obstructions.

### Reward

Permanent shortcut to GO15 and optional lore on previous Anchor calibrations.

---

## GO18 — Canopy Duel

**Purpose:** High-intensity pre-boss combat.

Encounter combines:

- Skimmer;  
- Latchwing;  
- Podback;  
- Rootcoil.

This is the first room where four-player composition uses multiple vertical lanes.

Four-player objective is to keep at least one anchor lane operational while enemies pressure all lanes.

---

## GO19 — Quiet Reservoir

**Purpose:** Pacing valley before boss.

No enemies initially.

Environmental storytelling reveals workers have manually maintained an unstable low-gravity irrigation system for generations.

This is where the player first gets a clear statement of the coming dilemma:

- full restoration improves structural safety;  
- preserving current gravity protects Orchard culture/ecology.

---

## GO20 — Pendulum Antechamber

**Purpose:** Retry point.

Relay + loadout.

Door opens directly into arena.

Boss intro skippable after first attempt.

---

## GO21 — The Pendulum Arena

Major boss. See dedicated production specification.

---

## GO22 — Mass Anchor Control

**Purpose:** First regional decision.

After the boss, the player can inspect three calibration approaches.

### Option A — Historical restoration

Restore standard gravity.

Immediate effects:

- structural stability improves;  
- conventional transport activates;  
- some suspended farms collapse or become unusable;  
- certain heavy machinery awakens.

### Option B — Adaptive stabilization

Preserve multi-gravity arrangement while preventing catastrophic drift.

Effects:

- Orchard culture/ecology survives more fully;  
- some conventional infrastructure remains offline;  
- advanced traversal routes remain available.

### Option C — Hybrid calibration

Unavailable unless optional regional quest data is completed.

Balances structural load but requires redirecting resources from another subsystem. It is not a consequence-free golden choice.

Party decision rules follow host-world ownership; party vote UI is advisory.

---

## GO23 — Orchard Afterstate

**Purpose:** Immediately prove choice changed the region.

At least three visible changes occur before player leaves:

- gravity direction / suspended objects;  
- NPC positions/dialogue;  
- active route or machine state.

Player is not forced to tour every change now.

---

## GO24 — Transit Return

**Purpose:** Reconnect to wider world.

New connection opens toward:

- deeper Transit Spine;  
- Solar Foundry route;  
- future Flooded Observatory cross-link teased but not yet active.

# CC01 — First Convergence Chamber

**Location:** off GO11.

**Purpose:** Optional mastery challenge for Link/Echo + Latch.

## Structure

Three compact stages:

1. moving-anchor timing;  
2. opposing-force gate;  
3. combat while maintaining a traversal relationship.

## Solo

Echo recordings stay short; no stage requires more than one active Echo.

## Multiplayer

2P divides actions directly.

3P adds a moving object relay role.

4P uses two simultaneous Link pairs and a final team launch, but no player waits on a switch.

## Reward

Choice of one advanced early Module:

- **Tension Return:** releasing a highly stretched Link reduces Heat for both linked players.  
- **Kinetic Catch:** rescuing/catching a teammate grants brief stability.  
- **Orbit Spark:** completing a full orbit empowers next heavy attack modestly.

Unchosen rewards become available later through other Chambers.

# Opening transformation map

After the Wayfarer Scar stabilizer:

- WS13/WS14 align;  
- TS01 becomes reachable;  
- distant Orchard background visibly changes.

After the Orchard Anchor decision:

- GO07 Water Roots changes;  
- GO03 camp NPC positions/services change;  
- GO08/GO14 shortcut geometry changes;  
- selected Grazers/Seed Swarms migrate;  
- TS05 vista updates;  
- one future route toward Flooded Observatory changes its initial state.

# Greybox acceptance checklist

The room set is ready for art production only when:

- critical route can be completed with no designer cheats;  
- solo Echo and 2/3/4-player solutions are all valid;  
- every major mechanic has safe introduction before lethal combination;  
- four-player encounters remain legible with placeholder VFX;  
- all shortcuts meaningfully reduce return time;  
- Pendulum retry takes under 20 seconds;  
- transformation state can reload from save without geometry or quest corruption;  
- no required objective can be lost by throwing a critical object out of bounds.  
