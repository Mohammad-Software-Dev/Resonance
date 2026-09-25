# Save, Profile, World-State and Reward Schema — Browser Architecture

**Principle:** Host owns co-op world state; players own personal progression.  
**Requirement:** Every schema is versioned from day one.

## Persistence domains

### 1. Player Profile

Durable account/profile data in PostgreSQL.

Contains:

- ProfileGUID;
- linked identities;
- accessibility settings;
- input preferences;
- unlocked cosmetics;
- permanent ability milestones;
- Cores/Modules;
- currencies;
- codex;
- challenge/completion records;
- pending entitlements;
- statistics.

### 2. Campaign Save

Authoritative campaign timeline.

Contains:

- CampaignGUID;
- host owner;
- SaveSchemaVersion;
- WorldStateRevision;
- region outcomes;
- room/permanent shortcut state;
- boss/quest/NPC state;
- world choice ledger;
- progression milestones;
- final-configuration state.

### 3. Session State

Transient Colyseus room state.

Never becomes durable save truth by itself.

### 4. Local Browser Cache

Used for:

- cached profile view;
- solo local-authority save;
- content manifests;
- reconnect/session metadata;
- recovery copy.

Storage:

- IndexedDB;
- Cache Storage.

Do not use localStorage for campaign authority.

## Identity

Supabase Auth provides browser identity and signed JWTs.

Supported launch flows:

- anonymous/guest;
- email magic link;
- selected OAuth providers.

Electron/Steam may link Steam identity to the same ProfileGUID.

A platform identity is not the primary save key.

## Solo save path

Solo may run local authority.

At safe save point:

1. build versioned campaign snapshot;
2. validate locally;
3. write atomic IndexedDB recovery generation;
4. if online, upload to persistent backend;
5. backend validates revision and commits;
6. client receives committed WorldStateRevision.

Offline solo may continue using local recovery state.

When connectivity returns:

- sync against last known cloud revision;
- if divergent, show explicit conflict resolution;
- never silently overwrite the newer branch.

## Co-op save path

Dedicated game server owns campaign mutation.

At save/choice checkpoint:

1. freeze durable logical snapshot;
2. validate required invariants;
3. increment revision;
4. write backend transaction;
5. wait for durable acknowledgement for irreversible choices;
6. replicate new revision to party.

No client may directly commit host campaign state during co-op.

## Atomic save

Backend uses a PostgreSQL transaction.

Conceptual tables:

- profiles;
- campaigns;
- campaign_snapshots;
- campaign_choice_ledger;
- completion_records;
- player_rewards;
- linked_identities.

Campaign snapshot may be stored as versioned JSONB plus indexed metadata.

Do not normalize every room flag into dozens of joins unless query needs justify it.

## Optimistic concurrency

Every campaign commit includes:

- CampaignGUID;
- expected WorldStateRevision;
- new revision;
- snapshot hash;
- SaveSchemaVersion.

If expected revision is stale:

- reject;
- reload;
- resolve explicitly.

This prevents duplicate/out-of-order save writes.

## Guest rewards

Use idempotency key:

`CampaignGUID + RewardEventID + ProfileGUID`

Reward grant transaction must be retry-safe.

Reconnect or server retry cannot duplicate rewards.

## Session licenses

Guests joining later host progress may receive temporary ability licenses.

Stored only in session state.

They do not mutate permanent profile ownership.

## Browser refresh/reconnect

Persist minimal reconnect metadata:

- room ID;
- reconnect token;
- server endpoint;
- session/build version;
- expiry.

Never persist a reusable server-secret credential in browser storage.

## Local cache durability

Browser storage can be evicted.

Therefore:

- local cache is convenience/recovery;
- cloud backend is durable account source when online;
- completed online choice commits are acknowledged only after backend durability.

For offline solo:

- retain multiple local generations;
- provide export/recovery path before long-term launch if offline mode ships broadly.

## Content/save compatibility

Every save stores:

- SaveSchemaVersion;
- GameDataVersion;
- minimum compatible client version;
- content outcome IDs.

If client cannot safely migrate:

- keep original save;
- refuse destructive load;
- provide explicit update message.

## Migration

Use incremental migration chain.

Never rewrite old tag meaning.

Deleted shipped content leaves:

- tombstone;
- replacement/migration mapping;
- safe fallback.

## Final configuration transaction

Final commit is separate from ordinary save.

1. durable pre-commit snapshot;
2. validate host authority;
3. validate prerequisites;
4. set PendingConfiguration with commit revision;
5. play final branch;
6. on success create completion record;
7. preserve pre-commit Continue snapshot.

## Backups

Backend retains:

- active campaign snapshot;
- previous good snapshot;
- choice ledger.

High-value transitions may retain additional checkpoint snapshot.

## Privacy

Do not store unnecessarily:

- raw friend lists;
- chat history;
- IP history;
- detailed device fingerprints.

Store only identity/network data required for operation/security.

## Acceptance

Persistence passes when:

- browser refresh does not lose a co-op campaign;
- offline solo never silently overwrites newer cloud state;
- guest reward retries are idempotent;
- irreversible regional/final choices are durable before success UI;
- schema migration preserves old test saves;
- local cache eviction cannot destroy an acknowledged online campaign.
