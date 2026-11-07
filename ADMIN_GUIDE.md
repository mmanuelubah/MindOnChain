# Alltech Solutions admin guide

How to run the site from Obsidian: write blog posts and weekly roundups, add database entries and parts, lock ECU writing, and link images. The site is Alltech Solutions (home page) with a blog by Ubanatu Chinaza Emmanuel.

---

## Start here: the weekly routine

1. **Write** in Obsidian with a template (section 1). Add photos by dragging them in (section 4).
2. **Preview** on your laptop: `hugo server`, then open http://localhost:1313 (section 7).
3. **Publish**: commit and push to GitHub (section 8). Vercel puts it live in about a minute, and Bing is told automatically.
4. **Share** on LinkedIn and Medium (section 10).

---

## 1. Writing a new post in Obsidian

Obsidian's template folder is already set to `Templates` (Settings → Core plugins → **Templates** must be on).

1. In the file list, open the folder from the table below.
2. Create a new note (`Ctrl+N`) and name it with dashes, e.g. `toyota-camry-2016-immobiliser`.
3. `Ctrl+P` → **Templates: Insert template** → pick the template.
4. Fill in the lines at the top (between the `---` lines) and write the body. Delete any section you don't need.
5. Save. The page appears on the site the next time it is built (after you push to GitHub).

| I want to publish… | Template | Save it in | Where it shows |
| --- | --- | --- | --- |
| A step-by-step Alltech guide | `Alltech - Guide` | `content/alltech/database/guides/` | Guides, and the blog's ECU programming list |
| A database entry (pinout, EEPROM, procedure) | `Alltech - Database entry` | `content/alltech/database/Brand/Model/entry-name/` as a note called `index` | Database, under that brand and model; in search |
| A part for sale | `Alltech - Part for sale` | `content/alltech/shop/` | Parts ("Price on request", WhatsApp button) |
| A locked ECU note (approved readers only) | `Alltech - Locked note` | `content/blog/locked/` | ECU programming list, title only, behind an access code |
| A blog post | `Blog - Post` | `content/posts/` | Blog posts; set `featured: true` for the blog home |
| A weekly roundup | `Blog - Weekly roundup` | `content/posts/` | Roundups and "Latest roundup" on the blog home |
| A book | `Blog - Book` | `content/books/` | Bookshelf; `status: "Reading"` also shows it under Now |

To keep a post off the site while you write it, set `draft: true`.

---

## 2. Callouts

Callouts are the coloured boxes for instructions, warnings and tips. They work in every kind of post, Alltech and blog, and look the same in Obsidian and on the site.

```markdown
> [!info] What you need
> - K+DCAN cable
> - INPA

> [!warning] Back up first
> Save the full EEPROM before writing anything.

> [!tip] Workshop tip
> The AK90 reads the 2L86D in-circuit.

> [!danger] Don't do this
> Never write a dump from a different VIN.
```

- Types: `note`, `info`, `tip`, `success`, `warning`, `danger`. Warning and danger are orange; the rest are green.
- The words after `[!type]` are the title; leave them out and the type is the title.
- `> [!tip]- Title` makes it folded (tap to open); `> [!tip]+ Title` foldable but open.
- A line starting with `>` but no `[!type]` stays an ordinary quote.

---

## 3. Locked ECU programming writing

Locked writing can only be read with an access code that you approve. Every request gets its own code, a code works once on the device that asked, and access locks again after an hour away from the page. The check runs on Vercel's servers, so a locked page never reaches a browser without a code.

### How a reader gets in

1. They open a locked post and land on a page that says "This writing is locked".
2. They enter their name, email and (optionally) why they need it, and press **Send request**.
3. You get an email at **ubanatuchinaza@gmail.com**: "Access request: … wants to read …". Only this address ever receives requests.
4. Press **Review and approve**, check who it is, then press **Approve and show the code**. To refuse, do nothing.
5. Send them the 8-character code (the page has a button that opens an email to them with the code filled in, or copy it into WhatsApp).
6. They type the code on the locked page and the post opens. If they leave the page for an hour, it locks and they must ask again.

### One-time setup (about 10 minutes)

1. **Resend** sends the approval emails. Go to resend.com, sign up **with ubanatuchinaza@gmail.com** (the free plan is enough), open **API Keys**, create a key and copy it.
2. **Vercel**: open the project, then **Settings → Environment Variables**, and add:
   - `RESEND_API_KEY` = the key from Resend.
   - `ACCESS_SECRET` = a long random secret. Make one in a terminal with `openssl rand -base64 48` (this only prints a random string; it changes nothing). Keep it private. Changing it later logs everyone out and voids all open requests.
