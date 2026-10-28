import type { FaxFormErrors, FaxFormValues } from '../lib/validate'
import { IconCalendar, IconPerson, IconPin, IconRocket } from './icons'

type SearchFormProps = {
  values: FaxFormValues
  errors: FaxFormErrors
  disabled: boolean
  onChange: (field: keyof FaxFormValues, value: string) => void
  onSubmit: () => void
}

export function SearchForm({
  values,
  errors,
  disabled,
  onChange,
  onSubmit,
}: SearchFormProps) {
  return (
    <form
      className="hf-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      noValidate
    >
      <div className="hf-field">
        <label className="hf-field__label" htmlFor="her-name">
          <IconPerson className="hf-field__icon" />
          Her Name
        </label>
        <input
          id="her-name"
          className={`hf-input${errors.name ? ' hf-input--error' : ''}`}
          name="name"
          autoComplete="off"
          placeholder="e.g. betty jones"
          value={values.name}
          disabled={disabled}
          onChange={(e) => onChange('name', e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'her-name-error' : undefined}
        />
        {errors.name ? (
          <p id="her-name-error" className="hf-field__error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="hf-field">
        <label className="hf-field__label" htmlFor="her-city">
          <IconPin className="hf-field__icon" />
          Her City and State
        </label>
        <input
          id="her-city"
          className={`hf-input${errors.cityState ? ' hf-input--error' : ''}`}
          name="cityState"
          autoComplete="off"
          placeholder="e.g. new york ny"
          value={values.cityState}
          disabled={disabled}
          onChange={(e) => onChange('cityState', e.target.value)}
          aria-invalid={Boolean(errors.cityState)}
          aria-describedby={errors.cityState ? 'her-city-error' : undefined}
        />
        {errors.cityState ? (
          <p id="her-city-error" className="hf-field__error" role="alert">
            {errors.cityState}
          </p>
        ) : null}
      </div>

      <div className="hf-field">
        <label className="hf-field__label" htmlFor="her-age">
          <IconCalendar className="hf-field__icon" />
          Her Age
        </label>
        <input
          id="her-age"
          className={`hf-input${errors.age ? ' hf-input--error' : ''}`}
          name="age"
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 35"
          value={values.age}
          disabled={disabled}
          onChange={(e) => onChange('age', e.target.value)}
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? 'her-age-error' : undefined}
        />
        {errors.age ? (
          <p id="her-age-error" className="hf-field__error" role="alert">
            {errors.age}
          </p>
        ) : null}
      </div>

      <button type="submit" className="hf-cta" disabled={disabled}>
        <IconRocket className="hf-cta__icon" />
        <span className="hf-cta__label">
          {disabled ? 'Running the Fax…' : 'Run the Fax'}
        </span>
        <span className="hf-cta__arrow" aria-hidden="true">
          →
        </span>
      </button>
    </form>
  )
}
