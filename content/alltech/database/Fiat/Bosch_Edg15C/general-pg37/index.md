---
title: "Fiat Bosch Edg15C — ECU Info Pending"
date: 2026-08-23
draft: false
tags: ["fiat", "unknown", "bench"]
categories: ["Database", "Immobilizer"]
brand: "Fiat"
model: "Bosch Edg15C"
ecu: "Unknown"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | Fiat |
| **Model** | Bosch Edg15C |
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

> **Required Tool:** I/O Terminal / Frequency Generator

1. For SMART BOSCH EDG15C-5.X: Connect +12V to pins 106 and 114; KLINE to pin 110; GND to pin 116.
2. For FIAT/ALFA/LANCIA BOSCH EDC15C7 SPECIAL (Normal / Recovery Mode): Connect +12V to pins 4 and 58; KLINE to pin 48; GND to pin 1.
3. For FIAT/ALFA/LANCIA Special Mode (Immobiliser Bypass): Connect all Normal/Recovery Mode pins, plus GND to pin 91, FX 15500-16100 Hz Square Wave 0/5V to pin 100, FY 15500-16100 Hz Square Wave Inverted 0/5V to pin 99, and FZ 9800-10200 Hz Square Wave 0/5V to pin 103.

### Wiring / Pin Connections (from steps)

- For SMART BOSCH EDG15C-5.X: Connect +12V to pins 106 and 114; KLINE to pin 110; GND to pin 116.
- For FIAT/ALFA/LANCIA BOSCH EDC15C7 SPECIAL (Normal / Recovery Mode): Connect +12V to pins 4 and 58; KLINE to pin 48; GND to pin 1.
- For FIAT/ALFA/LANCIA Special Mode (Immobiliser Bypass): Connect all Normal/Recovery Mode pins, plus GND to pin 91, FX 15500-16100 Hz Square Wave 0/5V to pin 100, FY 15500-16100 Hz Square Wave Inverted 0/5V to pin 99, and FZ 9800-10200 Hz Square Wave 0/5V to pin 103.

---

### Safety Notes

> **Warning:** If ECU is Virgin, Special Mode Pins are not required.
>
> **Warning:** Special Mode connection method bypasses immobiliser.
>
> **Warning:** Refer to FREQGENEDC15 manual document from www.ioterminal.com for instructions on constructing the frequency generator.
>

---

## Source

- **Document:** `50 PCM PINES CAN.pdf`
- **Page:** 37
