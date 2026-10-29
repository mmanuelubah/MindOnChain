# AllTech design system

Status: **proposal for Gate 2.** Nothing here is in the site yet. The style tile (`style-tile.html`) shows every rule below with real content.

Each decision states its reason in terms of this project. If a future change cannot give a reason like these, it does not go in.

## Direction in one paragraph

AllTech reads like a well-edited trade paper. Vox's principles fit: a big, plain headline that says what the page is; a short standfirst that explains why it matters; clear section labels; one loud colour used rarely. We take those principles and nothing else from Vox: no logo, typefaces, colours or layouts of theirs. The loud colour is danfo yellow, the colour of Lagos's minibuses, which a Lagos reader recognises and which reads well in a bright workshop. Everything else is ink on paper.

**Rejected alternative:** keep the current dark, green-accented "terminal" look. It suits a crypto blog (the old MindOnChain description) more than a workshop and parts seller, it fails contrast today, and it is the default look of AI-generated developer sites.

## Layers

| Layer | Screens | Rules |
| --- | --- | --- |
| Expressive | Home, posts, book notes, About, Colophon | Large display headlines, standfirst, byline, serif body for long reading, highlight labels, full-width rules between sections. |
| Functional | Database lists and entries, guides, parts list and product pages, search, tags, 404 | Sans only, left-aligned, dense but calm, part numbers in monospace, tables that scroll inside themselves, no decoration beyond section labels. |

## Colour roles

| Role | Light | Dark | Use | Contrast |
| --- | --- | --- | --- | --- |
| `--paper` | #FAF8F3 | #141414 | Page background | |
| `--sunken` | #F0EDE5 | #1F1E1B | Table headers, code, search field | |
| `--ink` | #141414 | #EEEBE4 | Text, rules, borders of inputs | 17.4 / 15.5 |
| `--muted` | #5B574F | #A9A398 | Dates, captions, secondary labels | 6.8 / 7.4 |
| `--hair` | #D9D4C8 | #3A3833 | Decorative dividers only, never a control's only boundary | |
| `--danfo` | #FFC20E | #FFC20E | Highlight: section labels, the one primary button, link underline, search match. In light mode only ever a fill behind ink. | ink on danfo 11.4 |
| `--ok` | #1B6B3A | #7DD3A0 | "In stock", success | 6.2 / 10.3 |
| `--bad` | #A4161A | #FF8A80 | Errors, "Sold out" | 7.3 / 8.1 |
| `--warn-bg` / `--warn-ink` | #FFF4CC / #5C4300 | #2E2500 / #FFE08A | Safety notes in procedures | 8.4 / 11.8 |
| `--focus` | #0B57D0 | #8AB4F8 | Focus ring (3px), keyboard only | 6.0 / 8.7 |

Light/dark: follows the phone's setting by default; a switch overrides it and remembers the choice.

## Typography

| Role | Family | Why |
| --- | --- | --- |
| Display and UI | Archivo (SIL Open Font Licence), variable weight and width | A sturdy grotesk with condensed widths, so long part names ("Denso 1KD-FTV / 1GD-FTV") fit a phone headline without shrinking to nothing. |
| Long reading | Source Serif 4 (SIL OFL), posts and book notes only | Comfortable for essays; loaded only on blog pages, so workshop pages stay light. |
| Part numbers and codes | System monospace (`ui-monospace`, no download) | Technicians must tell 0 from O and 1 from I in "0 261 209 012". |

Weights: 400, 600, 800 (display only). Scale, 1.25 ratio, rem-based so it follows the reader's text size setting:

| Token | Size | Use |
| --- | --- | --- |
| `--t-xs` | 0.8125rem (13px) | Labels, legal |
| `--t-sm` | 0.9375rem (15px) | Meta, table cells on phone |
| `--t-md` | 1.0625rem (17px) | Body |
| `--t-lg` | 1.3125rem (21px) | Standfirst, H3 |
| `--t-xl` | 1.625rem (26px) | H2 |
| `--t-2xl` | clamp(2rem, 6vw, 2.5rem) | Page H1 (functional) |
| `--t-3xl` | clamp(2.5rem, 9vw, 4rem) | Display H1 (expressive) |

