---
name: astro-island-retries-its-import
description: An Astro island whose component chunk fails to load retries a second later with an `?astro-retry=` query, so blocking the chunk by a file-name glob in Playwright does not stop it hydrating.
metadata:
  type: project
---

The island runtime (`importWithRetry` in the inline `astro-island` script) catches a failed
`import()` of the component, waits 1000ms, and imports it again from the same URL with
`?astro-retry=<timestamp>` appended. A Playwright route of `**/_astro/Theater*.js` matches only
the first request: the retry carries a query and goes through, and the island hydrates about a
second after load.

**Why:** the homepage theater's e2e test "shows the final frame by itself when the island never
arrives" passed with the fallback it was written for deleted (T-099, mutation E6). The island had
hydrated on the retry and taken the `theater-pending` class away itself, so the test proved
nothing about the page's own fallback. Only the mutation check found it.

**How to apply:** to keep an island from hydrating in a test, match the request by pathname -
`page.route((url) => url.pathname.includes('/_astro/Theater.'), ...)` - not by a glob on the
file name. And remember the retry in the product too: an island on a flaky network hydrates a
second late rather than not at all.

Related: [[a-watch-can-report-green-early]], [[hero-island-is-the-static-frame]].
