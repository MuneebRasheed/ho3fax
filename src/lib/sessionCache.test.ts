import { describe, expect, it } from 'vitest'
import { calculateEstimate } from './formula'
import { scoreToZone, variationToRiskScore } from './riskMeter'
import { normalizeName, SessionCache } from './sessionCache'
import { applyVariation } from './variation'

function makeResult(age: number, percent: number, nameNoveltyRate = 0) {
  const baseEstimate = calculateEstimate(age)
  const estimate = applyVariation(baseEstimate, percent)
  const riskScore = variationToRiskScore(percent)
  return {
    baseEstimate,
    estimate,
    variationPercent: percent,
    nameNoveltyRate,
    riskScore,
    zone: scoreToZone(riskScore),
  }
}

describe('normalizeName', () => {
  it('trims, lowercases, and collapses whitespace', () => {
    expect(normalizeName('  Betty   Jones ')).toBe('betty jones')
  })
})

describe('SessionCache', () => {
  it('returns the same result for the same normalized key', () => {
    const cache = new SessionCache()
    const key = normalizeName('Sarah')
    const first = makeResult(30, 15)
    cache.set(key, first)
    expect(cache.get(normalizeName('  SARAH '))).toEqual(first)
  })

  it('allows different keys to hold different results', () => {
    const cache = new SessionCache()
    cache.set(normalizeName('Sarah'), makeResult(30, 10))
    cache.set(normalizeName('Jessica'), makeResult(30, -20))
    expect(cache.get(normalizeName('Sarah'))?.variationPercent).toBe(10)
    expect(cache.get(normalizeName('Jessica'))?.variationPercent).toBe(-20)
  })

  it('clears to an empty cache for a new session', () => {
    const cache = new SessionCache()
    cache.set(normalizeName('Sarah'), makeResult(30, 10))
    cache.clear()
    expect(cache.size).toBe(0)
    expect(cache.get(normalizeName('Sarah'))).toBeUndefined()
  })
})
