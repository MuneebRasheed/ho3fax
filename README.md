# Ho3Fax

Playful novelty calculator / dating-themed entertainment experience.  
**For entertainment purposes only** — results are fictional, not verified facts about any real person.

## Stack

- Vite + React 19 + TypeScript
- Yarn
- Vitest for unit tests
- No backend, database, or payments in this phase

## Setup

```bash
yarn
yarn dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
yarn test      # unit tests
yarn build     # production build
yarn preview   # preview production build
```

## Product behavior

1. Enter name, city & state, and age (16–99).
2. Tap **Run the Fax**.
3. A short suspense animation runs; the risk meter animates.
4. A fictional estimate appears with a novelty zone (green / yellow / red).
5. Searching the **same normalized name** again in the same tab returns the **same** cached result.
6. Refreshing the page or opening a new tab clears the in-memory session cache.

Sound starts muted by default. Unmute with the header control; audio only plays after you click **Run the Fax**.

### Age → weeks

Age is converted to **weeks** (not years), matching the client example:
age 39 from starting age 16 → **1,198 weeks** → `1198 × 3 × 11 × 100` = **3,953,400** before variation.

### Variation

Each new session key gets one random signed percent from **±10 / ±15 / ±20 / ±25** (equal chance; **0% excluded**). Applied to the total estimate. Cached for the rest of the tab session.

### Name novelty list (entertainment only)

Owner-supplied rates boost the estimate and risk meter when the name matches:

| Name | Rate |
|------|------|
| Emily | 90% |
| Stephanie | 73% |
| Melissa | 72% |
| Nicole | 70% |
| Elizabeth | 66% |

These are novelty entertainment values — not real statistics about people.

## Configuration

Tunable values live in [`src/config.ts`](src/config.ts):

| Constant | Default | Meaning |
|----------|---------|---------|
| `STARTING_AGE` | `16` | Assumed start age for week count |
| `WEEKS_PER_YEAR` | `1198/23` | Scaled so age 39 → 1,198 weeks (client example) |
| `TIMES_PER_WEEK` | `3` | Formula factor |
| `MOVEMENT_FACTOR` | `11` | Formula factor |
| `STROKES_PER_ENCOUNTER` | `100` | Formula factor |
| `VARIATION_PERCENTS` | `±10/15/20/25` | Session variation set (no 0%) |
| `NAME_NOVELTY_RATES` | Emily…Elizabeth | Entertainment name boosts |
| `NAME_ESTIMATE_WEIGHT` | `0.5` | Fraction of name rate added to estimate |
| `NAME_RISK_WEIGHT` | `0.7` | Blend weight of name rate into risk score |
| `RISK_GREEN_MAX` / `RISK_YELLOW_MAX` | `40` / `70` | Meter thresholds |
| `CALCULATING_MS` | `1800` | Suspense duration |

## Theme

**Navy & Gold** (client blue + yellow direction)

- Background `#0A1740`
- Cards `#1A367C`
- Accent `#E8C46A`
- Text `#F7F8FC`

## Known limitations / deferred

- No payment gate ($0.99 per search) yet
- No persistent search history or server storage
- Name novelty list is fictional entertainment, not verified data
- Audio uses Web Audio oscillator stubs until final licensed assets are supplied
- Logo is typographic until a client asset is provided
- Session cache is in-memory only (clears on full reload)

## Requirements

See [`HO3FAX_REQUIREMENTS.md`](HO3FAX_REQUIREMENTS.md) for the full PRD.
