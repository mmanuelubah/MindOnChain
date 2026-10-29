# Alltech Solutions

The website of Alltech Solutions, an ECU and immobiliser workshop in Lagos, with the blog of Ubanatu Chinaza Emmanuel. Live at https://mind-on-chain.vercel.app/.

- `/` home, `/alltech/database/` ECU database, `/alltech/database/guides/` guides, `/alltech/shop/` parts, `/search/` search
- `/blog/` blog home, `/posts/` all posts, `/blog/roundups/`, `/blog/ecu-programming/`, `/books/`, `/about/`

## Run it locally

Needs [Hugo](https://gohugo.io/) extended (Vercel builds with 0.151.1; 0.154 also works).

```sh
hugo server          # preview at http://localhost:1313, rebuilds on save
hugo --gc --minify   # the production build Vercel runs; output in public/
```

The preview does not run `middleware.js` or `api/`, so locked pages open without a code locally.

## Deploy

Vercel builds the `main` branch with the settings in `vercel.json`. Locked writing needs two environment variables in Vercel (Settings → Environment Variables): `ACCESS_SECRET` (random, 32+ characters) and `RESEND_API_KEY`. `ADMIN_GUIDE.md` section 3 walks through it.

## Where things are

| Path | What |
| --- | --- |
| `content/` | All pages, in Markdown. `ADMIN_GUIDE.md` explains each folder and its template. |
| `layouts/` | Hugo templates. `_default/baseof.html` wraps every page. |
| `assets/css/alltech.css` | The only stylesheet: colour, type and spacing tokens first. Rules explained in `docs/audit/DESIGN_SYSTEM.md`. |
| `static/js/` | `site.js` (menu, NEPA bulb), `search.js`, `post-filter.js`, `locked.js`, `access-session.js`. |
| `middleware.js`, `api/` | Locked writing: Vercel checks the access session before serving a locked page. |
| `tools/` | `can_scope.py` draws the home page oscilloscope; `test_access.mjs` tests locked writing; `marketing.py` and `render_marketing.cjs` build the flyers, carousels and logo set in `marketing/`. |
| `themes/hello-friend-ng/` | The original theme (MIT). Kept for fallback templates; its CSS and JS are no longer loaded. |
| `docs/audit/` | The audit of this site: findings, decisions, design system, before and after numbers. |

## Checks

```sh
node tools/test_access.mjs          # locked-writing flow, 15 checks
python3 tools/can_scope.py > layouts/partials/can-scope.html   # after editing the CAN frame
```
