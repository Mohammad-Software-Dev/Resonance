# Early Game Combat, Enemies, Cores and Modules

**Coverage:** Wayfarer Scar → Transit Spine → Gravity Orchard    
**Goal:** Provide enough authored combat/progression depth for the first 3–5 hours without front-loading the full game.

## Combat tuning framework

Final numbers are not locked. Use normalized classes first.

### Health classes

- **H1 Fragile:** dies quickly to a short basic sequence.  
- **H2 Standard:** survives one normal combo and requires repositioning or follow-up.  
- **H3 Durable:** needs stability interaction or several openings.  
- **H4 Elite:** mini-boss-like durability with component mechanics.

### Stability classes

- **S0 None:** cannot be stagger-managed meaningfully.  
- **S1 Light:** easy to destabilize.  
- **S2 Standard:** requires focused attacks/Resonance.  
- **S3 Heavy:** primarily manipulated through components/environment.

### Mass classes

- Feather.  
- Light.  
- Medium.  
- Heavy.  
- Anchored.

Mass and health are independent.

# Opening enemy package

## 1. Scrapper

**Region:** Wayfarer Scar / Transit    
**Role:** Basic melee pressure    
**Health:** H1–H2    
**Stability:** S1    
**Mass:** Light

### Attacks

- short rush;  
- two-hit arm swipe;  
- optional leaping intercept on later variants.

### Resonance

After stability break, body can be displaced.

Arm plate can be cracked and removed on armored variant.

### Teaching purpose

Shows that attacks create Resonance opportunities rather than existing separately.

### Multiplayer

At 3–4P, Scrapper uses wider target-switch logic so all enemies do not pile onto host.

---

## 2. Survey Spark

**Role:** Intro ranged enemy    
**Health:** H1    
**Stability:** S0    
**Mass:** Feather/light drone

### Attacks

Slow, highly readable Resonant bolt.

Later variant fires a two-bolt angle pattern.

### Resonance

Bolt can be Repelled.

Drone can be pulled slightly after interruption but should not become trivial projectile fodder immediately.

### Teaching purpose

Projectile reflection and threat prioritization.

---

## 3. Clamp

**Role:** Anchor denial / support    
**Health:** H2    
**Stability:** S1    
**Mass:** Medium while attached; Light after removal

### Behavior

Seeks nearby active movement anchor and locks onto it.

While attached:

- anchor remains visible but marked unavailable;  
- Clamp gains partial protection.

### Counters

- conventional damage;  
- crack attachment;  
- pull Clamp off;  
- reflect projectile into attachment.

### Multiplayer

At 4P, Clamp may select different lane/anchor from nearest combat cluster to prevent all pressure collapsing into one location.

---

## 4. Rail Mite

**Role:** Fast harassment    
**Region:** Transit    
**Health:** H1    
**Stability:** S0    
**Mass:** Feather

Runs along rails/walls and jumps across path.

### Resonance

Repel can knock it off rail into another enemy.

### Purpose

Forces player to read background-connected rail paths in 2.5D without making background geometry interactable ambiguously.

---

## 5. Skimmer

**Role:** Aerial pressure    
**Region:** Orchard    
**Health:** H1–H2    
**Stability:** S1    
**Mass:** Light

Orbits Resonant anchors.

### Attacks

- diving cut across orbit tangent;  
- seed dart;  
- anchor-to-anchor relocation.

### Resonance

Player can disrupt orbit with timed Repel or steal the anchor route via Latch.

### Multiplayer

Can mark different players on opposite vertical lanes.

---

## 6. Latchwing

**Role:** Traversal denial    
**Health:** H1    
**Stability:** S0    
**Mass:** Light

Attaches to useful anchors and emits interference.

Unlike Clamp, Latchwing is mobile and temporary.

### Counterplay

- strike off anchor;  
- Attract at close range;  
- use another route.

### Purpose

Makes movement decisions part of combat.

---

## 7. Podback

**Role:** Armored bruiser    
**Health:** H3    
**Stability:** S2    
**Mass:** Medium

### Armor

Large conductive shell.

States:

- intact;  
- cracked;  
- removed.

### After removal

- defense falls;  
- movement speed rises slightly;  
- shell becomes throwable object.

### Purpose

Core example of “enemy component becomes world tool.”

---

## 8. Rootcoil

**Role:** Area control    
**Health:** H2    
**Stability:** S1    
**Mass:** Anchored root, Light bulb component

Creates a temporary local gravity seam/field bend.

### Counterplay

- destroy exposed bulb;  
- Attract bulb to distort seam;  
- use seam intentionally for movement/projectile route.

### Purpose

Introduce hostile field effects that can become beneficial.

---

## 9. Seed Swarm

**Role:** Swarm / environmental system    
**Health:** Cloud-state rather than conventional HP    
**Mass:** Feather aggregate

### Rules

- Attract condenses cloud.  
- Repel disperses.  
- attacks remove density locally.  
- condensed swarm can activate pollination sensor or damage enemy on impact.

### Multiplayer

Multiple players can shape different edges of same cloud; authority is on a low-dimensional cloud state, not individual particles.

---

## 10. Orchard Grazer

**Role:** Neutral/heavy fauna / moving anchor    
**Health:** H3    
**Stability:** S3    
**Mass:** Heavy

Normally non-hostile.

### Interaction

Conductive harness-growth points allow temporary attraction.

If panicked:

- charges;  
- changes route;  
- can break environmental braces.

### Purpose

Demonstrates world ecology is not simply enemy population.

# Early elite package

## Alignment Hound

Opening mini-boss, defined in first-hour document.

## Crown Grazer

