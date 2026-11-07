---
title: "{{title}}"            # e.g. Toyota Camry (2016) — Denso 89661-06K70
date: {{date:YYYY-MM-DD}}
draft: false
brand: "Toyota"
model: "Camry"
ecu: "ECU part number"
tags: ["bench", "eeprom"]     # method first: bench, obd or bdm
categories: ["Database", "Immobilizer"]
cover: ""                     # optional photo at the top: assets/uploads/photo.jpg or a Drive share link
cover_alt: ""                 # what the cover photo shows, for blind readers and search
syndication: []               # after cross-posting, add the copies: ["https://medium.com/@you/...", "https://www.linkedin.com/pulse/..."]
---

<!-- Save as: content/alltech/database/Brand/Model/<entry-name>/index.md
     (make a folder for the entry; the note inside it is called index) -->

## Vehicle Details
| Field | Value |
|-------|-------|
| **Brand** | Toyota |
| **Model** | Camry |
| **Year** | 2016 |

## ECU Details
| Field | Value |
|-------|-------|
| **Manufacturer** | Denso |
| **ECU Number** | ECU part number |

## Programming Instructions
**Method:** `BENCH`

> [!info] Required tools
> AK90, Tango

1. First step.
2. Second step.

> [!warning] Safety
> What to check before you power the module.

## Pinout Diagram
![Pinout for ECU part number](assets/uploads/pinout-ecu-part-number.jpg)

<!-- No pinout photo yet? Delete the whole "Pinout Diagram" section. -->
