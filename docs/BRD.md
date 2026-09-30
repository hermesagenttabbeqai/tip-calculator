# Business Requirements Document — Tip Calculator

| Field | Value |
|---|---|
| **Project** | tip-calculator |
| **Requester** | Mhmd H |
| **Date** | 2026-10-01 |
| **Version** | v1 |

---

## 1 Summary

A mobile-first static web app that helps restaurant diners calculate how much to tip and how to split the bill. Users enter the bill amount, choose a tip percentage (preset or custom), and optionally split the total across multiple people. The app shows all amounts instantly with no page reload.

---

## 2 Users and Goals

| User | Goal |
|---|---|
| Diner at a restaurant | Quickly calculate a fair tip and know how much each person owes |

---

## 3 Functional Requirements

| ID | Requirement |
|---|---|
| BR-01 | The user can enter a bill amount (decimal numbers accepted, e.g. 42.50). |
| BR-02 | The user can select a preset tip percentage: 10 %, 15 %, or 20 %. |
| BR-03 | The user can enter a custom tip percentage (overrides the selected preset). |
| BR-04 | The app shows the tip amount in real time as the user changes any input. |
| BR-05 | The app shows the total bill (bill + tip) in real time. |
| BR-06 | The user can enter the number of people splitting the bill (minimum 1). |
| BR-07 | The app shows the amount each person owes (total ÷ people) in real time. |
| BR-08 | The user can reset all fields to their default state with a single button. |
| BR-09 | The app shows an error message if the bill amount is missing or invalid (negative, letters). |
| BR-10 | The app shows an error if the number of people is less than 1 or not a whole number. |

---

## 4 Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | The app loads in under 2 seconds on a standard mobile connection. |
| NFR-02 | All interactive elements are touch-friendly (minimum 44 × 44 px tap targets). |
| NFR-03 | The layout is usable on screens from 320 px wide and up. |
| NFR-04 | The app works on the last two versions of Chrome, Safari and Firefox (iOS and Android). |
| NFR-05 | Colour contrast meets WCAG 2.1 AA for all text. |
| NFR-06 | No server, no database, no login required — fully static. |

---

## 5 Recommendations Accepted

| # | Feature | Why |
|---|---|---|
| R-01 | **Rounding toggle** — option to round each person's share up to the nearest whole dollar. | Avoids awkward cent splits when paying cash. |
| R-02 | **Bill currency symbol selector** ($ / € / £ / SAR) | Useful for international visitors or travellers. |

---

## 6 Assumptions

- Default tip preset highlighted on load: **15 %**.
- Default number of people: **1**.
- Currency display is cosmetic only (no conversion); default is **$**.
- The app does not remember previous bills between visits.
- Rounding toggle (R-01) rounds *up* only; it never rounds down.

---

## 7 Out of Scope

- Tax calculation (not requested).
- Bill itemisation per person.
- Payment processing or integrations.
- User accounts or history storage.
- Multi-language / localisation (English only for now).

---

## 8 Acceptance Checklist

- [ ] Entering a bill amount and selecting a preset shows the correct tip and total instantly.
- [ ] Entering a custom % overrides the preset and recalculates.
- [ ] Changing the number of people updates the per-person amount.
- [ ] Invalid inputs (letters, negative numbers, zero people) show a clear error message.
- [ ] Pressing Reset clears all fields and returns to defaults.
- [ ] Rounding toggle rounds each person's share up to the nearest dollar.
- [ ] Currency selector changes the symbol shown.
- [ ] App is usable on a 375 px wide phone screen (iPhone SE size).
- [ ] Deployed and accessible via the GitHub Pages URL.
