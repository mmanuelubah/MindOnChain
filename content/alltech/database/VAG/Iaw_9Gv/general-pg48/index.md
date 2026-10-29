---
title: "VAG Iaw 9Gv — ECU Info Pending"
date: 2026-08-23
draft: false
tags: ["unknown", "bench", "vag"]
categories: ["Database", "Immobilizer"]
brand: "VAG"
model: "Iaw 9Gv"
ecu: "Unknown"
---

## Vehicle Details

| Field | Value |
|-------|-------|
| **Brand** | VAG |
| **Model** | Iaw 9Gv |
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

> **Required Tool:** I/O TERMINAL with adapter BEMODEADP1

1. Connect +12V to pin A-15 and pin A-33
2. Connect GND to pin A-54
3. Connect CANH to pin A-38
4. Connect CANL to pin A-37
5. Operate I/O TERMINAL in bench mode via CAN1 using adapter BEMODEADP1

### Wiring / Pin Connections (from steps)

- Connect +12V to pin A-15 and pin A-33
- Connect GND to pin A-54
- Connect CANH to pin A-38
- Connect CANL to pin A-37

---

### Safety Notes

> **Warning:** For bench mode, special adapter BEMODEADP1 is required.
>

---

## Source

- **Document:** `50 PCM PINES CAN.pdf`
- **Page:** 48
