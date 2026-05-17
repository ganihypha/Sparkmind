<!--
Title format: [Lane X] <imperative verb> <object>
Examples:
  [Lane A] bootstrap monorepo skeleton
  [Lane C] subtree-merge powpl into ledger/
  [Lane E] D2 BarberKas D1 schema (tenants, services, appointments)
-->

## Lane

<!-- Which DOC-X lane does this PR belong to? A / B / C / D / E / other -->

- Lane: <!-- e.g., A -->
- Doc-Ref: <!-- e.g., DOC-X §02 Lane A, DOC-M §04 Topology -->

## Summary

<!-- 2–4 sentence description of what changed and why. -->

## Files Touched (verify boundary)

<!-- List paths. Confirm they match the lane's OWNS list per DOC-X §02. -->

- `path/to/file1`
- `path/to/file2`

## Definition of Done

<!-- Copy DoD from your session prompt and check off as you complete. -->

- [ ] DoD item 1
- [ ] DoD item 2
- [ ] DoD item 3
- [ ] CI green (build + lint + test)
- [ ] No secrets / .env files committed
- [ ] Ledger entry drafted (paste below or link)

## Ledger Entry Draft

```markdown
### YYYY-MM-DD · Day NNN

- **Lane:** <X>
- **Done:** <one-line summary>
- **Tomorrow:** <next lane/task>
- **Friction:** <none | describe>
- **Doc-Ref:** <doctrine sections>
- **PR:** #<this PR>
```

## Doctrine Compliance

- [ ] No VPS / Docker-compose suggestions (Cloudflare-native only)
- [ ] No `any` types / `@ts-ignore` (proper types)
- [ ] Conventional Commits message style used
- [ ] Boundary respected (no cross-lane file edits)
