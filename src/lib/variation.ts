import { VARIATION_PERCENTS } from '../config'

export type VariationChoice = {
  /** Signed percentage, e.g. -15 or 20 */
  percent: number
}

/**
 * Pick one signed variation from ±10/15/20/25.
 * Equal chance per magnitude and per sign; 0% is never chosen.
 * Percentage is applied to the total base estimate.
 */
export function pickVariation(
  random: () => number = Math.random,
): VariationChoice {
  const magnitude =
    VARIATION_PERCENTS[Math.floor(random() * VARIATION_PERCENTS.length)]!
  const sign = random() < 0.5 ? -1 : 1
  return { percent: sign * magnitude }
}

/** Apply variation to the total estimate: base × (1 + percent/100). */
export function applyVariation(base: number, percent: number): number {
  return Math.round(base * (1 + percent / 100))
}

export function isValidVariationPercent(percent: number): boolean {
  const abs = Math.abs(percent)
  return (VARIATION_PERCENTS as readonly number[]).includes(abs)
}
