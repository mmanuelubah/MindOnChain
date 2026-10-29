---
title: "PSA Bosch Edc15C2 — ECU Info Pending"
date: 2026-08-23
draft: false
tags: ["psa", "unknown", "bench"]
categories: ["Database", "Immobilizer"]
brand: "PSA"
model: "Bosch Edc15C2"
ecu: "Unknown"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | PSA |
| **Model** | Bosch Edc15C2 |
| **Year** | All / Unknown |

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

> **Required Tool:** I/O Terminal / Frequency Generator (FREQGENEDC15)

1. For PSA BOSCH EDC15C2: Connect Normal/Recovery pins (+12V to Z1-D1 and Z2-M1, KLINE to Z1-B4, GND to Z2-M4).
2. For BMW / Land Rover BOSCH EDC15C4: Connect Normal/Recovery pins (+12V to 1-1,8,9 and 4-26, KLINE to 4-32, GND to 1-4).
3. If ECU is Virgin, Special Mode pins are not required.
4. To bypass immobiliser using Special Mode on PSA EDC15C2, connect GND to Z2-G1, FX 15500-16100 Hz Square Wave 0/5V to Z2-K1, FY 15500-16100 Hz Square Wave Inverted 0/5V to Z2-J1, and FZ 9800-10200 Hz Square Wave 0/5V to Z2-G2 in addition to Normal pins.
5. To bypass immobiliser using Special Mode on BMW/Land Rover EDC15C4, connect GND to 3-33, FX 15500-16100 Hz Square Wave 0/5V to 3-6, FY 15500-16100 Hz Square Wave Inverted 0/5V to 3-31, and FZ 9800-10200 Hz Square Wave 0/5V to 3-4 in addition to Normal pins.

### Wiring / Pin Connections (from steps)

- For PSA BOSCH EDC15C2: Connect Normal/Recovery pins (+12V to Z1-D1 and Z2-M1, KLINE to Z1-B4, GND to Z2-M4).
- For BMW / Land Rover BOSCH EDC15C4: Connect Normal/Recovery pins (+12V to 1-1,8,9 and 4-26, KLINE to 4-32, GND to 1-4).
- If ECU is Virgin, Special Mode pins are not required.
- To bypass immobiliser using Special Mode on PSA EDC15C2, connect GND to Z2-G1, FX 15500-16100 Hz Square Wave 0/5V to Z2-K1, FY 15500-16100 Hz Square Wave Inverted 0/5V to Z2-J1, and FZ 9800-10200 Hz Square Wave 0/5V to Z2-G2 in addition to Normal pins.
- To bypass immobiliser using Special Mode on BMW/Land Rover EDC15C4, connect GND to 3-33, FX 15500-16100 Hz Square Wave 0/5V to 3-6, FY 15500-16100 Hz Square Wave Inverted 0/5V to 3-31, and FZ 9800-10200 Hz Square Wave 0/5V to 3-4 in addition to Normal pins.

---

### Safety Notes

> **Warning:** This connection method bypasses the immobiliser.
>
> **Warning:** In Special Mode, you must use both Normal or Recovery Mode Pins and Special Mode Pins.
>
> **Warning:** In other modes, do not use Special Mode pins.
>
> **Warning:** Refer to the FREQGENEDC15 manual document for instructions on building the frequency generator.
>

---

## Source

- **Document:** `50 PCM PINES CAN.pdf`
- **Page:** 38
