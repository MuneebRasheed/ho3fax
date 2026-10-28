/** Product configuration — change here rather than scattering magic numbers. */

export const STARTING_AGE = 16
export const MIN_AGE = 16
export const MAX_AGE = 99

/**
 * Age is converted to weeks (not years) for the formula.
 * Factor chosen so age 39 (23 years from 16) → 1,198 weeks,
 * matching the client example. Plain 52 would yield 1,196.
 */
export const WEEKS_PER_YEAR = 1198 / 23

/** Client formula: weeks × TIMES_PER_WEEK × MOVEMENT_FACTOR × STROKES_PER_ENCOUNTER */
export const TIMES_PER_WEEK = 3
export const MOVEMENT_FACTOR = 11
export const STROKES_PER_ENCOUNTER = 100

/**
 * Session variation magnitudes (±).
 * Equal chance of each magnitude and each sign; base 0% is excluded
 * so same-age searches still feel different across names.
 * Applied to the total estimate: estimate × (1 + percent/100).
 */
export const VARIATION_PERCENTS = [10, 15, 20, 25] as const

/**
 * Owner-supplied novelty name rates (entertainment only — not real stats).
 * Matched names get a boost on the estimate and risk meter.
 */
export const NAME_NOVELTY_RATES: Readonly<Record<string, number>> = {
  emily: 90,
  stephanie: 73,
  melissa: 72,
  nicole: 70,
  elizabeth: 66,
}

/** How much of a matched name rate is added on top of the varied estimate. */
export const NAME_ESTIMATE_WEIGHT = 0.5

/** Blend when a name matches: nameRate × W + variationScore × (1 − W). */
export const NAME_RISK_WEIGHT = 0.7

/** Risk meter zones (0–100 novelty score). */
export const RISK_GREEN_MAX = 40
export const RISK_YELLOW_MAX = 70

/** Suspense animation duration before revealing the result (ms). */
export const CALCULATING_MS = 1800
