---
title: "Chevrolet Captiva — ECU Info Pending"
date: 2026-08-23
draft: false
tags: ["unknown", "bench", "chevrolet"]
categories: ["Database", "Immobilizer"]
brand: "Chevrolet"
model: "Captiva"
ecu: "Unknown"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | Chevrolet |
| **Model** | Captiva |
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

> **Required Tool:** I/O TERMINAL

1. Connect +12V power to pins 4, 18, and 39
2. Connect KLINE line to pin 38
3. Connect GND to pin 2
4. Access FLASH (ST10F275) or EEPROM (95080) using I/O TERMINAL

### Wiring / Pin Connections (from steps)

- Connect +12V power to pins 4, 18, and 39
- Connect KLINE line to pin 38
- Connect GND to pin 2

---

### Safety Notes

> **Warning:** I/O TERMINAL works by KLINE ONLY
>

---

## Source

- **Document:** `50 PCM PINES CAN.pdf`
- **Page:** 40
