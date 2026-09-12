---
name: a-watch-can-report-green-early
description: gh pr checks --watch exited 0 twice while a job was still running, and a full verify run beside the e2e suite fails an unrelated hydration test; read the settled list, and run heavy suites alone.
metadata:
  type: project
---

Two ways a green result was not one, both hit more than once in a single day.

**A watch can exit before the checks settle.** `gh pr checks <n> --watch` returned exit 0 twice
while `e2e` was still `pending`, printing only the jobs that had finished. Pushing a new commit
while it watched was one trigger; the second had no obvious cause. Exit 0 from it means "the
command ended", not "the checks passed".

What works: poll until nothing reads `pending`, then decide.

```bash
for i in $(seq 1 45); do
  out=$(gh pr checks <n> 2>&1)
  echo "$out" | grep -q pending || { echo "$out"; break; }
  sleep 20
done
```

**A heavy run beside the e2e suite fails a test that is fine.** `pnpm verify` and
`pnpm test:e2e` at the same time failed the inspector's "label as text" spec on a five-second
wait for hydration. It passed alone, and passed in a clean full run of the same build. The suite
is not flaky; the machine was busy.

**Why:** both produce the same wrong conclusion from opposite directions - one calls a
half-finished run green, the other calls a healthy suite broken. The first merges something
unverified; the second sends you debugging a test that has nothing wrong with it.

**How to apply:** never read exit status alone from a watch - read the settled list of checks.
Run `verify` and `e2e` one after another, not beside each other. When an unrelated browser test
fails, re-run it by itself before believing it, the way
[[layout-perf-test-flakes-on-ci]] says for the CI-side version of the same trap.
