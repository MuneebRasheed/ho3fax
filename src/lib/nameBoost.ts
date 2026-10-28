import {
  NAME_ESTIMATE_WEIGHT,
  NAME_NOVELTY_RATES,
  NAME_RISK_WEIGHT,
} from '../config'
import { normalizeName } from './sessionCache'

/** Returns the novelty rate for a name, or 0 if not in the entertainment list. */
export function lookupNameNoveltyRate(name: string): number {
  const key = normalizeName(name)
  return NAME_NOVELTY_RATES[key] ?? 0
}

/**
 * Extra estimate uplift for matched names (entertainment).
 * Emily (90) → ×1.45 when weight is 0.5.
 */
export function applyNameEstimateBoost(
  estimate: number,
  nameRate: number,
): number {
  if (nameRate <= 0) return estimate
  return Math.round(estimate * (1 + (nameRate / 100) * NAME_ESTIMATE_WEIGHT))
}

/**
 * Blend name novelty rate with variation-derived risk score.
 * Matched names lean toward their listed rate (still entertainment-only).
 */
export function blendRiskScore(
  variationScore: number,
  nameRate: number,
): number {
  if (nameRate <= 0) return variationScore
  const blended =
    nameRate * NAME_RISK_WEIGHT + variationScore * (1 - NAME_RISK_WEIGHT)
  return Math.round(Math.max(0, Math.min(100, blended)))
}
