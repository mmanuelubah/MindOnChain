# Audit ledger

Read this first at the start of every session and resume from **Next step**.

- **Mode:** Full Audit
- **Started:** 2026-10-29
- **Branch:** `audit/human-grade-2026-10-29` (local only, not pushed)
- **Safety tag:** `pre-audit-2026-10-29` (points at `d03c278`, the last commit on `main` before the audit)
- **Return to the starting point:** `git switch main` (main is untouched by the audit). To inspect the exact pre-audit state: `git checkout pre-audit-2026-10-29`.
- **Current phase:** released. On 2026-10-29 the owner set ACCESS_SECRET and RESEND_API_KEY on Vercel and asked to go live; `main` was fast-forwarded to `3bad2a8` and Vercel's production deployment succeeded.
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

## Live checks after release (2026-10-29)

Locked guide, its index.html and /blog/locked/* redirect (302) to /locked/; /api/access/request returns the field error for a bad email (so both Vercel variables are set); verify without a request returns 409; a forged approval link returns 400; 18 public pages, feeds, sitemap and search return 200; unknown pages 404; no locked text in live feeds or search. Note: alltech.vercel.app belongs to someone else, so the project rename cannot use it.

## Round 2 (2026-11-07): images, silent killers, SEO/AEO/GEO

- **Branch:** `audit/seo-images-2026-11-07`; **tag:** `pre-audit-2026-11-07` (= main `5e122c8`, the live site).
- Owner asked for: images from Google Drive or the laptop; bugs and silent site-killers; SEO, AEO and GEO on the level of myeasyagents.com; a guide to running the site, writing and sharing to Medium and LinkedIn. Taken as approval for the fixes; release (merge to main) still needs the owner's yes.
- Done: baseline of both sites' robots, sitemap, llms.txt, headers and JSON-LD; findings R2-01 to R2-16 in FINDINGS.csv.

- Done: R2-01 to R2-16 (R2-09 won't fix, reason in FINDINGS.csv). Commits b4e61ef, 5f49cc0, 6688b8e, cfe9d7a, e031195 on the branch.
- Verified locally: 124 routes at 375/640 px under the production headers (no CSP blocks, no JS errors), JSON-LD valid on all 124 pages, 2,913 internal links with 0 broken, no locked text in any public output, access tests 15/15, Lighthouse SEO/accessibility/best practices 100 on six page types (baseline/lighthouse-round2.md).
- Not verifiable locally: Hugo 0.151.1 and whether Vercel's Hugo is the extended edition (images fall back to JPEG/PNG if not); Drive thumbnails with a real public file; IndexNow acceptance (first run after merge).

## Next step

Owner: approve the release (merge `audit/seo-images-2026-11-07` into `main`). Then set up Google Search Console and Bing Webmaster Tools (ADMIN_GUIDE section 9) and paste the two verification codes into hugo.toml.

## Open questions for the owner

See AUDIT_MASTER.md section 16.

## Blocked items

- Checks against the live site contact production; ask before running.