Gravity Orchard elite.

Core gimmick:

- each armor plate removed reduces protection but increases speed;  
- players choose how aggressively to strip it.

Reward: capacity component + upper Orchard access.

# Early Core families

Only three Core families should be available by the end of Gravity Orchard. The other three arrive later.

## Vector Core

**Identity:** Momentum and movement expression.

### Baseline effect

Slightly improves momentum retention after specific attacks and safe landings.

### Core technique — Vector Drive

After a high-quality Resonance launch, next aerial attack can redirect a limited portion of momentum toward target.

### Use case

Players who enjoy traversal/combat blending.

---

## Breaker Core

**Identity:** Stability and armor manipulation.

### Baseline effect

Heavy attacks deal more stability damage to cracked components.

### Core technique — Fracture Pulse

Removing armor/components creates a small stagger pulse around target.

### Use case

Players who like deliberate setup and object weaponization.

---

## Weaver Core

**Identity:** Links, rescue, multi-actor control.

### Baseline effect

Slightly longer Link acquisition range and reduced Heat from rescue actions.

### Core technique — Tension Snap

Releasing a Link near a tuned tension threshold sends a short controlled impulse through linked actor/object.

Cannot be used to grief teammates; friendly version requires cooperative Link state.

### Use case

Co-op-focused players and solo Echo experimentation.

# Starter Module set

Target: 10 modules visible/obtainable by end of Orchard, with 4–6 likely owned on a normal path.

## 1. Return Current

Perfect projectile Repel reduces a small amount of Heat.

## 2. Soft Landing

Reduces recovery after high-speed non-damaging landing and preserves more movement control.

## 3. Loose Circuit

Removing an enemy component briefly improves launched-object acceleration.

## 4. Anchor Memory

Target lock persists slightly longer when anchor is briefly occluded.

Accessibility-adjacent but consumes build capacity and therefore should not replace true aim-assist settings.

## 5. Fracture Bite

Breaking enemy stability restores a small amount of currently Fractured Health.

Capped per target to prevent farming.

## 6. Quick Brace

After taking heavy knockback, first Attract to fixed anchor acquires faster.

## 7. Kinetic Catch

Successfully rescuing a teammate gives both players temporary stability resistance.

Solo equivalent: catching an Echo-generated moving object can grant smaller effect only if balance needs it.

## 8. Orbit Spark

Completing a meaningful orbit empowers next heavy strike modestly.

Requires real angular travel; cannot be triggered by tiny circles.

## 9. Tension Return

Releasing a highly stretched Link within valid range cools Heat for linked players.

## 10. Seed Conductor

Condensed Seed Swarms remain coherent longer after player releases force.

Regional utility module with combat/puzzle value.

# Capacity

Prototype model:

- starting Rig Bandwidth: 3.  
- common modules cost 1.  
- stronger behavior modules cost 2.  
- end of Orchard expected Bandwidth: 4–5 depending exploration.

Do not create “correct” mandatory build. Starter content should be beatable with empty module slots.

# Acquisition plan

## Wayfarer Scar

Free choice:

- Return Current OR Soft Landing.

Other becomes purchasable at Keph after first Transit connection.

## Transit Spine

Loose Circuit in Salvage Spur.

Anchor Memory through first map/service side task.

## Gravity Orchard

Fracture Bite from worker quest.

Quick Brace hidden on advanced Latch route.

Kinetic Catch / Orbit Spark / Tension Return choice from Convergence Chamber.

Seed Conductor from pollination side route.

# Economy assumptions for opening

## Salvage

Common.

Spent on:

- unchosen starter module;  
- map/service upgrades;  
- basic consumable repair restock if that system survives prototype;  
- cosmetics later.

## Anchor Shard

Rare.

Opening Hound awards first one.

Crown Grazer/Orchard content may award component toward Bandwidth, not necessarily a full second Shard.

Do not require grinding enemies for core progression.

# Fracture Health prototype values

Starting target for playtest, not final:

- 40–60% of incoming recoverable damage becomes temporary Fracture depending attack class.  
- Fracture window: \~5 seconds.  
- perfect reflect: small recovery.  
- stability break: medium recovery via relevant module.  
- component removal: medium recovery if aggression criteria met.

Boss attacks may convert more damage directly to stable loss.

# Heat prototype rules

Basic traversal Attract/Repel should rarely overheat alone.

Heat comes mainly from:

- sustained force on Heavy targets;  
- rapid repeated reflection;  
- high-output Link techniques;  
- Core skills.

Opening target:

- normal player encounters Heat limit occasionally in intense fights;  
- skilled traversal does not feel stamina-gated.

# Multiplayer enemy scaling

### 1P

Baseline count and attack concurrency.

### 2P

Approx. 1.4–1.7x active threat budget depending room, not fixed enemy multiplier.

### 3P

Approx. 1.8–2.2x threat budget plus more role diversity.

### 4P

Approx. 2.2–2.7x threat budget with additional lanes/support behavior.

Threat budget can be spent on:

- another enemy;  
- smarter simultaneous pattern;  
- support role;  
- environmental pressure.

Avoid simply multiplying HP.

# Early-game combat acceptance criteria

The package is working when:

- players naturally use Repel/Attract during combat after tutorials stop prompting;  
- Podback armor is used as a weapon by a meaningful share of testers;  
- Clamp/Latchwing make anchor choice matter without making movement frustrating;  
- four-player teams split attention across threats instead of dog-piling one sponge;  
- at least three early Core/Module combinations are seen in playtests;  
- no Core is required for a critical-path boss;  
- novice players can understand enemy intent from animation/VFX before mastering optimal Resonance counters.  
