import { MAX_AGE, MIN_AGE } from '../config'

export type FaxFormValues = {
  name: string
  cityState: string
  age: string
}

export type FaxFormErrors = Partial<Record<keyof FaxFormValues, string>>

export type ValidatedFaxInput = {
  name: string
  cityState: string
  age: number
}

export function validateFaxForm(values: FaxFormValues): {
  errors: FaxFormErrors
  data?: ValidatedFaxInput
} {
  const errors: FaxFormErrors = {}
  const name = values.name.trim()
  const cityState = values.cityState.trim()
  const ageRaw = values.age.trim()

  if (!name) {
    errors.name = 'Enter a name'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!cityState) {
    errors.cityState = 'Enter city and state'
  }

  let age = NaN
  if (!ageRaw) {
    errors.age = 'Enter an age'
  } else if (!/^\d+$/.test(ageRaw)) {
    errors.age = 'Age must be a whole number'
  } else {
    age = Number(ageRaw)
    if (age < MIN_AGE || age > MAX_AGE) {
      errors.age = `Age must be between ${MIN_AGE} and ${MAX_AGE}`
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  return {
    errors: {},
    data: { name, cityState, age },
  }
}
