# Alltech Solutions site audit

Audit and rebuild of the Hugo site in this repository (formerly MindOnChain, live at mind-on-chain.vercel.app), 2026-10-29. All work is on the local branch `audit/human-grade-2026-10-29`; nothing has been pushed or deployed.

## 1. Plain summary

The site started as a MindOnChain blog with a template-looking AllTech section: a 3.9 MB photo as the favicon on every page, a light mode that didn't work, a shop that hid its own facts, and "password-protected" guides anyone could read. It is now Alltech Solutions: a green, cartoonish, pixel-art workshop site with a real CAN bus oscilloscope on the home page, a free searchable ECU database, an honest parts page, a separate blog by Ubanatu Chinaza Emmanuel, and locked ECU writing that only opens with a code the owner approves. Every page weighs 148 to 331 KB instead of 4.4 to 7.4 MB, and every measured page scores 100 for accessibility.

## 2. Project profile

`PROJECT_PROFILE.md`, with the owner's answers from both gates.

## 3. Surfaces and modules

Public site (U1 to U7, W1 to W3), locked writing (U2), owner docs (U6), marketing artboards (copy rules only).

## 4. Baseline

`baseline/routes-before.txt` (120 routes), `baseline/lighthouse-before.md`, screenshots in `screenshots/before/` (local only).

## 5. Inventories

Kept from the first pass; the current structure is described in `README.md`.

## 6. Findings

48 findings in `FINDINGS.csv`, all DONE and checked. Copy changes in `COPY_REVIEW.csv` (28 rows).

## 7. Scores, before and after

0 = no sign, 3 = obvious at a glance.

| Category | Home | AllTech | DB entry | Parts | Post | About | Code |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Visual template (T2, T9, T13) | 2 → 0 | 3 → 0 | 1 → 0 | 2 → 0 | 1 → 0 | 1 → 0 | n/a |
| Copy (T7, T16) | 2 → 0 | 3 → 0 | 1 → 0 | 2 → 0 | 0 → 0 | 1 → 0 | n/a |
| Spacing (T11) | 2 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | n/a |
| Colour (T12) | 3 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | n/a |
| Components (T3, T15) | 2 → 0 | 3 → 0 | 1 → 0 | 2 → 0 | 1 → 0 | 1 → 0 | 2 → 0 |
| Navigation (U5) | 2 → 0 | 2 → 0 | 2 → 0 | 3 → 0 | 1 → 0 | 2 → 0 | n/a |
| Code (T1, T6, T8) | n/a | n/a | n/a | n/a | n/a | n/a | 2 → 1 |
| Domain fit (T5) | 2 → 0 | 3 → 0 | 1 → 0 | 3 → 0 | 0 → 0 | 0 → 0 | n/a |
| Robustness (T4, U1) | 1 → 0 | 2 → 0 | 1 → 0 | 2 → 0 | 1 → 0 | 0 → 0 | 1 → 0 |
| Performance (W1) | 3 → 0 | 3 → 0 | 3 → 0 | 3 → 0 | 3 → 0 | 3 → 0 | n/a |
| Accessibility (U3) | 3 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | 2 → 0 | n/a |
| Security (U2) | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 | 3 → 1 |

Why two scores stay at 1:
- **Code, 1:** the hello-friend-ng theme is still vendored in `themes/`. Its CSS and JS no longer load, but Hugo still uses it for a few fallback templates and copies its static files (old theme favicons, Inter fonts) into the build. Removing it is safe but touches the build, so it is a proposal (section 11).
- **Security, 1:** the locked-writing code passes 15 local checks but has not yet run on Vercel, and the old password is still in git history (it is no longer used by anything).

Measured (`baseline/lighthouse-final.md`): performance 93 to 100, accessibility 100, best practices 100, SEO 100 on all nine page types; weight 148 to 331 KB (was 4,384 to 7,429 KB). Sweep of all 124 pages at 375 and 640 px (200% zoom): no sideways scrolling, no script errors, one `<main>` and one `<h1>` each. No broken internal links (2,630 checked). No banned phrases in the built text. No emoji.

## 8. Domain gaps closed

Naira and price: "Price on request" (owner). Buyer contact: one WhatsApp route per screen plus the footer, prefilled with the part or entry. Product facts shown. Search by part number with or without spaces and dots. Lagos specifics: Ladipo sourcing steps, tokunbo in the archetype, the danfo-era "Ladipo! Ladipo!" call, "Up NEPA!".

## 9. Dependency report

No packages. Hugo (local 0.154.5, Vercel pins 0.151.1). Self-hosted SIL OFL fonts. Resend (email) and Vercel Functions/Middleware for locked writing. Google Fonts and the theme's 168 KB JS bundle are gone.

