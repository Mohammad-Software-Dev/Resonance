# replay-cli

Deterministic M0 replay generation and validation.

Commands:

```text
pnpm --filter @resonance/replay-cli replay --generate <output.json>
pnpm --filter @resonance/replay-cli replay <replay.json>
pnpm --filter @resonance/replay-cli replay --matrix <replay.json>
pnpm replay:fingerprint
```

Verification exits nonzero at the first divergent checkpoint and prints diagnostic context suitable for CI/desync reports.
