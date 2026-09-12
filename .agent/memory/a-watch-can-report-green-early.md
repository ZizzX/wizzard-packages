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

What the command does say, and what to read instead of "it finished": `gh pr checks` exits **8**
while any check is still pending (`gh pr checks --help`, "Additional exit codes", confirmed on
2.98). So the answer is the exit code of a plain call, not the end of a watch.

```bash
for i in $(seq 1 60); do
  out=$(gh pr checks <n> 2>&1)
  status=$?
  # 8 is running. Exit 1 with "no checks reported" is the window after a push
  # where the checks do not exist yet, and it carries the same code as a failure.
  if [ "$status" -eq 8 ] || echo "$out" | grep -q 'no checks reported'; then
    sleep 20
    continue
  fi
  echo "$out"
  exit "$status"
done
echo "checks never settled"
exit 2
```

There are three states, not two, and the third is what makes this harder than it looks. Between
the push and the checks being registered, the command prints
`no checks reported on the '<branch>' branch` and exits **1** - the same code a failed run gives.
A loop waiting only on 8 leaves in the first twenty seconds and calls that settled; a caller
reading 1 as "the checks failed" is wrong the other way. Wait for the checks to exist before
waiting for them to finish, and tell that state apart by the message, since the code cannot.

The last two lines matter as much. A loop that runs out of iterations and falls through returns
whatever the final `sleep` returned, which is zero - the same false green, rebuilt by the thing
written to avoid it. Every bounded wait needs an explicit failure at the bound.

This note was wrong twice before it was right, both times in the direction of reporting success:
first the fall-through, then the missing third state. That is the shape of the mistake worth
remembering, more than the commands.

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
