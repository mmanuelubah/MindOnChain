---
title: "BMW All Models (Ews4) — CEL 61.35-6 980 104-02"
date: 2026-08-23
draft: false
tags: ["cel", "bmw", "bench"]
categories: ["Database", "Immobilizer"]
brand: "BMW"
model: "All Models (Ews4)"
ecu: "61.35-6 980 104-02"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | BMW |
| **Model** | All Models (Ews4) |
| **Year** | All / Unknown |

---

## ECU Details

| Field | Value |
|-------|-------|
| **Manufacturer** | CEL |
| **ECU Number** | 61.35-6 980 104-02 |
| **Family Group** | EWS4 |

---

## Programming Instructions

**Method:** `BENCH`

### Bench / Wiring Steps

> **Required Tool:** SMOK Programmer

1. Remove the EWS4 circuit board from the off-white plastic casing.
2. Locate the Motorola Mask 2L86D MCU (QFP 80 Leg).
3. Open SMOK Help Files and search for 'EWS4' to view the solder points diagram.
4. Clean and presolder each solder point, then solder 7 colored wires to the designated points.
5. Open the SMOK software and select: Chip -> MCU -> Motorola -> MC -> HC12 -> Secured -> Eeprom -> MC9S12EE.
6. Read the chip data and click the 'Verify' button before saving the unverified BIN file.

---

### Safety Notes

> **Warning:** Verify whether the MCU is secured or unsecured based on the number of solder wires (4 wires for unsecured, 6 or more for secured).
>
> **Warning:** Check the SMOK status reports in the Dialog Box at the bottom left to ensure proper connection before saving.
>

---

## Source

- **Document:** `advanced automotive immobilizer programming book 2017.pdf`
- **Page:** 14
