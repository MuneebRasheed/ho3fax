import { formatEstimate } from '../lib/format'
import type { FaxResult } from '../lib/sessionCache'
import { IconGauge } from './icons'

type ResultCardProps =
  | {
      placeholder: true
      name?: never
      result?: never
      flavor?: never
    }
  | {
      placeholder?: false
      name: string
      result: FaxResult
      flavor: string
    }

export function ResultCard(props: ResultCardProps) {
  if (props.placeholder) {
    return (
      <section className="hf-result hf-result--placeholder" aria-live="polite">
        <p className="hf-result__hint">
          Run the Fax to reveal a fictional entertainment score.
        </p>
      </section>
    )
  }

  const { name, result, flavor } = props

  return (
    <section
      className={`hf-result hf-result--${result.zone}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="hf-result__avatar" aria-hidden="true">
        <div className="hf-result__avatar-face" />
      </div>
      <div className="hf-result__body">
        <h2 className="hf-result__name">{name}</h2>
        <p className="hf-result__score">
          <IconGauge className="hf-result__score-icon" />
          <span className="hf-result__score-value">
            {formatEstimate(result.estimate)}
          </span>
        </p>
        <p className="hf-result__flavor">{flavor}</p>
        <p className="hf-result__note">Fictional entertainment score only</p>
      </div>
    </section>
  )
}