Tested strings in the tile: ₦ prices, "Ọ̀jọ́ Ìbàdàn", "CEL 61 35-6 980 104-02", "Denso 1KD-FTV / 1GD-FTV".

## Spacing, radius, elevation

- Spacing scale (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96 as `--s-1` to `--s-9`. Related things 8 to 12 apart; sections 48 to 64.
- Radius: **0** everywhere, except focus rings (2px). Editorial pages are square-cornered; this removes 14 radius values.
- Elevation: **none.** Separation comes from rules (1px ink, 4px ink for section heads) and from `--sunken` fields.
- Measure: 68 characters for reading text; 1120px max page width for lists and grids.
- Breakpoints: 640px and 1024px only (replaces 12).

## Icons

Lucide (ISC licence), 1.75 stroke, 20px, always beside a text label or given an accessible name. Replaces the emoji in the database list and the theme's mixed icons.

## Components (every state shown in the tile)

- **Section label:** short uppercase word on danfo, ink text. One per section.
- **Headline + standfirst + byline:** byline "By Ubanatu Chinaza Emmanuel" on blog pages only.
- **Breadcrumb:** replaces "← Back". Real links, last item is the current page.
- **Database row:** brand and module, part number in monospace, method tag (BENCH, OBD), chevron. Whole row is the link.
- **Spec table:** two columns, scrolls sideways inside its own frame on phones; never the page.
- **Safety note:** warn colours, "Safety" label in text, not colour alone.
- **Part card:** name, fits, condition, price or "Price on request", stock. Whole card is the link. No hover lift.
- **Product facts block:** price, condition, fits, OEM number, SKU, stock, then one primary button "Ask about this part on WhatsApp" with the part's SKU prefilled in the message. States: in stock, low stock, sold out (button becomes "Ask for a similar part").
- **Search:** one field with a visible label, results grouped (Database, Guides, Parts, Writing), match highlighted on danfo. States: empty field (shows example searches), results, no results (offers WhatsApp and the full database list), offline/index failed (plain message plus links to the lists).
- **Buttons:** primary (danfo fill, ink text, 48px tall), secondary (ink outline), disabled (muted, `aria-disabled`, explains why nearby).
- **Empty state:** says what is missing and where to go instead.

## Platform conventions

- Header: AllTech wordmark (goes home) | Database | Guides | Parts | Writing | About | Search. On phones: wordmark, Search, Menu (a real `<button aria-expanded>`).
- Footer: contact (one route), social links from `hugo.toml`, Colophon, "Lagos, Nigeria", copyright. Nothing from the header repeated.
- Touch targets 48px for primary actions, 44px minimum elsewhere.
- Reduced motion: no motion. Default motion: none beyond a 150ms colour change on hover.

## Voice

- First person singular. AllTech is Emmanuel's workshop; "I" is true, "our team of experts" is not.
- Say the job, the part and the car. "I align EWS4 to a replacement DME" beats "expert programming".
- Plain Nigerian English is welcome where it is his voice ("tokunbo", "wahala no dey finish").
- Errors say what happened and what to do next. No "Oops".
- No unverified promises. Warranty, delivery and price wording only once the owner confirms it.
- Banned phrases: the seed list in the skill plus "Your Vehicle. Our Expertise.", "all in one place", "Quality Guaranteed", "Learn More", "Check back soon", "elegant", "seamlessly", "incredibly fast", "maximum professionalism", "precision", "genuine parts" (unless a specific part is proven genuine).

## Navigation policy (U5)

- Header holds the six main destinations. The wordmark is the only home link.
- Footer holds only contact, social, Colophon, location, copyright.
- A destination appears at most twice per screen.
- One contact route per screen: WhatsApp on product and parts pages, email on blog pages.
- Every external URL lives in `hugo.toml`.