3. Redeploy (Deployments → latest → Redeploy).
4. If you added `GUIDES_PASSWORD` earlier, delete it; nothing uses it any more.

Until `ACCESS_SECRET` is set, every locked page stays locked for everyone, including you.

### Write a locked post

Save it in `content/blog/locked/` (Obsidian template: `Alltech - Locked note`). Everything in that folder is locked, tagged `ecu-programming`, listed by title only in the blog, and kept out of feeds, search and the sitemap.

The two older locked guides in the database (`me75-full-flash-bdm`, `bosch-me75-manual`) are locked by their addresses in `middleware.js`. To lock another database page, add `private: true` to it and its address to that list.

### Check it works

After setup, on the live site: open a locked post in a private browser window, request access with another email address, approve it from your Gmail, and enter the code. Then close the tab for an hour and reopen it: it should be locked.

---

## 4. Images: from your laptop or Google Drive

Either way, write what the photo shows between the square brackets. Blind readers hear it, and Google and AI engines read it.

### From your laptop (best)

1. Drag the photo from your Files window into the note, or copy it and paste with `Ctrl+V`.
2. Obsidian saves it in `assets/uploads/` and writes a line like `![](assets/uploads/IMG_2041.jpg)`.
3. Fill in the brackets: `![EWS4 module behind the driver's kick panel](assets/uploads/IMG_2041.jpg)`.
4. Optional caption under the photo: add it in quotes after the file, `![…](assets/uploads/IMG_2041.jpg "BMW X3, 2006")`.

The site makes small, medium and large copies of every photo automatically, so a 5 MB phone photo reaches a phone as about 40 KB. Rename files plainly before dragging them in if you can: `ews4-module-x3.jpg`, not `IMG_2041.jpg`; the name ends up in Google Images.

### From Google Drive

1. In Drive, right-click the photo → **Share** → General access: **Anyone with the link** → **Copy link**.
2. Paste the link as it is: `![Pinout of the MS43 DME](https://drive.google.com/file/d/1AbC…/view?usp=sharing)`.

The site rewrites any Drive link (share, open or the old `uc?export=view` form) into Drive's image address, which works when embedded. If the photo shows as broken, the file is not shared with "Anyone with the link". Drive photos are not resized by the site, so prefer laptop photos for large images.

### A cover photo for a post

In the front matter: `cover: "assets/uploads/ews4-module-x3.jpg"` (or a Drive link) and `cover_alt: "what it shows"`. It appears above the text and becomes the picture in WhatsApp, LinkedIn and X previews. Without a cover, previews use the green Alltech card.

### If an image is wrong

The build log on Vercel (Deployments → the deployment → Building) prints `image not found: … on posts/….md` or `image without alt text`. The page still publishes; fix the line and push again.

### PDFs (pinouts, manuals): keep them on Google Drive

PDFs stay on your Drive; the site only shows a card for each one, so nothing large is stored on Vercel and readers on mobile data download almost nothing until they choose to.

1. Upload the PDF to Drive → right-click → **Share** → General access: **Anyone with the link** → **Copy link**.
2. In the entry's front matter, list it under `pdfs:` (the database entry template already has the lines):

   ```yaml
   pdfs:
     - title: "MS43 DME pinout"
       link: "https://drive.google.com/file/d/1AbC…/view?usp=sharing"
       note: "88-pin and 40-pin connectors"
     - title: "EWS4 wiring"
       link: "https://drive.google.com/file/d/9XyZ…/view?usp=sharing"
   ```

   They appear in a **Pinouts and documents** section after the steps.
3. Or place one exactly where it belongs between the steps, on its own line:

   `{{< pdf "https://drive.google.com/file/d/1AbC…/view" "Bench wiring diagram" "optional note" >}}`

Each card shows Drive's picture of the first page, an **Open PDF** button (Drive's viewer), **Download**, and **Preview here**, which loads the viewer inside the page only when tapped. Titles are searchable on the site, so "MS43 pinout" finds the entry. If the card shows no picture, the file is not shared with "Anyone with the link".

Only use photos you took or have permission to use.

---

## 5. Design rules to keep

