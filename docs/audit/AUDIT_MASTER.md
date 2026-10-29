# AllTech site audit

Audit of the Hugo site in this repository (today branded MindOnChain, live at mind-on-chain.vercel.app), started 2026-10-29. The ledger is `AUDIT_STATE.md`; every finding with evidence is in `FINDINGS.csv`.

## 1. Plain summary

The site has real, specific knowledge in it: workshop procedures for EWS4, MS43 and ME7.5 modules that only a working locksmith would write, and an About page with a voice of its own. Around that, most of the interface is template filler: a generic "Your Vehicle. Our Expertise." hero, invisible scroll-in sections, a shop that hides its own prices and part numbers, and a light mode that does not work. Two things are serious: every page downloads a 3.9 MB photo as its browser-tab icon, and the "password-protected" guides can be read by anyone without the password. Nothing on the live site has been changed by this audit.

## 2. Project profile

See `PROJECT_PROFILE.md`. In short: AllTech, Emmanuel's automotive locksmith and ECU business in Lagos, becomes the main brand; the blog stays as a section with the byline Ubanatu Chinaza Emmanuel. Users are technicians looking up procedures and buyers looking for a part, mostly on phones on mobile data. Design direction: Vox-style editorial principles (not Vox's assets), comfortable marketplace use, site search, WCAG 2.2 AA.

## 3. Surfaces and modules

| Surface | Modules run |
| --- | --- |
| Public site: home, AllTech, database (71 entries), guides (3), shop (2 items), posts (1), books (4), About, Colophon, tags | Universal U1 to U7, W1 to W3 |
| Password-gated guides (2) | U2 |
| Owner docs: ADMIN_GUIDE.md, Obsidian templates, archetypes | U6, T7 |

No app, API, bot, email or map. W4 not applicable.

## 4. Baseline

- Build: `hugo --gc --minify` (from `vercel.json`), 200 pages, 0 warnings. No tests exist.
- Routes: 120, listed in `baseline/routes-before.txt`.
- Screenshots: `screenshots/before/`, 17 pages in dark at 375, 768 and 1280 px, 10 in light.
- Lighthouse mobile (throttled): `baseline/lighthouse-before.md`. Performance 55 to 82, accessibility 93 to 96, page weight 4.4 to 7.4 MB, worst LCP 18.8 s (About).

## 5. Inventories

**Routes and templates.** Home `layouts/index.html` (971 lines, mostly inline CSS). AllTech `layouts/alltech/list.html` (1,308 lines). Database lists `layouts/database/list.html`. Entries, guides and shop items fall through to `layouts/_default/single.html`. Posts `layouts/posts/single.html`. Books, About, Colophon, tags have their own or theme templates. `layouts/shop/list.html` and `layouts/shop/single.html` (568 lines) never render.

**Shared structure.** One header (`partials/header.html`), one footer (`partials/footer.html`, inline styles), one back button partial, theme toggle from the vendored theme's JS bundle.

**Styling.** Theme SCSS (compiled), then four stylesheets: `fonts.css` (31 KiB base64 Inter), `tokens.css`, `design-system.css`, `custom.css`, plus 9 `<style>` blocks inside templates. Counts: 149 colours, 14 radii, 25 shadows, 59 font sizes, 238 spacing values, 12 breakpoints, 62 `!important`.

**Dependencies.** Hugo only. Theme hello-friend-ng vendored. Google Fonts (Inter, VT323). No analytics configured.

**Assets.** `EmmanuelOriginalNew.jpeg` 3.9 MB (favicon), `Avatar.png` 2.9 MB, `alltech-mechanic-bg.png` 833 KiB (AllTech hero), `IMG_4493.jpeg` (share image), `docs/sample-manual.pdf`. Licence of the hero photo unknown.

**Copy.** Reviewed every string on home, AllTech, a database entry, a product page, About and Colophon; proposed rewrites in `COPY_REVIEW.csv`.

**Navigation.** 2,847 links on 121 pages in `LINKS.csv`. One broken internal link. Social URLs hard-coded in two places. No contact route for buyers.

**Forms.** One: the password gate (field `moc-pw-input`, client-side SHA-256 compare). No contact or order form.

**Integrations.** Google Fonts; external images by convention from Google Drive and Pinterest (ADMIN_GUIDE). No key names in the repo other than the gate hash.

**Data exposure.** Gated content readable without the password (U2-002). Password in a public comment (U2-001). No other private data found in built HTML.

**Versions.** Hugo 0.154.5 locally, 0.151.1 pinned on Vercel. Hosting Vercel, deploy on push (assumed from `vercel.json`; verify in the Vercel dashboard).

## 6. Findings

48 findings in `FINDINGS.csv`. Critical: U2-001, U2-002, W1-001, U3-001, T5-001.

## 7. Scores (before)

0 = no sign, 3 = obvious at a glance.

