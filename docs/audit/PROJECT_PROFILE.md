# Project profile

Source of truth for brand, scope and owner decisions during the audit. Items marked **OWNER** were stated by the owner on 2026-10-29. Items marked **VERIFIED** are proven by the repository. Items marked **ASSUMPTION** are unconfirmed.

## 1. Product and users

- **What it is.** A Hugo static site with two parts. AllTech is an automotive locksmith and ECU business in Lagos: an ECU/immobiliser database, workshop guides and a small parts shop sourced through Ladipo Market. The blog is Emmanuel's writing: posts, book notes, About and Colophon. VERIFIED (content folders).
- **Main site.** AllTech is the main site. The blog is a section of it, not a separate brand. OWNER.
- **Primary users.** Auto technicians and locksmiths looking up ECU pinouts, EEPROM locations and programming procedures; car owners and mechanics buying an ECU, engine or module. ASSUMPTION from content.
- **Secondary users.** Readers of Emmanuel's posts and book notes; people checking him out before working with him. ASSUMPTION.
- **Devices and connections.** Mostly mid-range Android phones on paid mobile data in Nigeria, often in a workshop. ASSUMPTION; drives the performance budget.
- **Secondary audiences.** Search engines (people search part numbers like "EWS4 2L86D"), link previews in WhatsApp and X.

## 2. The owner

- Ubanatu Chinaza Emmanuel. Automobile locksmith and technician, runs his own business, co-founder of MYEASYAGENT. VERIFIED (about page).
- Writes in Obsidian and commits Markdown; does not write code often (colophon). Wants plain explanations. VERIFIED.
- Prefers consolidated documents (ADMIN_GUIDE.md) and a "zero-emoji" policy. VERIFIED.

## 3. Brand rules

- **Public brand:** Alltech Solutions (owner, Gate 2). Short form "Alltech" in running text.
- **Blog author byline:** Ubanatu Chinaza Emmanuel. OWNER.
- **MindOnChain:** retired as the public brand. It survives only in the repository name and the Vercel domain `mind-on-chain.vercel.app`, which is a contract and does not change without approval. OWNER + VERIFIED.
- **Location line:** Lagos, Nigeria. VERIFIED (footer).

## 4. Visual identity

- Current state: dark default, neutral greys, Inter body, VT323 pixel font for labels. VERIFIED.
- New direction: Vox-style editorial principles (see section 5). OWNER.
- Logo: none exists. Current "logo" and favicon are personal photos. VERIFIED.
- Tone: plain, direct, with Nigerian English where it is Emmanuel's own voice ("wahala no dey finish"). VERIFIED (about).

## 5. Design direction and layers

- **Reference: Vox (principles only, rule B13).** Strong typographic hierarchy with large bold headlines; one confident highlight colour used sparingly; explainer-first structure (say what it is, why it matters, what to do); clear section labels; generous reading measure. Not taken: Vox's logo, typefaces, colours, exact layouts or trade dress. OWNER direction; principles chosen by the audit.
- **Expressive layer:** home page, AllTech landing, blog posts and book notes, About.
- **Functional layer:** database lists and entries, guides, shop list and product pages, search, tag pages. Calm, fast, scannable, workshop-readable.
- **Comfort and marketplace use:** a buyer must see what a part is, its condition, what it fits, its reference code, and how to ask about it, without guessing. OWNER.
- **Search:** site-wide search across the database, guides, shop and posts. OWNER.
- **Inclusive and accessible:** WCAG 2.2 AA as the standard; works on small phones, with keyboard and screen readers, at 200% zoom, and on slow connections. OWNER.

## 6. Stack and surfaces

- Hugo (VERIFIED, `hugo.toml`), theme hello-friend-ng vendored in `themes/` (VERIFIED), heavily overridden in `layouts/` and `static/css/` (VERIFIED).
- Hosting: Vercel, `hugo --gc --minify`, Hugo 0.151.1 pinned (VERIFIED, `vercel.json`). Local Hugo is 0.154.5.
- No JavaScript build step, no package.json, no tests. VERIFIED.
- Surfaces: public site only. Owner-facing docs: ADMIN_GUIDE.md, Obsidian templates, archetypes.

