## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix), recorded as a `Status:` line in each issue file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Agent workflow

- **Never push.** No remote writes of any kind: no `git push`, tags, force-pushes or `gh pr create`. Local branches, commits and stashes are fine.
- **Commit only on explicit approval.** After every change, show a diff summary and the proposed commit message, then wait. Each commit needs its own approval, including doc-only changes.
- **Ticket lifecycle.** Set `Status: claimed` before starting a ticket, and `Status: done` only after the user approves and the commit is made. See `docs/agents/issue-tracker.md`.
- **Ticket shorthand.** `feature-name/01` means `.scratch/feature-name/issues/01-*.md`. See `docs/agents/issue-tracker.md`.
