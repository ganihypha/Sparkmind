# Workflow Templates

GitHub Actions workflow files staged here because the bootstrapping GitHub App
lacked the `workflows` permission scope. **Operator must copy these to
`.github/workflows/` manually** (using a personal access token or direct
GitHub UI commit).

## Files

| Template | Target path | Purpose |
|---|---|---|
| `ci.yml.template` | `.github/workflows/ci.yml` | Build · Lint · Test on PR + push to main |

## Activation steps

```bash
# Option 1: Local
cd <repo>
mkdir -p .github/workflows
git mv .github/workflow-templates/ci.yml.template .github/workflows/ci.yml
git commit -m "chore(ci): activate GitHub Actions workflow (Lane A follow-up)"
git push origin main  # requires PAT or GitHub UI commit
```

```text
# Option 2: GitHub UI
- Open .github/workflow-templates/ci.yml.template
- Copy entire content
- Create new file .github/workflows/ci.yml via "Add file > Create new file"
- Paste content, commit directly on main (or via PR)
```

After activation, this template directory can be deleted.

— Doc-Ref: DOC-X §02 Lane A, post-exec note
