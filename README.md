# SparkMind Sovereign

> _"One Sovereign Graph — satu Git ridge yang nyatuin mother brand, sub-brands, doctrine, dan public proof-of-work."_

**Owner:** Reza Estes / Haidar (Sovereign AI Dev)
**Status:** 🟢 Active · Day 0 of 90-day Sovereign Reconnect Window
**Master Repo:** https://github.com/ganihypha/Sparkmind-Sovereign
**Public:** Yes (doctrine + ledger are public-safe)

---

## What this is

`sparkmind-sovereign` is the **canonical monorepo** for the SparkMind Sovereign ecosystem:

- 🌱 **Mother brand**: [SparkMind](https://www.sparkmind.web.id/) — sovereign AI dev studio
- ✂️ **Sub-brand #1**: [BarberKas](https://barberkas.sparkmind.web.id/) — multi-tenant barbershop SaaS (Cloudflare-native)
- 🏃 **Sub-brand #2**: PaceLokal — hyperlocal running club & event OS (`pacelokal.sparkmind.web.id`)
- 📜 **Doctrine**: `/docs` — DOC-A, DOC-D, DOC-M, DOC-R, DOC-X, BARBERKAS v2.0, DUAL-PG v1.0
- ⛓️ **PoWPL**: `/ledger` — Proof of Work Public Ledger (one commit/day discipline)

This repo is the **single source of truth**. Polyrepo is rejected per [DOC-M §10](docs/DOC-M-Monorepo-Consolidation-v1.0.md) (Decision Matrix: monorepo 9.55 > polyrepo 5.45).

---

## Topology (per DOC-M §04)

```
sparkmind-sovereign/
├── apps/             ← deployable units (Cloudflare Workers / Pages)
│   ├── sparkmind-web/    (mother brand site — future)
│   ├── barberkas/        (sub-brand #1 — Lane E)
│   └── pacelokal/        (sub-brand #2 — Lane B)
├── packages/         ← internal libraries (workspace: protocol)
├── docs/             ← canonical doctrine (CC-BY-SA-4.0)
├── ledger/           ← PoWPL public proof-of-work (append-only)
├── scripts/          ← repo-wide shell utilities
├── .github/          ← workflows, CODEOWNERS, PR template
└── (root configs)    ← package.json, pnpm-workspace.yaml, turbo.json, tsconfig.base.json
```

**Rules:**

- `apps/*` are leaves — may import `packages/*`, **never** another app
- `packages/*` are nodes — may import other packages, **never** any app
- `docs/` and `ledger/` are public-safe — no secrets, no PII

Full topology spec: [`docs/MONOREPO-TOPOLOGY.md`](docs/) (Lane C subtree merge).

---

## Doctrine Stack

| Doc                | What it gives you                                    | File                                                  |
| ------------------ | ---------------------------------------------------- | ----------------------------------------------------- |
| **DOC-A**          | Sovereign Frame — operator identity & 90-day mission | `docs/DOC-A-Sovereign-Frame-v1.0.md`                  |
| **DOC-D**          | Engineering Discipline — 1 commit/day, PoWPL vows    | `docs/DOC-D-Sovereign-Engineering-Discipline-v1.0.md` |
| **DOC-M**          | Monorepo Consolidation — this repo's topology spec   | `docs/DOC-M-Monorepo-Consolidation-v1.0.md`           |
| **DOC-R**          | PaceLokal Running Strategy (sub-brand #2)            | `docs/DOC-R-Sovereign-Running-Strategy-v1.0.md`       |
| **DOC-X**          | Execution Reality — session-architect prompt system  | `docs/DOC-X-Execution-Reality-v1.0.md`                |
| **BARBERKAS v2.0** | Cloudflare-native multi-tenant build spec            | `docs/BARBERKAS-CLOUDFLARE-NATIVE-STRATEGY-v2.0.md`   |
| **DUAL-PG v1.0**   | Payments: Xendit primary + Duitku backup             | `docs/DUAL-PG-STRATEGY-v1.0.md`                       |

> Doctrine docs will be subtree-merged into `/docs` in **Lane C** per [DOC-M §07](docs/DOC-M-Monorepo-Consolidation-v1.0.md).

---

## Quick Start

```bash
# Prereqs
node --version    # >=20
pnpm --version    # >=9
git --version     # >=2.40

# Install
pnpm install

# Build (no-op until apps land in Lane B/E)
pnpm build

# Lint + test
pnpm lint
pnpm test

# Format
pnpm format
```

---

## Execution Lanes (DOC-X §02)

| Lane  | Purpose                                                                        | Status                | Day     |
| ----- | ------------------------------------------------------------------------------ | --------------------- | ------- |
| **A** | Bootstrap monorepo skeleton                                                    | ✅ Done (this commit) | Day 0   |
| **C** | Subtree-merge sub-repos (powpl, barberkas-edge, xendit-worker, sparkmind-docs) | ⏳ Next               | Day 1   |
| **E** | BarberKas edge (D1–D7 ladder per BARBERKAS v2.0)                               | ⏸ Queued             | Day 2–8 |
| **B** | PaceLokal scaffold (sub-brand #2)                                              | ⏸ Queued             | Day 8+  |
| **D** | Cutover: Duitku → Xendit production                                            | 🔒 Locked (needs KYB) | Day 14+ |

Each lane has a **pre-filled session prompt** in `prompts/session-X-*.md` (Lane C will create those).

---

## Contributing

1. Read [DOC-X §03](docs/DOC-X-Execution-Reality-v1.0.md) — session architect protocol
2. Pick a lane, open the session prompt, paste into AI session
3. Verify scope confirmation, reply `go`
4. Open PR with `[Lane X] <verb> <object>` title format
5. CI must pass + CODEOWNERS approval before merge

**Hard rules:**

- ❌ No squash for Lane C (history preservation, DOC-M §07)
- ❌ No VPS / Docker-compose suggestions (Cloudflare-native only)
- ❌ No commits directly to `main` (PR-only)
- ❌ No `.env` / secrets in repo (`.dev.vars` for local only, ignored)

---

## License

- **Code** (`apps/`, `packages/`, `scripts/`, root configs): MIT — see [`LICENSE`](LICENSE)
- **Docs & Ledger** (`docs/`, `ledger/`): CC BY-SA 4.0 — see [`docs/LICENSE-docs`](docs/LICENSE-docs)

---

## Cite

```
Estes, R. / Haidar (2026). SparkMind Sovereign monorepo.
https://github.com/ganihypha/Sparkmind-Sovereign
```

— _Built sovereign. Shipped public. Counted in commits._
