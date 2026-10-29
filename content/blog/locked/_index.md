---
title: "Locked writing"
description: "ECU programming notes that need an access code."
layout: collection
include_locked: true
outputs: ["HTML"]          # no RSS feed for this section: feeds would carry the full text
# Everything in this folder is locked by middleware.js (address starts /blog/locked/).
cascade:
  private: true
  type: posts
  tags: ["ecu-programming"]
  build:
    list: local            # listed by title inside the blog, never in site-wide feeds, search or tag pages
  sitemap:
    disable: true
---
