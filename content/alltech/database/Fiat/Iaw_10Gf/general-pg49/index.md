---
title: "Fiat Iaw 10Gf — ECU Info Pending"
date: 2026-08-23
draft: false
tags: ["fiat", "unknown", "bench"]
categories: ["Database", "Immobilizer"]
brand: "Fiat"
model: "Iaw 10Gf"
ecu: "Unknown"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | Fiat |
| **Model** | Iaw 10Gf |
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

> **Required Tool:** I/O TERMINAL with BEMODEADP1 adapter

1. Connect +12V to pins A-22 and A-54
2. Connect GND to pin A-52
3. Connect CANH to pin A-12
4. Connect CANL to pin A-24

### Wiring / Pin Connections (from steps)

- Connect +12V to pins A-22 and A-54
- Connect GND to pin A-52
- Connect CANH to pin A-12
- Connect CANL to pin A-24

---

### Safety Notes

> **Warning:** Works in bench mode by CAN1 only.
>
> **Warning:** Requires special adapter BEMODEADP1 (schematic available on www.ioterminal.com).
>

---

## Source

- **Document:** `50 PCM PINES CAN.pdf`
- **Page:** 49
