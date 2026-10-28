import { describe, expect, it } from 'vitest'
import { validateFaxForm } from './validate'

describe('validateFaxForm', () => {
  it('accepts trimmed valid input', () => {
    const result = validateFaxForm({
      name: '  betty jones ',
      cityState: ' new york ny ',
      age: '35',
    })
    expect(result.errors).toEqual({})
    expect(result.data).toEqual({
      name: 'betty jones',
      cityState: 'new york ny',
      age: 35,
    })
  })

  it('rejects missing fields and invalid ages', () => {
    const result = validateFaxForm({ name: '', cityState: '', age: '12' })
    expect(result.data).toBeUndefined()
    expect(result.errors.name).toBeTruthy()
    expect(result.errors.cityState).toBeTruthy()
    expect(result.errors.age).toBeTruthy()
  })
})
