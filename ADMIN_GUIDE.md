# 📘 MindOnChain Comprehensive Admin & Operations Guide

Welcome to your comprehensive manual for managing the **MindOnChain** platform, the **AllTech Locksmith Database**, and the **Concierge** service manually using **Obsidian**.

This guide ensures that you will always be able to create new posts, update the database, manage access, and link your files seamlessly, maintaining the site's mature, professional, and emoji-free design language.

---

## 1. Setting Up Obsidian Templates

Obsidian has a built-in feature called **Templates**. Templates allow you to insert pre-written "Frontmatter" (the configuration settings at the top of a file) into any new note with just a click.

### How to Enable Templates in Obsidian

1. Open your MindOnChain folder in Obsidian.
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

#### Template 2: `TPL - Gated Guide / Private Post`

Use this for a guide that only people with the password may read. See section 3: the page must also be added to `middleware.js`.

```markdown
---
title: "{{title}}"
date: {{date}}
draft: true
private: true
build:
  list: never
sitemap:
  disable: true
cover: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"
categories: ["Guides"]
tags: []
---

# Introduction

Write the guide here. It is only protected once its address is in middleware.js.
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
![Pinout Diagram](https://drive.google.com/uc?export=view&id=YOUR_FILE_ID)
```

#### Template 4: `TPL - Concierge Item`

Use this when you are listing a new engine, ECU, or part from Ladipo Market.

```markdown
---
title: "{{title}}"
date: {{date}}
draft: false
ref_code: "LAD-XXX-001"
category: "engine" # options: engine, ecu, module, other
condition: "tokunbo" # options: tokunbo, new, refurbished
compatibility:
  - "Car Make and Model 1"
  - "Car Make and Model 2"
images:
  - "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"
---

Write a description of the part here...
```

---

## 2. Creating a Post Using Obsidian

When you need to make a new post manually, follow these simple steps:

1. In Obsidian, navigate to the correct folder where the post should live:
   - **Blog Posts & Guides:** `content/posts/`
   - **ECU Database:** `content/alltech/database/BrandName/ModelName/`
   - **Concierge:** `content/alltech/concierge/`
2. Create a new Note (`Ctrl+N` or `Cmd+N`) inside that folder.
3. Give the note a clear title (e.g., `toyota-camry-2gr-fe.md`).
4. Press `Ctrl+P` (or `Cmd+P`) to open the Command Palette, type **"Insert Template"**, and press Enter.
5. Select the appropriate Template (Blog, Private Guide, Database, or Concierge).
6. Fill in the specific details and hit save!

---

## 3. Private guides and the password

Private guides are protected by Vercel, on the server. A visitor without the password never receives the page. (The old in-page gate sent the whole guide to every visitor and only hid it; anyone could read it.)

### Make a guide private

1. In the guide's front matter add:

   ```yaml
   private: true
   build:
     list: never
   sitemap:
     disable: true
   ```

   This keeps it out of lists, feeds, tag pages, search and the sitemap.
2. Open `middleware.js` in the project root and add the guide's address to the `matcher` list, for example `"/alltech/database/guides/my-new-guide/:path*"`. Vercel cannot read Hugo files, so this list must be written out by hand.

### Set or change the password

1. Go to vercel.com, open the project, then **Settings → Environment Variables**.
2. Add (or edit) a variable named `GUIDES_PASSWORD`. Its value is the password. Choose a long phrase, not a single word.
3. Redeploy (Deployments → the latest → Redeploy) so the new value takes effect.

The password is never written in the repository. If `GUIDES_PASSWORD` is missing, private guides show "not available" to everyone, including you.

### Opening a private guide

The browser shows its own sign-in box. Type anything as the username and the password as the password.

---

## 4. Linking Images (Pinterest, Google Drive) and PDFs

To keep the website incredibly fast and save storage, **all images and PDFs should be hosted externally** (e.g., on Pinterest, Google Drive, or other web sources).

### Option A: Using Images from Pinterest (or any website)

You can easily use images found on Pinterest as your cover photo or within the body of your article.

1. Open the Pinterest image you want to use in your browser.
2. **Right-click** on the image itself.
3. Select **"Copy Image Address"** (or "Copy Image Link").
   *(The copied link should look something like: `https://i.pinimg.com/originals/.../....jpg`)*

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

Once you have your direct link (either the `.jpg` link from Pinterest or the formatted Google Drive link):

- **For a Cover Image (in the Frontmatter):** Paste the link inside the quotes for `cover:` or `images:` at the very top of your file.

  ```yaml
  cover: "https://i.pinimg.com/originals/example-image.jpg"
  ```

- **For an Image inside the text:** Use standard Markdown syntax wherever you want the image to appear.

  ```markdown
  ![Image Description](https://i.pinimg.com/originals/example-image.jpg)
  ```

- **For a PDF Download Link:** `[Click Here to Download PDF](https://drive.google.com/uc?export=download&id=YOUR_FILE_ID)`

---

## 5. Design & Operation Guidelines (Recent Features)

To maintain the sophisticated, mature design identity of MindOnChain, adhere to the following rules when creating content:

### 1. The Zero-Emoji Policy

Emojis are strictly banned from all content, titles, and layout elements to ensure maximum professionalism.

- Do not use emojis in your Obsidian templates or markdown files (removed from the templates above).
- If you need to indicate a status, use text brackets. For example, use `[Private]` or `[Locked]` instead of 🔒, and `[Buyer Only]` instead of 🛒.

### 2. Compact List Views

The site uses highly efficient, compact list designs (grouping by year and date) to maximize information density.

- You do not need to worry about styling post cards; just ensure your `title`, `date`, and `tags` are correct in the frontmatter, and Hugo will automatically render them elegantly without taking up too much screen space.

### 3. Theme Variables

If you ever need to write custom HTML/CSS inside a post, always use the site's theme variables for colors to ensure perfect contrast in both Light and Dark modes.

- Primary Accent: `var(--color-accent-primary)`
- Text color: `var(--color-text-primary)`
- Background: `var(--color-bg-primary)`
- Borders: `var(--color-border)`

---

## Summary of Maintenance

1. You use **Obsidian Templates** to instantly load the correct formatting for any new feature or section.
2. You save your files directly into the respective `content/` folders.
3. You use **Direct Image Links** (Pinterest, Google Drive, etc.) to display all visual media.
4. You adhere to the **Zero-Emoji Policy** and let the automated Hugo layouts handle the mature styling.