## 7. Contracts that must not change without approval

- Every route in `docs/audit/baseline/routes-before.txt` (120 routes), including `/alltech/...`, `/posts/...`, `/books/...`, `/tags/...`.
- Domain `mind-on-chain.vercel.app` (baseURL).
- Front matter keys used by layouts: `ref_code`, `category`, `condition`, `compatibility`, `images`, `cover`, `featured`, `private`, `password_id`, `brand`, `model`, `ecu`, plus `params.passwords` keys.
- RSS feed URLs (`/index.xml` and section feeds).

## 8. External links and accounts

- GitHub `https://github.com/mmanuelubah`, LinkedIn `https://www.linkedin.com/in/chinaza-ubanatu-05a983184/`, X `https://x.com/mmanuelubah` (in `hugo.toml` and again hard-coded in the footer).
- MYEASYAGENT `https://myeasyagents.com`.
- Contact: about page shows `hi@mindonchain.com` but the link opens a personal Gmail address. To confirm.
- WhatsApp or phone for buyers: unknown. To confirm.

## 9. Domain knowledge

- Currency: Naira (₦). Prices on the shop: verify with owner; never invented.
- "Tokunbo" = foreign-used, imported second-hand. A Lagos buyer expects this word. VERIFIED (archetype).
- Ladipo Market, Lagos: the main auto parts market. VERIFIED (admin guide).
- Buyer fears: wrong part number, a locked or virginised ECU that won't start the car, fake "new" parts, paying before seeing. ASSUMPTION; to confirm.
- Technician vocabulary: EWS, DME, EEPROM, BDM, bench, OBD, immobiliser, virginise, part numbers.

## 10. Earlier findings to verify

See FINDINGS.csv.

## 11. Decisions reserved for the owner

Prices, warranty and return terms, payment and delivery terms, contact numbers, which photos are real, legal wording, whether gated content stays gated, changes to URLs, releases.

## 12. Out of scope

The vendored theme in `themes/` is not edited; overrides go in `layouts/` and `static/`. The local `data/` OCR folder is not shipped and not touched.

## 13. Rollout order

1. Shared header, footer, brand. 2. Home (AllTech landing). 3. Search. 4. Shop list and product page. 5. Database list and entries, guides. 6. Blog: posts, books, About, Colophon. 7. Tags, 404, password gate.

## 14. Project-specific banned phrases

Added to the seed list: "ridiculous dealership fees" (keep the idea, say it concretely), "elegant", "seamlessly", "incredibly fast", "maximum professionalism".

## Gate 2 answers (owner, 2026-10-29)

1. Direction approved: danfo yellow and black, Archivo and Source Serif 4, square corners, no shadows. Added: the site should look **cartoonish**; the saved Clinton Mbah pages are interface references (principles only, rule B13).
2. Trading name: **Alltech Solutions**. The flyers say "ALL TECH SOLUTIONS LTD"; the legal form is not confirmed, so the site does not claim "Ltd".
3. Buyer contact: WhatsApp **0803 991 4565** (+234 803 991 4565). Keep the existing email (the address the About link already opens). Note: the flyers show a different number (0907 206 9153) and a different Gmail address; the site uses only what the owner gave here.
4. The two shop products are not real stock (unpublished as drafts). Prices: **Price on request**, no Naira prices. **No warranty**; modules are tested before sale. EWS alignment "included" is not confirmed, so it is not claimed.
5. `/` becomes the Alltech Solutions home page.
6. Search: built-in, no new tool; also a search for the blog.
7. Gated guides: real protection on Vercel; password changed.
8. Owner has rights to the database sources. The mechanic hero photo's source is unknown, so it is removed. Owner supplied flyers and the logo (favicon.jpeg). New favicon from favicon.jpeg; old favicon deleted. Logotypes, monograms and LinkedIn carousels requested.
9. Build the "Up NEPA!" bulb toggle.

Not used: `3.jpeg` is a Permagard India advert (another company's brand). The car photos inside the flyers are probably stock; only the workshop photo is used, as a treated background, licence to be confirmed.
