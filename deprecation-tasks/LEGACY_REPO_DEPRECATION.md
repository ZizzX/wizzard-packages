# Legacy Repo Deprecation Checklist

This file lists the exact steps to apply in the legacy repository
`wizzard-stepper-react`. Follow in order.

## 1) Update README with a prominent deprecation banner
- Add a top-level notice that the legacy package is deprecated.
- Point users to the new repo: `https://github.com/ZizzX/wizzard-packages`.
- Point users to the new scoped packages: `@wizzard-packages/*`.
- State explicitly: "legacy stays on v2.x for critical fixes only."

Suggested banner text:
```
> DEPRECATED: `wizzard-stepper-react` is legacy-only. New work and releases live in
> https://github.com/ZizzX/wizzard-packages and use @wizzard-packages/*.
> Legacy remains on v2.x for critical fixes only.
```

## 2) Update MIGRATION.md (or add one if missing)
- Add a section at the top: "Migrating to @wizzard-packages/*".
- Include install commands:
  - `pnpm add @wizzard-packages/react @wizzard-packages/core`
  - `pnpm add @wizzard-packages/adapter-zod @wizzard-packages/adapter-yup @wizzard-packages/persistence @wizzard-packages/middleware`
- Add import mapping examples (old -> new).
- Clarify that any v1.x/v2.x upgrade notes apply to legacy only.

## 3) Deprecate the npm package
- Run this once with a clear message:
```
npm deprecate wizzard-stepper-react@"<range>" "Deprecated: use @wizzard-packages/react (repo: https://github.com/ZizzX/wizzard-packages). Legacy stays on v2.x for critical fixes only."
```
Notes:
- Choose `<range>` as appropriate (e.g., "*" or ">=2.0.0").
- This does not delete the package; it just shows a warning to users.

## 4) Update GitHub repo metadata
- GitHub "About" description: mention deprecation and new repo link.
- Homepage URL: point to `https://github.com/ZizzX/wizzard-packages`.
- Topics: add `deprecated`, `legacy`, `wizzard-packages`.
- Update README badges/links to point to the new repo/npm scope.

## 5) Freeze releases / set expectations
- Add a short note in README (or CHANGELOG) that only critical fixes are accepted.
- If you use branch protection, consider a "legacy" release branch if needed.

## 6) Optional: issue templates / PR templates
- Update any templates to remind contributors the repo is legacy-only.
- Link to the new repo for feature work.

## 7) Verify
- README shows deprecation banner.
- MIGRATION instructions point to `@wizzard-packages/*`.
- npm deprecation warning shows on install.
- GitHub metadata updated.

