from textwrap import dedent
import urllib.parse
import re
import os

# Match only Markdown files inside "blog/", but exclude "index.md"
include = re.compile(r"^blog\/(?!index).*\.md$")

def on_page_markdown(markdown, page, config, files):
    """
    Adds small social media share buttons only to individual blog posts.
    Excludes blog/index.md and any non-blog pages.
    """
    # Ensure we're inside the blog folder and not on index.md
    if not include.match(page.file.src_path.replace("\\", "/")):
        return markdown

    # Skip if the post metadata disables sharing
    if page.meta.get("share") is False:
        return markdown

    # Build URL and title
    page_url = urllib.parse.quote(config.site_url + page.url)
    page_title = urllib.parse.quote(page.title or "Check this out!")

    # Share URLs
    x_intent = f"https://x.com/intent/tweet?text={page_title}&url={page_url}"
    fb_sharer = f"https://www.facebook.com/sharer/sharer.php?u={page_url}"
    linkedin = f"https://www.linkedin.com/shareArticle?mini=true&url={page_url}&title={page_title}"
    reddit = f"https://www.reddit.com/submit?url={page_url}&title={page_title}"

    # Inject share buttons using MkDocs Material icons
    share_section = dedent(f"""
    ---
    **Share this post** 🌍

    [ :material-twitter: ]({x_intent}){{ .tiny-share }}
    [ :material-facebook: ]({fb_sharer}){{ .tiny-share }}
    [ :material-linkedin: ]({linkedin}){{ .tiny-share }}
    [ :material-reddit: ]({reddit}){{ .tiny-share }}
    """)

    return markdown + "\n\n" + share_section