The full system is in `docs/audit/DESIGN_SYSTEM.md`. When writing content:

- **No emoji.** Use words: "Locked", "Sold out", "In stock".
- **Part numbers in backticks** (`` `0 261 209 012` ``) so they show in monospace; the pixel font makes B/8, 5/S and 0/O look alike.
- **Only true claims.** No prices (the site says "Price on request"), no warranty, no delivery promises beyond "ask about delivery".
- **One name per thing:** Alltech Solutions, MYEASYAGENT, Ubanatu Chinaza Emmanuel.
- If you write custom HTML in a post, use the colour tokens: `var(--ink)` text, `var(--paper)` background, `var(--brand)` green, `var(--hair)` lines.

---

## 6. Moving to your own domain

The site's address comes from one Vercel setting, `SITE_URL`. Until it is set, the site uses mind-on-chain.vercel.app.

1. Buy the domain from a registrar (for a `.ng` or `.com.ng` name, an NiRA-accredited registrar). A distinctive name such as alltechsolutions.ng is safer than a bare "alltech", which a large international company also uses.
2. In Vercel: Project → Settings → **Domains** → Add, type the domain, and follow the DNS records Vercel shows you (you enter them at the registrar).
3. Still in Domains, edit `mind-on-chain.vercel.app` and set it to **redirect** to the new domain, so old links and flyers keep working.
4. Project → Settings → Environment Variables: add `SITE_URL` = `https://yourdomain/` (with the final slash), then redeploy.
5. Regenerate the flyers with the new address: `SITE_URL=https://yourdomain/ python3 tools/marketing.py`, then `node tools/render_marketing.cjs`.

## 7. Running the site on your laptop

Open a terminal (`Ctrl+Alt+T`) and type:

```sh
cd ~/Desktop/MindOnChain
hugo server
```

- This only runs the site on your computer; nothing is published and nothing outside is contacted.
- Good result: a line ending `Web Server is available at http://localhost:1313/`. Open that address in your browser. Every time you save a note, the page reloads by itself.
- Drafts (`draft: true`) are hidden; to see them too, use `hugo server -D`.
- Stop it with `Ctrl+C`.
- Bad result: a red `ERROR` line names the file and the line number (often a quote mark inside a quoted value in the front matter). Fix it and save; the server recovers by itself.
- Locked writing opens without a code here, because the lock only exists on Vercel.

## 8. Publishing (putting it live)

Publishing = saving a "commit" (a snapshot) and pushing it to GitHub. Vercel sees the push and rebuilds the site in about a minute.

**From VS Code** (easiest): open the `MindOnChain` folder, click the Source Control icon on the left (it shows a number when something changed), type a short message such as `Post: Toyota Camry 2016 immobiliser`, press **Commit**, then **Sync Changes**.

**From the terminal:**

```sh
cd ~/Desktop/MindOnChain
git add -A
git commit -m "Post: Toyota Camry 2016 immobiliser"
git push
```

**From Obsidian** (optional, one-time install): Settings → Community plugins → Browse → search **Git** (by Vinzent) → Install → Enable. Then `Ctrl+P` → **Git: Commit-and-sync**.

Check it worked: GitHub shows a green tick next to the commit after a minute, and the page is live. A red cross means the build failed; Vercel's deployment page shows the error line.

What is never published: anything in `Private/` (your daily notes go there automatically). Everything else in the folder ends up on public GitHub, so keep personal notes in `Private/`.

Dates: a post dated today is live today (the site uses Lagos time). A post dated in the future stays hidden until the next push after that date, so "scheduling" means pushing again on the day.

## 9. Google, Bing and AI engines

What the site already does for you, every time it builds:
- `sitemap.xml` lists every public page; `robots.txt` welcomes Google, Bing and the AI crawlers (ChatGPT, Claude, Perplexity, Copilot, Gemini) and points them to the sitemap.
- Every page carries structured data saying what it is: the business (Alltech Solutions, Lagos, phone, services), you as the author, breadcrumbs, and for posts and database entries an article with its car brand, model and ECU.
- `/llms.txt` gives AI assistants a plain summary of the business and a list of every entry, guide and post.
- After each push, Bing is told which pages changed (IndexNow, a GitHub Action). Bing's index also feeds ChatGPT search and Copilot.

