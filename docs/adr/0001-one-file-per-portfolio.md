# One file per Portfolio, not a README table

Portfolios live as one YAML file each in `portfolios/` at the repo root, validated by a schema; the README table is generated from them by CI after merge and is never edited by hand. The README table used to be the source of truth, but every contributor appending a row to the same table caused merge conflicts, parsing markdown was fragile (bad rows vanished silently), and it couldn't be validated before merge. A single new file can be added from GitHub's web UI without cloning, is checked on the PR, and never conflicts with other contributions.

## Consequences

- Contributors must not edit the README table; CI overwrites it.
- The `added` date is written into the file by the post-merge bot, not by contributors, so the site can sort newest first without git history.
