import { describe, expect, it } from 'vitest'
import { calculateEstimate, weeksBetweenAges } from './formula'

describe('weeksBetweenAges', () => {
  it('matches the client example: age 39 from 16 → 1198 weeks', () => {
    expect(weeksBetweenAges(39)).toBe(1198)
  })

  it('rejects ages below the starting age', () => {
    expect(() => weeksBetweenAges(15)).toThrow()
  })
})

describe('calculateEstimate', () => {
  it('computes weeks × 3 × 11 × 100 for age 39', () => {
    // Client text claimed 39,534,000; exact arithmetic is 3,953,400.
    expect(calculateEstimate(39)).toBe(3_953_400)
  })

  it('rejects non-integer and out-of-range ages', () => {
    expect(() => calculateEstimate(20.5)).toThrow()
    expect(() => calculateEstimate(15)).toThrow()
    expect(() => calculateEstimate(100)).toThrow()
  })
})
