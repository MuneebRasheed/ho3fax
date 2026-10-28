import {
  MAX_AGE,
  MIN_AGE,
  MOVEMENT_FACTOR,
  STARTING_AGE,
  STROKES_PER_ENCOUNTER,
  TIMES_PER_WEEK,
  WEEKS_PER_YEAR,
} from '../config'

export function weeksBetweenAges(age: number, startingAge = STARTING_AGE): number {
  if (!Number.isFinite(age) || age < startingAge) {
    throw new Error('Age must be a finite number at or above the starting age')
  }
  return Math.round((age - startingAge) * WEEKS_PER_YEAR)
}

/**
 * Fictional entertainment estimate from age → weeks → formula.
 * Client rule: use weeks, not years. Example: age 39 from 16 → 1,198 weeks
 * → 1,198 × 3 × 11 × 100 = 3,953,400
 * (Conversation text showed 39,534,000 — that figure has an extra zero.)
 */
export function calculateEstimate(age: number): number {
  if (!Number.isInteger(age) || age < MIN_AGE || age > MAX_AGE) {
    throw new Error(`Age must be an integer between ${MIN_AGE} and ${MAX_AGE}`)
  }
  const weeks = weeksBetweenAges(age)
  return weeks * TIMES_PER_WEEK * MOVEMENT_FACTOR * STROKES_PER_ENCOUNTER
}
