# Alltech Solutions admin guide

How to run the site from Obsidian: write blog posts and weekly roundups, add database entries and parts, lock ECU writing, and link images. The site is Alltech Solutions (home page) with a blog by Ubanatu Chinaza Emmanuel.

---

## 1. Setting Up Obsidian Templates

Obsidian has a built-in feature called **Templates**. Templates allow you to insert pre-written "Frontmatter" (the configuration settings at the top of a file) into any new note with just a click.

### How to Enable Templates in Obsidian

1. Open this project folder in Obsidian.
2. Click the **Gear icon (Settings)** in the bottom left corner.
3. Go to **Core Plugins** and make sure **Templates** is toggled ON.
4. Create a folder in your Obsidian vault called `Obsidian_Templates` (or just `Templates`).
5. Go back to Settings > **Templates**, and set the **Template folder location** to that folder.

### The Core Templates to Create

In your templates folder, create these markdown files and copy-paste the text below into them:

#### Template 1: `TPL - Standard Blog Post`

Use this when you are writing a standard article for your blog.

```markdown
---
title: "{{title}}"
date: {{date}}
lastmod: {{date}}
draft: false
cover: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"
categories: ["Tech"] # Use exactly one category (e.g., Tech, Life, Books)
tags: ["tag1", "tag2"]
featured: false # Set to true to pin it as an "Editor's Pick" on the homepage
---

**Write an engaging summary or intro paragraph here...**

<!--more-->

The rest of your post content goes here. The `<!--more-->` tag ensures the excerpt on the homepage looks clean.
```

#### Template 2: `TPL - Locked ECU Post`

For ECU programming writing that only approved readers may see. Save it in `content/blog/locked/`. See section 3.

```markdown
---
title: "{{title}}"
date: {{date}}
draft: false
description: "One line on what this note covers (shown nowhere while locked)."
tags: ["ecu-programming"]
---

Write the procedure here. Everything in content/blog/locked/ is locked automatically.
```

#### Template 3: `TPL - ECU Database`

Use this when manually adding a new ECU pinout, OBD procedure, or immobilizer guide.

```markdown
---
title: "{{title}}"
date: {{date}}
draft: false
tags: ["bench", "eeprom"]
categories: ["Database", "Immobilizer"]
brand: "Brand Name"
model: "Car Model"
ecu: "ECU Part Number"
---

## Vehicle Details
| Field | Value |
|-------|-------|
| **Brand** | Brand Name |
| **Model** | Car Model |
| **Year** | Year Range |

---

## ECU Details
| Field | Value |
|-------|-------|
| **Manufacturer** | ECU Maker |
| **ECU Number** | ECU Part Number |

---

## Programming Instructions
**Method:** `BENCH`

1. First step goes here...
2. Second step goes here...

---

## Pinout Diagram
![Pinout diagram for ECU Part Number](https://drive.google.com/uc?export=view&id=YOUR_FILE_ID)
```

If you have no pinout image yet, delete the whole "Pinout Diagram" section rather than leaving a note that it is coming.

#### Template 4: `TPL - Part for sale`

Use this when you list a real ECU, module or engine you have in hand. Never list a part you don't have, and never use a stock photo.

```markdown
---
title: "{{title}}"
date: {{date}}
draft: false
price: ""            # for your records; the page always shows "Price on request"
sku: ""
oem_number: ""
in_stock: true
stock_count: 1
condition: "Tokunbo, bench tested"
compatibility:
  - "Make Model (years)"
specs:
  Connector: ""
images:
  - "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"
---

What the part is and what was tested, in plain words. No warranty promises.
```

#### Template 5: weekly roundup

`Templates/weekly-roundup-template.md`. The `weekly-roundup` tag puts it on the blog's Roundups page and in "Latest roundup" on the blog home.

---

## 2. Creating a Post Using Obsidian

When you need to make a new post manually, follow these simple steps:

1. In Obsidian, navigate to the correct folder where the post should live:
   - **Blog posts and weekly roundups:** `content/posts/`
   - **Locked ECU programming writing:** `content/blog/locked/`
   - **ECU database:** `content/alltech/database/BrandName/ModelName/`
   - **Parts for sale:** `content/alltech/shop/`
   - **Books:** `content/books/`
2. Create a new Note (`Ctrl+N` or `Cmd+N`) inside that folder.
3. Give the note a clear title (e.g., `toyota-camry-2gr-fe.md`).
4. Press `Ctrl+P` (or `Cmd+P`) to open the Command Palette, type **"Insert Template"**, and press Enter.
5. Select the matching template (blog post, locked ECU post, database entry, part, roundup or book).
6. Fill in the specific details and hit save!

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

Save it in `content/blog/locked/` (Obsidian template: `Templates/locked-ecu-post-template.md`). Everything in that folder is locked, tagged `ecu-programming`, listed by title only in the blog, and kept out of feeds, search and the sitemap.

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
