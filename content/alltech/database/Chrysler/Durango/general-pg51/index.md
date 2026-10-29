---
title: "Chrysler Durango (2004-2006) — ECU Info Pending"
date: 2026-08-23
draft: false
tags: ["unknown", "bench", "chrysler"]
categories: ["Database", "Immobilizer"]
brand: "Chrysler"
model: "Durango"
ecu: "Unknown"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | Chrysler |
| **Model** | Durango |
| **Year** | 2004-2006 |

---

## ECU Details

| Field | Value |
|-------|-------|
| **Manufacturer** | Unknown |
| **ECU Number** | Unknown |

---

## Programming Instructions

**Method:** `BENCH`

### Bench / Wiring Steps

> **Required Tool:** Tango, SMOK programmer, Soldering iron

1. Place a usable transponder in the Tango, select a key slot, and click the red 'Write' button.
2. Save and name the new converted file containing the transponder when prompted by Tango.
3. Open SMOK while attached to the target board, click 'Open File', and select the Tango file just created.
4. Click the 'Write' button in SMOK and wait for the 'Write OK' message in the dialog box.

---

### Safety Notes

> **Warning:** If using a remote head key, the remote does not program with the transponder during bench procedure as it does in OBD programming.
>
> **Warning:** Solder points on circuit boards for 2004 Durango and 2006 Raider are close but not identical; extra care is required if encountering board variations.
>

---

## Source

- **Document:** `advanced automotive immobilizer programming book 2017.pdf`
- **Page:** 51
