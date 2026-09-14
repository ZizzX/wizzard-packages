---
title: persist-write-failed
description: Storage refused a write, so the persist plugin stops saving for the rest of the session.
---

```
[wizzard] The wizard could not be saved. storage refused the write (<error>). free some space, or
pass a storage of your own; this session will not survive a reload. …/errors/persist-write-failed
```

A warning from `persist()` in `@wizzard-packages/plugins/persist`, printed with `console.warn`
once for the life of the plugin. `setItem` threw while the plugin was flushing a commit, and
`<error>` carries the error's name and message.

The usual cause is a full quota (`QuotaExceededError`): a flow that collects a lot of data, or an
origin whose storage other code has already filled. A browser that allows reads and refuses
writes produces the same message.

After the first refused write the plugin stops writing for the rest of the session rather than
failing on every commit. The wizard is not interrupted: the navigation that committed has
already happened, and it stays successful. What is lost is the ability to come back after a
reload, which is what the message says.

The fix is room in the storage, or a storage of your own passed as `storage`. A flow that holds
large values, such as uploaded file contents, is better off storing a reference to them than the
values themselves.
