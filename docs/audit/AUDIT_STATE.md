# Audit ledger

Read this first at the start of every session and resume from **Next step**.

- **Mode:** Full Audit
- **Started:** 2026-10-29
- **Branch:** `audit/human-grade-2026-10-29` (local only, not pushed)
- **Safety tag:** `pre-audit-2026-10-29` (points at `d03c278`, the last commit on `main` before the audit)
- **Return to the starting point:** `git switch main` (main is untouched by the audit). To inspect the exact pre-audit state: `git checkout pre-audit-2026-10-29`.
- **Current phase:** 10 complete, at **Gate 4** (final report). Never release from here: the owner merges.
- **Restore points:** `pre-audit-2026-10-29` (original site), `alltech-yellow-2026-10-29` (yellow version of the new home).

## Owner direction received (2026-10-29)

AllTech is the main site; blog byline Ubanatu Chinaza Emmanuel; Vox-style design (principles only); comfortable small-marketplace use; site search; inclusive and accessible. Taken as approval to pass Gate 1 into design direction. Recorded in PROJECT_PROFILE.md.

## Completed steps

| Step | Result |
| --- | --- |
| 0.1 Version control | `main` clean, up to date with `origin`. 57 commits. Ignored local folders: `public/`, `resources/`, `data/` (32 MB OCR output). |
| 0.2 Project profile | `PROJECT_PROFILE.md`, updated with owner direction. 5 open questions. |
| 0.3 Surfaces | Public site (home, AllTech, database, guides, shop, posts, books, about, colophon, tags); gated guides; owner docs. |
| 0.4 Safety branch and tag | Created. |
| 0.5 Real commands | `hugo --gc --minify`; 200 pages, 0 warnings. Local Hugo 0.154.5, Vercel 0.151.1. No tests. |
| 0.6 Baseline | 120 routes; 81 screenshots; Lighthouse on 6 pages. |
| 1 Inventory | AUDIT_MASTER.md section 5; LINKS.csv (2,847 links). |
| 2 Tells, 3 Modules | 48 findings in FINDINGS.csv (5 critical). |
| 4 Scores and report | AUDIT_MASTER.md sections 6 to 17. |
| 5 Design and voice direction | DESIGN_SYSTEM.md, style-tile.html (Lighthouse accessibility 100, no overflow at 375/768/1280), COPY_REVIEW.csv (26 rows), ASSET_CREDITS.md. |
| Gate 2 | Owner answers recorded in PROJECT_PROFILE.md. Later in the session the owner changed the direction to green (MYEASYAGENT colours), cartoonish, cyberpunk pixel art, with a CAN oscilloscope on the home page. |
| Security | Client-side gate removed; private guides behind Vercel Routing Middleware (`middleware.js`, env `GUIDES_PASSWORD`); excluded from lists, feeds, search, sitemap. Password hash and plain-text comment removed from hugo.toml. Middleware not testable locally: UNVERIFIED until a Vercel preview. |
| Content | Two sample products set to draft (owner: not real stock). |
| 6 Foundation | One stylesheet `assets/css/alltech.css`, own baseof/head/header/footer, fonts self-hosted, green logo and favicons, old CSS and favicon photo deleted. |
| 7 Reference screen | Home rebuilt (green, pixel type, CAN scope from tools/can_scope.py), search page, NEPA bulb. Lighthouse in baseline/lighthouse-after-phase7.md. |

| Gate 3 | Owner approved the green design; asked for the blog, locked writing, flyers, MYEASYAGENT in caps, NEPA motion graphic without sound. |
| 8 Rollout | Blog (home, posts, roundups, ECU programming, bookshelf, about), locked writing (middleware + api, 15 checks), database, guides, parts, hub, generic, 404. |
| 9 Cleanup | Old partials, aliases, mechanic photo, unused params removed; README; admin guide rewritten. |
| 10 Review | Self-review (no independent reviewer requested). 124 routes swept, links, leaks, banned phrases, Lighthouse in baseline/lighthouse-final.md. Re-score in AUDIT_MASTER.md section 7. |

## Next step

Owner: set ACCESS_SECRET and RESEND_API_KEY on Vercel, test on a preview, merge. Proposals P-07 to P-10 in AUDIT_MASTER.md section 11 wait for approval.

## Open questions for the owner

See AUDIT_MASTER.md section 16.

## Blocked items

- Checks against the live site contact production; ask before running.
