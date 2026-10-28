import { zoneLabel, type RiskZone } from '../lib/riskMeter'
import { IconWarning } from './icons'

type RiskMeterProps = {
  score: number
  zone: RiskZone | null
  animating: boolean
}

export function RiskMeter({ score, zone, animating }: RiskMeterProps) {
  const clamped = Math.max(0, Math.min(100, score))
  const label = zone ? zoneLabel(zone) : 'Awaiting novelty score'

  return (
    <section
      className="hf-meter"
      aria-label="Risk slash stat meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-valuetext={`${Math.round(clamped)} — ${label}`}
      role="meter"
    >
      <div className="hf-meter__header">
        <IconWarning className="hf-meter__icon" />
        <h2 className="hf-meter__title">Risk / Stat Meter (0 – 100)</h2>
      </div>
      <div className="hf-meter__track">
        <div className="hf-meter__gradient" />
        <div
          className={`hf-meter__needle${animating ? ' hf-meter__needle--pulse' : ''}`}
          style={{ left: `${clamped}%` }}
        />
      </div>
      <p className="hf-meter__status">
        {animating ? 'Calculating novelty score…' : label}
      </p>
    </section>
  )
}
