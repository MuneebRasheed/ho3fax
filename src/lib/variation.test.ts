import { describe, expect, it } from 'vitest'
import { VARIATION_PERCENTS } from '../config'
import {
  applyVariation,
  isValidVariationPercent,
  pickVariation,
} from './variation'

describe('pickVariation', () => {
  it('returns a configured signed percentage', () => {
    for (let i = 0; i < 40; i++) {
      const { percent } = pickVariation()
      expect(isValidVariationPercent(percent)).toBe(true)
      expect(VARIATION_PERCENTS).toContain(Math.abs(percent) as 10 | 15 | 20 | 25)
    }
  })

  it('is deterministic with a fixed RNG sequence', () => {
    const values = [0.1, 0.1]
    let i = 0
    const random = () => values[i++] ?? 0
    expect(pickVariation(random)).toEqual({ percent: -10 })
  })
})

describe('applyVariation', () => {
  it('applies percentage to the base estimate', () => {
    expect(applyVariation(1000, 10)).toBe(1100)
    expect(applyVariation(1000, -25)).toBe(750)
  })
})
