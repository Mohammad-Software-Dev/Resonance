# Final Unresolved Decision Register

**Status:** Iteration 3J  
**Purpose:** Keep only genuine owner/product decisions; remove stale questions already answered by the design bible.

# Decisions that need owner input before public production lock

## 1. Final game title

Current working title:

**Resonance**

Needs:

- trademark clearance;
- store/SEO collision research;
- domain/social availability review;
- final product/creative approval.

Do not rename casually inside implementation before a formal naming pass.

## 2. Final public names for four configurations

Current canonical working names:

- Historical Continuity;
- Distributed Meridian;
- Open Resonance;
- Bounded Accord.

Mechanics/tradeoffs are locked.

Public-facing wording may be refined for tone/clarity.

This is a naming decision, not a design reopening.

## 3. Obsolete Anchor Prototype name

Old working name “The Pale Engine” is deprecated.

Need an original final name only if the optional encounter survives scope.

# Decisions to make after prototype/vertical-slice evidence

## 4. Public matchmaking in Version 1

Baseline:

- Invite Only;
- Friends.

Public matchmaking is optional.

Decision trigger:

- moderation/support budget;
- discoverability need;
- session UX quality;
- expected concurrent player population.

Do not make the campaign depend on public matchmaking.

## 5. Exact optional superboss count

Current candidates exceed launch-critical need.

Decide after production throughput is known.

Protect mandatory bosses first.

## 6. Bounded Accord launch inclusion under severe scope pressure

Current Full Version 1 target:

include it.

If its prerequisite/QA burden threatens movement/network/save quality, it is the first finale branch that can be deferred without collapsing the three standard configuration philosophies.

This is a contingency decision, not a recommendation to cut it now.

# Explicitly deferred / not Version 1 decisions

## 7. New Game+

Not required for Version 1.

Revisit post-launch.

## 8. Fully explorable post-ending world

Not required for Version 1.

Epilogues + pre-commit Continue are canonical V1.

## 9. Console ports

PC first.

Evaluate after PC performance/input/network foundation is stable.

## 10. Shared/group-owned campaign saves

Host-owned campaign is locked V1.

Shared campaign remains future research only after host/guest persistence is proven.

## 11. Couch/split-screen

Out of scope for Version 1.

Not an unresolved production decision.

# Already resolved — do not reopen without new evidence

- 2.5D.
- PC first.
- solo + 1–4 online.
- four-player architecture from the beginning.
- one human per client.
- named Wayfarer cast.
- challenging baseline + granular accessibility.
- moderate story/environmental lore balance.
- host owns irreversible world choices.
- guests retain eligible personal progression.
- Attract/Repel core identity.
- Echo solo parity.
- Latch/Orbit in Orchard.
- Vector Shift in Foundry.
- Flux in Rust.
- Phase in Choir.
- Invert in Loom.
- no foundational movement ability after Invert.
- Astral Shepherd optional.
- Meridian Custodian mandatory.
- Anchor Zero before final configuration.
- four finale configuration concepts.
- no consequence-free golden ending.
- pre-final-commit Continue postgame policy.

# Owner-decision hygiene

A production document should not add a new owner-level unresolved decision unless it:

- changes product identity;
- changes major scope/cost;
- changes campaign ownership;
- changes monetization/platform strategy;
- changes a locked critical-path system.

Tuning and implementation detail belong to discipline leads and playtesting, not this register.
