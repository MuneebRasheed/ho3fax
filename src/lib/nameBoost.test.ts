import { describe, expect, it } from 'vitest'
import {
  applyNameEstimateBoost,
  blendRiskScore,
  lookupNameNoveltyRate,
} from './nameBoost'

describe('lookupNameNoveltyRate', () => {
  it('matches the owner-supplied top-five rates (case-insensitive)', () => {
    expect(lookupNameNoveltyRate('Emily')).toBe(90)
    expect(lookupNameNoveltyRate('  STEPHANIE ')).toBe(73)
    expect(lookupNameNoveltyRate('melissa')).toBe(72)
    expect(lookupNameNoveltyRate('Nicole')).toBe(70)
    expect(lookupNameNoveltyRate('Elizabeth')).toBe(66)
  })

  it('returns 0 for names outside the list', () => {
    expect(lookupNameNoveltyRate('Sarah')).toBe(0)
    expect(lookupNameNoveltyRate('')).toBe(0)
  })
})

describe('applyNameEstimateBoost', () => {
  it('leaves estimate unchanged when rate is 0', () => {
    expect(applyNameEstimateBoost(1_000_000, 0)).toBe(1_000_000)
  })

  it('applies half-weight uplift for Emily (90%)', () => {
    // 1 + 0.9 * 0.5 = 1.45
    expect(applyNameEstimateBoost(1_000_000, 90)).toBe(1_450_000)
  })
})

describe('blendRiskScore', () => {
  it('returns variation score when no name rate', () => {
    expect(blendRiskScore(40, 0)).toBe(40)
  })

  it('pulls Emily toward red even with a low variation score', () => {
    // 90 * 0.7 + 0 * 0.3 = 63
    expect(blendRiskScore(0, 90)).toBe(63)
    // 90 * 0.7 + 100 * 0.3 = 93
    expect(blendRiskScore(100, 90)).toBe(93)
  })
})