## 10. Data exposure

Locked text appears only in its own two pages, which middleware.js guards; it is in no feed, tag feed, search index or sitemap (checked by phrase search across the whole build). The password hash and its plain-text comment are gone from hugo.toml.

## 11. Proposals awaiting approval

- **P-07 Remove the vendored theme.** Replace the last fallback templates (taxonomy feeds already use ours), drop `theme = "hello-friend-ng"`, delete `themes/`. Removes stray files from every build. Risk: low; check with a full route diff.
- **P-08 Own domain.** `mind-on-chain.vercel.app` carries the old name on every flyer. A domain like alltechsolutions.ng would need buying, DNS on Vercel, and a redirect from the old address.
- **P-09 Delete unused large files** after you confirm: `static/images/Avatar.png` (2.9 MB, replaced by a 13 KB copy), `static/docs/sample-manual.pdf` (not linked anywhere).
- **P-10 Independent review.** Hand the Phase 10 checklists to a fresh reviewer who hasn't seen the work (skill rule A11). This review was done by the same agent that made the changes.

## 12. Change log (plain language)

| Commit | What it did | How to check |
| --- | --- | --- |
| 367ea8f | Audit documents | `docs/audit/` |
| 86b33c5 | Private guides protected on the server, not hidden in the page | Open a locked guide on a Vercel preview |
| 3cd1e4a | Sample products unpublished | `/alltech/shop/` shows the honest empty state |
| b84ba4e | New base, header, footer, search, NEPA bulb, favicon (yellow; tag `alltech-yellow-2026-10-29`) | `git checkout alltech-yellow-2026-10-29` |
| 8eb0efe | Green cyberpunk home with the CAN oscilloscope | `/` |
| 96717a7 | Blog with its own home; locked writing with owner-approved codes | `/blog/`, `/locked/` |
| 6463fd1 | Flyers and the CAN bus carousel; admin guide for locked writing | `marketing/png/` |
| df76c64 | Database, guides, parts and hub rebuilt; NEPA motion graphic; simpler blog home | `/alltech/database/`, the bulb |
| f17df57 | README, admin guide, logo set, second carousel | `README.md`, `marketing/` |

## 13. Verified architecture notes

- Sections take their templates from their folder unless front matter sets `type`; `content/alltech/shop/_index.md` sets `type: shop`, the database sets `type: database` by cascade.
- Locked pages use `build.list: local`, so they are listed by title inside their section but never in site-wide collections, feeds or search. Every feed uses `layouts/_default/rss.xml` (and the identical `layouts/posts/rss.xml`, which exists only to beat the theme's posts feed), which drops `private: true` pages.
- `middleware.js` matches `/blog/locked/*` plus two database guide addresses; tokens are HMAC-signed with `ACCESS_SECRET`, so no database is needed.
- The oscilloscope is generated: edit `tools/can_scope.py`, then regenerate `layouts/partials/can-scope.html`.

## 14. Glossary

- **Token:** a named design value (`--brand`, `--s-4`) used everywhere instead of a raw number.
- **LCP:** time until the largest thing on screen appears. **CLS:** how much the page jumps while loading.
- **Middleware:** code Vercel runs before sending a page; here it checks the access session.
- **HMAC signature:** a seal computed with a secret; changing a token breaks the seal.
- **Bit stuffing:** CAN inserts an opposite bit after five equal bits so receivers stay in sync; the scope trace includes them.

## 15. Unknowns and how to verify them

- **Middleware and `/api/access/*` on Vercel:** logic VERIFIED locally (15 checks); deployment UNVERIFIED. Verify on a preview deployment as in ADMIN_GUIDE section 3, "Check it works".
- **Hugo 0.151.1 (Vercel) vs 0.154.5 (tested):** UNVERIFIED on 0.151.1. The Vercel preview build log will show any template error.
- **Resend sending from onboarding@resend.dev to the account owner without a domain:** per Resend's free-plan rules; verify with the first real request.
- **Dark mode:** colours VERIFIED by contrast calculation and screenshots; Lighthouse runs were in light mode.

## 16. Decisions only you can make

1. Approve P-07 to P-10.
2. Create the Resend account and set `ACCESS_SECRET` and `RESEND_API_KEY` on Vercel.
3. When ready, merge `audit/human-grade-2026-10-29` into `main` to deploy.

## 17. Next steps

1. Push the branch and open it as a Vercel preview (`git push -u origin audit/human-grade-2026-10-29`; Vercel builds previews for branches automatically if Git integration is on).
2. Set the two environment variables, redeploy the preview, and run the locked-writing check.
3. Click through the preview on your phone, then merge to `main`.