**One-time: Google Search Console** (free, about 10 minutes)
1. Go to search.google.com/search-console → **Add property** → **URL prefix** → `https://mind-on-chain.vercel.app/`.
2. Choose **HTML tag**. Copy only the code inside `content="…"`.
3. Paste it into `hugo.toml` under `[params.verification]` as `google = "the-code"`, then publish (section 8).
4. Back in Search Console, press **Verify**. Then **Sitemaps** → enter `sitemap.xml` → **Submit**.
5. For a new post: paste its address into the search box at the top (URL Inspection) → **Request indexing**.

**One-time: Bing Webmaster Tools**
1. Go to bing.com/webmasters → sign in → **Import from Google Search Console** (easiest; no code needed).
2. Or add the site and use the HTML meta tag: put its code in `hugo.toml` as `bing = "the-code"` and publish.
3. Submit `https://mind-on-chain.vercel.app/sitemap.xml` under **Sitemaps**.

What to expect: new pages usually appear in Google within days to a few weeks and in Bing within days. Nobody can promise rankings or AI citations; they follow from pages that answer real questions clearly and from other sites linking to you.

## 10. Writing posts people find, and that AI quotes

- **Title = the search.** Put the car, module and part number in the title: "Toyota Camry 2016: reading the immobiliser EEPROM", not "A tricky job".
- **Answer in the first two sentences.** What the problem was and what fixed it. Search snippets and AI answers quote the opening.
- **Fill `description:`** with one plain sentence (under 160 characters). It is what Google shows under your title.
- **Use headings that are questions** people ask ("Why won't the car start after an ECU swap?") and answer right under them.
- **Steps as numbered lists, warnings as callouts** (section 2).
- **Real photos with real descriptions** in the brackets.
- **Link to your own pages**: the database entry, the guide, the Parts page.
- **Part numbers in backticks**, exactly as on the label: `` `0 261 209 012` ``.
- **Update old posts** instead of writing near-duplicates; add `lastmod: 2026-12-01` to the front matter when you do.

Questions your customers ask that a post or database entry can answer (use them as titles or headings):
1. Why won't my car start after replacing the ECU?
2. What is ECU cloning and how much does it cost in Lagos?
3. Can a used ECU from Ladipo work in my car?
4. What does virginising an ECU mean?
5. How do I find the part number on my ECU?
6. My BMW key stopped working after a battery change: is it the EWS?
7. What is the difference between EWS3 and EWS4?
8. Can an ECU be programmed through the OBD port, or does it need the bench?
9. Where can I get my car's immobiliser fixed in Lagos?
10. How do I know a Ladipo ECU is tested before I pay?

To see what AI assistants search for: Claude shows its searches in the answer. In ChatGPT (Chrome), open DevTools (`F12`) → Network, ask a question that makes it search the web, press `Ctrl+Shift+F` and search for `search_model_queries`. Use those searches as a checklist of what a post should cover, not as keywords to repeat.

## 11. Sharing on LinkedIn and Medium

Your site is the original; LinkedIn and Medium are where people discover it. Keep it that way so Google credits your site.

**LinkedIn (a normal post):**
1. Write 3 to 6 short lines in your own words: the problem, what you found, one useful detail.
2. Paste the post's link at the end. LinkedIn shows the cover (or the green Alltech card) automatically.
3. If the preview looks old or empty, paste the link into linkedin.com/post-inspector to refresh it.

**LinkedIn article or newsletter (full text):** start it with "Originally published at" plus the link to your post, then the text. After it is live, copy its address and add it to the post's `syndication:` list, then publish your site again.

**Medium:** use **Import a story** (medium.com/p/import), paste your post's link and press Import. Medium copies the post and tells Google your site is the original (a canonical link), so your site keeps the search credit. Check the formatting, publish, then add the Medium address to `syndication:`.

```yaml
syndication:
  - "https://medium.com/@your-name/toyota-camry-2016-immobiliser-1a2b3c"
  - "https://www.linkedin.com/pulse/toyota-camry-2016-immobiliser-ubanatu-chinaza-emmanuel"
```

The post then shows "Also published on: Medium · LinkedIn", and search and AI engines treat all three as one piece of work by you.

**WhatsApp:** use the post's WhatsApp share button; the preview card comes with it.

## Summary

1. Write with a template; drag photos in; fill the brackets (sections 1, 4).
2. Preview with `hugo server` (section 7).
3. Commit and push; check the green tick (section 8).
4. Share on LinkedIn, import to Medium, add the links to `syndication:` (section 11).
