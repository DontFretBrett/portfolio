# Dependabot Pull Request Maintenance Guide

This guide provides step-by-step instructions for AI assistants to efficiently merge dependabot pull requests while avoiding common pitfalls.

## Prerequisites

Before starting, always check the current git state:

```bash
git status
git fetch origin
```

**Critical**: If there's an active rebase or merge in progress, resolve it first before proceeding.

## Step 1: Identify Open Dependabot PRs

### Check which branches exist
```bash
git branch -r | grep dependabot | sort
```

### Check which are already merged
```bash
git branch -r --merged main | grep dependabot
git branch -r --no-merged main | grep dependabot
```

### Verify what's actually needed
For each unmerged branch, check if the changes are already in main:
```bash
git log --oneline main..origin/dependabot/npm_and_yarn/[package-name] | head -3
```

If the output is empty, the branch is already merged (possibly via rebase).

## Step 2: Prioritize by Version

**Always prefer newer versions**. Before merging, check what version each PR updates to:

```bash
git show origin/dependabot/npm_and_yarn/[package-name]:package.json | grep "[package-name]"
```

Compare with current `package.json`:
- If PR version < current version: Skip or close the PR (it's outdated)
- If PR version = current version: Merge to close the PR (changes already in main)
- If PR version > current version: Merge it

## Step 3: Merge Strategy

### Option A: Merge individually (recommended for many PRs)
```bash
git merge --no-edit origin/dependabot/npm_and_yarn/[package-name]
```

### Option B: Batch merge (faster but more conflict-prone)
```bash
for branch in $(git branch -r --no-merged main | grep dependabot); do
  git merge --no-edit $branch || echo "Conflict in $branch"
done
```

## Step 4: Resolve Conflicts

### Common conflict scenarios:

#### 1. Lockfile conflicts (pnpm-lock.yaml, package-lock.json)
**Resolution**: Regenerate the lockfile after resolving package.json conflicts
```bash
# After resolving package.json conflicts
git checkout --ours package.json  # Keep newer versions
pnpm install --no-frozen-lockfile  # Regenerate pnpm-lock.yaml
# OR
npm install --legacy-peer-deps  # Regenerate package-lock.json
git add package.json pnpm-lock.yaml package-lock.json
git commit -m "Merge dependabot: [package-name] (resolved conflicts)"
```

#### 2. Package.json version conflicts
**Resolution**: Always keep the newer version
```bash
# Check both versions
git show --ours package.json | grep "[package-name]"
git show --theirs package.json | grep "[package-name]"

# Keep newer version (usually --ours after rebase)
git checkout --ours package.json
```

#### 3. Multiple PRs updating same package
**Resolution**: Merge the newest version last, or skip older PRs
```bash
# Example: If vite-7.3.0 and vite-7.3.1 both exist
# Only merge vite-7.3.1, skip vite-7.3.0
```

## Step 5: Critical - Sync Lockfiles

**This is the most common cause of build failures!**

After merging dependabot PRs, ALWAYS verify lockfiles are in sync:

```bash
# Check for outdated lockfile
pnpm install --frozen-lockfile 2>&1 | grep -i "outdated\|lockfile" || echo "Lockfile is synced"

# If outdated, regenerate:
pnpm install --no-frozen-lockfile
# OR
npm install --legacy-peer-deps
```

### Verify sync before committing:
```bash
# Check what changed
git diff pnpm-lock.yaml | head -50
git diff package-lock.json | head -50

# If lockfile changed, commit it:
git add pnpm-lock.yaml package-lock.json
git commit -m "chore: update lockfiles after dependabot merges"
```

## Step 6: Handle Active Rebase/Merge

If you encounter an active rebase or merge:

### Check status
```bash
git status
ls -la .git/rebase-merge/ 2>/dev/null || echo "No active rebase"
```

### If rebase in progress:
1. **Resolve conflicts**:
   ```bash
   git status  # See what's conflicted
   # Resolve conflicts (see Step 4)
   git add [resolved-files]
   git rebase --continue
   ```

2. **If conflicts are too complex, abort and start fresh**:
   ```bash
   git rebase --abort
   # Then proceed with regular merges
   ```

### If merge in progress:
```bash
# Resolve conflicts
git checkout --ours [file]  # or --theirs, depending on which is newer
git add [resolved-files]
git commit -m "Merge: resolved conflicts"
```

## Step 7: Verify Before Pushing

### Run local checks:
```bash
# Type check
npm run typecheck

# Lint check
npm run lint

# Build check (catches most issues)
npm run build
```

### Check git state:
```bash
git status  # Should be clean
git log --oneline -10  # Review recent commits
```

### Verify lockfile sync one more time:
```bash
pnpm install --frozen-lockfile || echo "Lockfile needs updating"
```

## Step 8: Commit Strategy

### Good commit messages:
```bash
# For individual merges
git commit -m "Merge dependabot: [package-name] [version]"

# For batch merges
git commit -m "chore: merge dependabot PRs - [list packages]"

# For lockfile updates
git commit -m "chore: update lockfiles after dependabot merges"

# For conflict resolution
git commit -m "Merge dependabot: [package-name] (resolved conflicts, kept newer versions)"
```

## Common Pitfalls & Solutions

### Pitfall 1: Lockfile out of sync after rebase
**Symptom**: Vercel build fails with `ERR_PNPM_OUTDATED_LOCKFILE`
**Solution**: Always regenerate lockfiles after rebase/merge operations

### Pitfall 2: Merging outdated PRs
**Symptom**: PR wants to update to older version than current
**Solution**: Check versions first, skip outdated PRs

### Pitfall 3: Multiple PRs for same package
**Symptom**: Confusion about which version to use
**Solution**: Always merge the newest version, skip older ones

### Pitfall 4: Active rebase blocking operations
**Symptom**: Can't push, git status shows rebase in progress
**Solution**: Complete or abort rebase before proceeding

### Pitfall 5: Forgetting to commit lockfile changes
**Symptom**: Local works, Vercel build fails
**Solution**: Always check `git status` and commit lockfile changes

## Complete Workflow Example

```bash
# 1. Check state
git status
git fetch origin

# 2. Identify PRs to merge
git branch -r --no-merged main | grep dependabot

# 3. Check versions (example for vite)
git show origin/dependabot/npm_and_yarn/vite-7.3.1:package.json | grep vite
# Compare with current package.json

# 4. Merge (one at a time to catch conflicts early)
git merge --no-edit origin/dependabot/npm_and_yarn/vite-7.3.1

# 5. If conflicts, resolve:
git checkout --ours package.json
pnpm install --no-frozen-lockfile
git add package.json pnpm-lock.yaml
git commit -m "Merge dependabot: vite-7.3.1"

# 6. After all merges, verify lockfile
pnpm install --frozen-lockfile || pnpm install --no-frozen-lockfile

# 7. Test build
npm run build

# 8. Commit lockfile if changed
git add pnpm-lock.yaml && git commit -m "chore: update lockfile after dependabot merges"

# 9. Verify everything
git status  # Should be clean
git log --oneline -5  # Review commits
```

## Quick Reference Checklist

- [ ] Check git status (no active rebase/merge)
- [ ] Fetch latest branches
- [ ] Identify unmerged dependabot branches
- [ ] Verify versions (prefer newer)
- [ ] Merge PRs one by one
- [ ] Resolve conflicts (keep newer versions)
- [ ] Regenerate lockfiles after merges
- [ ] Run typecheck, lint, build
- [ ] Commit lockfile changes
- [ ] Verify git status is clean
- [ ] Push when ready

## Notes

- **Always regenerate lockfiles** after merging dependabot PRs
- **Prefer newer versions** when resolving conflicts
- **Test locally** before pushing to avoid Vercel build failures
- **One PR at a time** helps catch issues early
- **Check for active rebases** before starting work
