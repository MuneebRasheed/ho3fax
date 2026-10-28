import { describe, expect, it } from 'vitest'
import { scoreToZone, variationToRiskScore } from './riskMeter'

describe('variationToRiskScore', () => {
  it('maps -25 → 0, 0 → 50, +25 → 100', () => {
    expect(variationToRiskScore(-25)).toBe(0)
    expect(variationToRiskScore(0)).toBe(50)
    expect(variationToRiskScore(25)).toBe(100)
  })
})

describe('scoreToZone', () => {
  it('uses green < 40, yellow ≤ 70, red > 70', () => {
    expect(scoreToZone(0)).toBe('green')
    expect(scoreToZone(39)).toBe('green')
    expect(scoreToZone(40)).toBe('yellow')
    expect(scoreToZone(70)).toBe('yellow')
    expect(scoreToZone(71)).toBe('red')
  })
})
