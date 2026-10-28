import { RISK_GREEN_MAX, RISK_YELLOW_MAX } from '../config'

export type RiskZone = 'green' | 'yellow' | 'red'

/**
 * Maps variation percent (−25…+25) to a 0–100 novelty score.
 * Lower (downward) variation → greener; higher → redder.
 */
export function variationToRiskScore(percent: number): number {
  const clamped = Math.max(-25, Math.min(25, percent))
  // -25 → 0, 0 → 50, +25 → 100
  return Math.round(((clamped + 25) / 50) * 100)
}

export function scoreToZone(score: number): RiskZone {
  if (score < RISK_GREEN_MAX) return 'green'
  if (score <= RISK_YELLOW_MAX) return 'yellow'
  return 'red'
}

export function zoneLabel(zone: RiskZone): string {
  switch (zone) {
    case 'green':
      return 'Low novelty zone'
    case 'yellow':
      return 'Mid novelty zone'
    case 'red':
      return 'High novelty zone'
  }
}

export function flavorCopy(zone: RiskZone, nameNoveltyRate = 0): string {
  if (nameNoveltyRate > 0) {
    switch (zone) {
      case 'green':
        return 'Name novelty tick — still fictional fun only!!'
      case 'yellow':
        return 'Name novelty boost mid-scale — entertainment only!!'
      case 'red':
        return 'Name novelty boost spiked the meter — laughs only!!'
    }
  }
  switch (zone) {
    case 'green':
      return 'Looking smooth… keep the vibes light!!'
    case 'yellow':
      return 'Not bad… but keep your head on a swivel!!'
    case 'red':
      return 'Whoa — novelty meter spiked. Proceed for laughs only!!'
  }
}
