# Lighthouse after Phase 7 (green home, header, footer, search)

Mobile, Lighthouse default throttling, local build on localhost, 2026-10-29. Compare with `lighthouse-before.md`.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | Weight | Before: perf / weight |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | 96 | 100 | 100 | 100 | 2.6 s | 0.006 | 269 KiB | 82 / 4,384 KiB |
| /search/?q=2L86D | 99 | 100 | 100 | 100 | 2.0 s | 0 | 179 KiB | (new page) |
| /alltech/database/bmw/x3/bmw_ews4/ | 100 | 100 | 100 | 92 | 1.8 s | 0 | 142 KiB | 55 / 4,692 KiB |
| /about/ | 75 | 100 | 100 | 100 | 16.7 s | 0 | 3,087 KiB | 66 / 7,429 KiB |

The database entry and About still use their old templates inside the new base. Remaining: the "← Back" javascript: link (crawlable-anchors) and About's 2.9 MB avatar, both fixed in Phase 8.
