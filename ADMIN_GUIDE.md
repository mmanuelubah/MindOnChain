# Alltech Solutions admin guide

How to run the site from Obsidian: write blog posts and weekly roundups, add database entries and parts, lock ECU writing, and link images. The site is Alltech Solutions (home page) with a blog by Ubanatu Chinaza Emmanuel.

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

## 4. Linking images and PDFs

Large images and PDFs are hosted on Google Drive rather than in the repository, so the site stays small and pages load fast on mobile data.

### Option A: Your own photos only

Use photos you took (workshop jobs, labels, pinouts) or images you have permission to use. Images copied from Pinterest or other sites belong to someone else; linking them from your pages can lead to takedowns or broken images when the original is removed. Host your photos on Google Drive (Option B).

### Option B: Hosting Files on Your Google Drive

#### Step 1: Organize Your Google Drive

Organize your files clearly (e.g., by car brand):

- `Locksmith_Database/`
  - `Toyota/`
    - `Camry_2016_Pinout.jpg`
    - `Corolla_EEPROM_Guide.pdf`

#### Step 2: Get the Google Drive Link

1. Right-click the file in Google Drive and select **Share**. Change "General Access" to **"Anyone with the link"**.
2. Click **"Copy Link"**. (e.g., `https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i/view?usp=sharing`)

#### Step 3: Convert the Link for Your Website

Hugo needs a direct download link. Take the **FILE ID** from the link above (e.g., `1a2b3c4d5e6f7g8h9i`) and format it like this:

**`https://drive.google.com/uc?export=view&id=YOUR_FILE_ID`**

### How to Add the Image/File Link to Your Obsidian Post

Once you have your direct Google Drive link:

- **For a Cover Image (in the Frontmatter):** Paste the link inside the quotes for `cover:` or `images:` at the very top of your file.

  ```yaml
  cover: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"
  ```

- **For an Image inside the text:** Use standard Markdown syntax wherever you want the image to appear.

  ```markdown
  ![What the photo shows, e.g. EWS4 module behind the kick panel](https://drive.google.com/uc?export=view&id=YOUR_FILE_ID)
  ```

- **For a PDF Download Link:** `[Click Here to Download PDF](https://drive.google.com/uc?export=download&id=YOUR_FILE_ID)`

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

## Summary

1. Insert the right Obsidian template and save the note in its folder (section 2).
2. Link images from Google Drive or your own photos (section 4).
3. Lock sensitive ECU writing by saving it in `content/blog/locked/` (section 3).
4. Keep claims true and part numbers in backticks (section 5).
