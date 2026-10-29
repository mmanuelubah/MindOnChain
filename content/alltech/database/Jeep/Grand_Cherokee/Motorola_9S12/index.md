---
title: "Jeep Grand Cherokee (2005) — Motorola 9S12"
date: 2026-08-23
draft: false
tags: ["jeep", "motorola", "bench"]
categories: ["Database", "Immobilizer"]
brand: "Jeep"
model: "Grand Cherokee"
ecu: "9S12"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | Jeep |
| **Model** | Grand Cherokee |
| **Year** | 2005 |

---

## ECU Details

| Field | Value |
|-------|-------|
| **Manufacturer** | Motorola |
| **ECU Number** | 9S12 |
| **Family Group** | MC9S12 |

---

## Programming Instructions

**Method:** `BENCH`

### Bench / Wiring Steps

> **Required Tool:** Tango, SMOK Programmer

1. Select Device > MCU > Motorola > MC > UNSECURED > EEPROM > MC9S12 EE UNSEC.
2. Click the Read Button and monitor status reports in the bottom left dialog box.
3. Click the Verify button to ensure the BIN file was correctly read.
4. Go to File > Save to archive the original BIN file before conversion.
5. Open the Tango software and navigate to USA > Jeep > Grand Cherokee > 2005 (9S12).
6. Click the blue 'File' button and open the saved SMOK BIN file.
7. Confirm Tango recognizes the file, which displays existing keys and allows viewing the Login/PIN via the 'i' button.

### Wiring / Pin Connections (from steps)

- Confirm Tango recognizes the file, which displays existing keys and allows viewing the Login/PIN via the 'i' button.

---

### Safety Notes

> **Warning:** Always click the Verify button before saving to ensure an incorrectly read BIN file is not saved or converted.
>

---

## Source

- **Document:** `advanced automotive immobilizer programming book 2017.pdf`
- **Page:** 50
