---
title: "Toyota 1Kd (2015-2020) — Denso 1KD-FTV / 1GD-FTV"
date: 2026-08-23
draft: false
tags: ["eeprom", "non-obd", "denso", "bench", "toyota"]
categories: ["Database", "Immobilizer", "EEPROM / Non-OBD"]
brand: "Toyota"
model: "1Kd"
ecu: "1KD-FTV / 1GD-FTV"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | Toyota |
| **Model** | 1Kd |
| **Year** | 2015-2020 |

---

## ECU Details

| Field | Value |
|-------|-------|
| **Manufacturer** | Denso |
| **ECU Number** | 1KD-FTV / 1GD-FTV |

---

## Programming Instructions

**Method:** `BENCH`

### Bench / Wiring Steps

> **Required Tool:** Bench Flash Tool / ECU Power Supply

1. For 1KD-FTV (06.2015 - 08.2020):
2. Connect Ground (GND) to pin C36-12 (E1).
3. Connect Constant Power (+12V BATT) to pin G55-24 (BATT).
4. Connect Switched Power (+12V IGN) to pins G55-23 (+B), G55-22 (+B2), and G55-21 (IGSW).
5. Connect CAN High to pin G56-31 (CANH) and CAN Low to pin G56-25 (CANL).
6. For 1GD-FTV (06.2015 - NOW):
7. Connect Ground (GND) to pin C93-1 (E1).
8. Connect Constant Power (+12V BATT) to pin G57-23 (BATT).
9. Connect Switched Power (+12V IGN) to pins G57-24 (+B), G57-17 (+B2), and G58-24 (IGSW).
10. Connect CAN High to pin G58-35 (CANH) and CAN Low to pin G58-36 (CANL).

### Wiring / Pin Connections (from steps)

- Connect Ground (GND) to pin C36-12 (E1).
- Connect Constant Power (+12V BATT) to pin G55-24 (BATT).
- Connect Switched Power (+12V IGN) to pins G55-23 (+B), G55-22 (+B2), and G55-21 (IGSW).
- Connect CAN High to pin G56-31 (CANH) and CAN Low to pin G56-25 (CANL).
- Connect Ground (GND) to pin C93-1 (E1).
- Connect Constant Power (+12V BATT) to pin G57-23 (BATT).
- Connect Switched Power (+12V IGN) to pins G57-24 (+B), G57-17 (+B2), and G58-24 (IGSW).
- Connect CAN High to pin G58-35 (CANH) and CAN Low to pin G58-36 (CANL).

---

### Safety Notes

> **Warning:** Ensure proper power supply voltage before switching IGN power.
>
> **Warning:** Verify pin positions carefully on the ECU connector diagram prior to applying power.
>

---

## Source

- **Document:** `TOYOTA-ECU-PINOUT-ECU-PINOUT.pdf`
- **Page:** 4
