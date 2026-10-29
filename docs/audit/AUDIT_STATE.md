# Audit ledger

Read this first at the start of every session and resume from **Next step**.

- **Mode:** Full Audit
- **Started:** 2026-10-29
- **Branch:** `audit/human-grade-2026-10-29` (local only, not pushed)
- **Safety tag:** `pre-audit-2026-10-29` (points at `d03c278`, the last commit on `main` before the audit)
- **Return to the starting point:** `git switch main` (main is untouched by the audit). To inspect the exact pre-audit state: `git checkout pre-audit-2026-10-29`.
- **Current phase:** 7 complete, waiting at **Gate 3**
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

| Gate 2 | Owner answers recorded in PROJECT_PROFILE.md. Later in the session the owner changed the direction to green (MyEasyAgents colours), cartoonish, cyberpunk pixel art, with a CAN oscilloscope on the home page. |
| Security | Client-side gate removed; private guides behind Vercel Routing Middleware (`middleware.js`, env `GUIDES_PASSWORD`); excluded from lists, feeds, search, sitemap. Password hash and plain-text comment removed from hugo.toml. Middleware not testable locally: UNVERIFIED until a Vercel preview. |
| Content | Two sample products set to draft (owner: not real stock). |
| 6 Foundation | One stylesheet `assets/css/alltech.css`, own baseof/head/header/footer, fonts self-hosted, green logo and favicons, old CSS and favicon photo deleted. |
| 7 Reference screen | Home rebuilt (green, pixel type, CAN scope from tools/can_scope.py), search page, NEPA bulb. Lighthouse in baseline/lighthouse-after-phase7.md. |

## Next step

Wait for Gate 3 approval of the home page. Then Phase 8 rollout in this order: Parts (shop list + product template with "Price on request", no warranty), AllTech hub (remove mechanic photo and slogans), Database lists and entries (breadcrumbs, emoji out, tables, hide pinout placeholder), Guides, Writing (posts list with title filter, post template with byline), Books (fix "Untitled" Deep Work note), About (optimise avatar), Colophon (fonts and bulb text), tags, 404. Then delete the temporary aliases block in alltech.css and the old shop/alltech templates.

## Open questions for the owner

1. Approve, change or reject the direction (danfo yellow + ink, Archivo + Source Serif 4, square corners, no shadows).
2. Trading name: "AllTech" or "Alltech Solutions"?
3. Buyer contact: WhatsApp number? Real email address?
4. Shop: are the two products real stock? Currency, and show prices or "Price on request"? Are the 30-day warranty and included EWS alignment real?
5. Home: may `/` become the AllTech landing page (all other URLs unchanged)?
6. Search: built-in (recommended, no new tool) or Pagefind?
7. Password gate: make the two guides public, remove them, or move to real access control? Change the password either way.
8. Rights to the manuals the database cites; licence of the mechanic hero photo.
9. Build the "Up NEPA!" bulb toggle, or drop it from the colophon?

## Blocked items

- Checks against the live site contact production; ask before running.
