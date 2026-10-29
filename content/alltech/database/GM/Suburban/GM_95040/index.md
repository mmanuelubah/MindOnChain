---
title: "GM Suburban (2006-2009) — GM 95040"
date: 2026-08-23
draft: false
tags: ["gm", "bench"]
categories: ["Database", "Immobilizer"]
brand: "GM"
model: "Suburban"
ecu: "95040"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | GM |
| **Model** | Suburban |
| **Year** | 2006-2009 |

---

## ECU Details

| Field | Value |
|-------|-------|
| **Manufacturer** | GM |
| **ECU Number** | 95040 |
| **Family Group** | Circle Plus |

---

## Programming Instructions

**Method:** `BENCH`

### Bench / Wiring Steps

> **Required Tool:** AR32 Device Reader, Tango plus Software

1. Locate and remove the immobilizer antenna module around the ignition cylinder.
2. Identify the target device chip (95040 8-pin SOIC) on the antenna board.
3. Read the 95040 EEPROM chip in-circuit using the AR32 device reader.
4. Use Tango plus software to process the EEPROM BIN file and write/convert the transponder key (Phillips 46 / 7936).

### Wiring / Pin Connections (from steps)

- Identify the target device chip (95040 8-pin SOIC) on the antenna board.

---

### Safety Notes

> **Warning:** This procedure applies primarily to Circle Plus vehicles with column-mounted ignitions, not typically in-dash ignitions.
>
> **Warning:** Between 2008 and 2009 GM changed the antenna design and may have removed key data from the antenna module.
>

---

## Source

- **Document:** `advanced automotive immobilizer programming book 2017.pdf`
- **Page:** 52
