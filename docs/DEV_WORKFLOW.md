# Development Workflow

This repo uses a `dev` branch for integration and a `main` branch for releases.

## Flow

1. Create feature branches from `dev`.
2. Open PRs into `dev` and let CI validate changes.
3. Promote `dev` to `main` when ready to release.
4. Releases and publishes run from `main` only.

## Notes

- CI runs on pushes and PRs targeting `dev` and `main`.
- Publishing workflows are restricted to `main`.