| Category | Home | AllTech | DB entry | Product | Post | About | Code |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Visual template (T2, T9, T13) | 2 | 3 | 1 | 2 | 1 | 1 | n/a |
| Copy (T7, T16) | 2 | 3 | 1 | 2 | 0 | 1 | n/a |
| Spacing (T11) | 2 | 2 | 2 | 2 | 2 | 2 | n/a |
| Colour (T12) | 3 | 2 | 2 | 2 | 2 | 2 | n/a |
| Components (T3, T15) | 2 | 3 | 1 | 2 | 1 | 1 | 2 |
| Navigation (U5) | 2 | 2 | 2 | 3 | 1 | 2 | n/a |
| Code (T1, T6, T8) | n/a | n/a | n/a | n/a | n/a | n/a | 2 |
| Domain fit (T5) | 2 | 3 | 1 | 3 | 0 | 0 | n/a |
| Robustness (T4, U1) | 1 | 2 | 1 | 2 | 1 | 0 | 1 |
| Performance (W1) | 3 | 3 | 3 | 3 | 3 | 3 | n/a |
| Accessibility (U3) | 3 | 2 | 2 | 2 | 2 | 2 | n/a |
| Security (U2) | 0 | 0 | 0 | 0 | 0 | 0 | 3 |

Evidence: Visual and copy on AllTech: T13-001, T7-001. Colour on Home: U3-001 (broken light mode). Navigation on Product: T5-004 (no way to ask). Performance everywhere: W1-001. Security: U2-001, U2-002.

## 8. Domain gaps

- No currency on prices; no Naira (T5-002).
- No buyer contact route; no WhatsApp although the copy promises it (T5-004).
- Product facts (condition, compatibility, OEM number) hidden (T5-001).
- No search by part number (T5-005).
- "Tokunbo" is in the archetype but never shown to buyers.
- Words a Lagos buyer worries about (is it tested, will it start the car, can I see it first) are answered only by unverified slogans (B8-001).

## 9. Dependency report

| Item | Used for | Verdict |
| --- | --- | --- |
| hello-friend-ng theme | Base SCSS, JS bundle (168 KiB) for the toggle, baseof | Most of its output is overridden. Keep the base template for now; propose dropping its CSS and JS in Phase 9. |
| Google Fonts (Inter, VT323) | Body and pixel labels | Duplicated by two other font routes (W1-003). |
| Self-hosted Inter woff2 (theme) | Body | Duplicate. |

## 10. Data exposure results

U2-001 and U2-002, both VERIFIED. Nothing else found in built HTML, inline JSON or data attributes.

## 11. Proposals awaiting approval

- **P-01 Brand switch.** Site title, header wordmark, footer, meta, share image and favicon become AllTech. Blog pages carry the byline "Ubanatu Chinaza Emmanuel". Domain unchanged.
- **P-02 Home page.** `/` becomes the AllTech landing page. `/posts/`, `/books/`, `/about/` and `/colophon/` keep their URLs. `/alltech/` keeps working; whether it stays a page or redirects to `/` is your choice (redirect needs one line in `vercel.json`).
- **P-03 Search.** Recommended: a built-in search page. Hugo writes a small index file at build time and about 60 lines of plain JavaScript search it. No new tool, no change to the Vercel build. Alternative: Pagefind (better ranking and highlighting, but it adds a Node step to the Vercel build).
- **P-04 Product page.** A real product template for `/alltech/shop/` showing name, price (when you approve one), condition, what it fits, OEM number, SKU, stock, photos, and one "Ask about this part" button. Front matter keys unchanged.
- **P-05 Password gate.** Options in U2-002. Until you choose, nothing changes.
- **P-06 Light and dark.** System setting by default, with a working switch. Optional: build the "Up NEPA!" bulb from the colophon.

## 12. Change log

No product files changed yet. Audit documents only, on branch `audit/human-grade-2026-10-29`.

## 13. Verified architecture notes

- A section's layout comes from its folder: everything under `content/alltech/` uses type `alltech` unless front matter sets `type`. This is why `layouts/shop/` never runs. The database sets `type: database` through `cascade`.
- Gated pages: `private: true` plus `password_id` matching a key in `[params.passwords]`.
- `writeStats = true` writes `hugo_stats.json` into the repo root on every build.

## 14. Glossary

- **Route:** a page address on the site, such as `/alltech/shop/`.
- **Token:** a named design value, such as `--space-4: 16px`, used everywhere instead of typing the number.
- **LCP (Largest Contentful Paint):** how long until the biggest thing on screen appears. Under 2.5 s is good. About is 18.8 s today.
- **CLS (Cumulative Layout Shift):** how much the page jumps while loading. Under 0.1 is good; shop is 0.31.
- **Base64:** a way to write any data as letters. It is not encryption; anyone can turn it back.
- **Contrast ratio:** how distinct text is from its background. WCAG AA needs 4.5:1 for body text.
- **Front matter:** the settings block at the top of each Markdown file between `---` lines.

## 15. Unknowns and how to verify them

- Whether Vercel deploys on every push to `main`: Vercel dashboard, Project, Settings, Git.
- Whether the GitHub repo is public: open github.com/mmanuelubah/MindOnChain in a private browser window.
- Whether the two products are real stock, and their currency.
- Rights to the manuals cited as sources.
- Licence of `alltech-mechanic-bg.png`.

## 16. Decisions only you can make

Listed in the Gate 2 message and in `PROJECT_PROFILE.md`, "Open questions".

## 17. Next steps

Gate 2: approve, change or reject the design direction in `DESIGN_SYSTEM.md` and `style-tile.html`, and answer the open questions. Phase 6 (tokens) starts only after that.
