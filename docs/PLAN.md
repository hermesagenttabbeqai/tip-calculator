# Development Plan — Tip Calculator

| Field | Value |
|---|---|
| **Project** | tip-calculator |
| **Version** | v1 |
| **Date** | 2026-10-01 |
| **Based on** | BRD v1 |

---

## 1 Technical Stack

| Layer | Choice | Reason |
|---|---|---|
| Markup | HTML5 | Static, no build step needed |
| Style | CSS3 (custom properties, flexbox) | No framework; keeps the app small and fast |
| Logic | Vanilla JavaScript (ES2020) | No dependencies; runs anywhere |
| Tests | Playwright (headless browser) | End-to-end tests that match the BRD acceptance checklist |
| CI | GitHub Actions (already in template) | Runs tests on every push; required to pass before merge |
| Deploy | GitHub Pages (workflow-based) | Already configured |

---

## 2 File Structure

```
tip-calculator/
├── index.html          # Single page; all UI
├── style.css           # Mobile-first styles; CSS variables for theming
├── app.js              # All calculator logic; no side effects at module level
├── tests/
│   └── tip.spec.js     # Playwright end-to-end tests
├── docs/
│   ├── BRD.md
│   ├── PLAN.md
│   └── approvals.md
└── .github/
    └── workflows/
        ├── test.yml    # Run Playwright on every push/PR
        └── deploy.yml  # Deploy to GitHub Pages on merge to main
```

---

## 3 Screens and Flow

**Single screen — Tip Calculator**

1. **Bill Amount** — numeric input, placeholder "0.00"
2. **Tip %** — three preset buttons (10 / 15 / 20) + a "Custom %" number input
3. **People** — stepper (+/−) + direct number input, min 1
4. **Rounding toggle** — checkbox "Round up to nearest $1"
5. **Currency selector** — dropdown ($, €, £, SAR)
6. **Results panel** — Tip Amount / Total Bill / Per Person (updates live)
7. **Reset button** — clears all fields to defaults

All calculations happen on every `input` event — no "Calculate" button needed.

---

## 4 Calculation Rules

```
tip_amount    = bill * (tip_pct / 100)
total         = bill + tip_amount
per_person    = total / people
if rounding:  per_person = ceil(per_person)
```

Default state: bill = "", tip_pct = 15, people = 1, rounding = off, currency = $

---

## 5 GitHub Issues (work breakdown)

| # | Title | Label | BR IDs |
|---|---|---|---|
| 1 | Set up project scaffold (HTML/CSS/JS skeleton + CI workflow) | stage:dev | NFR-06 |
| 2 | Implement bill input and live tip/total calculation | stage:dev | BR-01, BR-02, BR-03, BR-04, BR-05 |
| 3 | Implement bill splitting (people input, per-person amount) | stage:dev | BR-06, BR-07 |
| 4 | Implement Reset button | stage:dev | BR-08 |
| 5 | Implement input validation and error messages | stage:dev | BR-09, BR-10 |
| 6 | Implement rounding toggle (R-01) and currency selector (R-02) | stage:dev | R-01, R-02 |
| 7 | Write Playwright end-to-end tests (acceptance checklist) | stage:dev | all BRs |
| 8 | Polish: mobile layout, touch targets, contrast, accessibility | stage:dev | NFR-01–NFR-05 |

Each issue becomes a branch (`feature/<issue-number>-<slug>`), a pull request, and passes CI before merge.

---

## 6 Merge Order

Issues 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 (sequential; each PR builds on the last)

---

## 7 Definition of Done

- All 8 PRs merged to main via approved pull requests.
- CI `test` check passes on main.
- GitHub Pages URL loads the app with no console errors.
- All items in the BRD acceptance checklist pass manually.
