import { useEffect, useRef, useState } from 'react'
import { audioController } from '../audio/AudioController'
import { CALCULATING_MS } from '../config'
import { calculateEstimate } from '../lib/formula'
import {
  applyNameEstimateBoost,
  blendRiskScore,
  lookupNameNoveltyRate,
} from '../lib/nameBoost'
import {
  flavorCopy,
  scoreToZone,
  variationToRiskScore,
} from '../lib/riskMeter'
import {
  normalizeName,
  sessionCache,
  type FaxResult,
} from '../lib/sessionCache'
import {
  type FaxFormErrors,
  type FaxFormValues,
  validateFaxForm,
} from '../lib/validate'
import { applyVariation, pickVariation } from '../lib/variation'

export type CalculatorStatus = 'idle' | 'calculating' | 'success'

const emptyValues: FaxFormValues = {
  name: '',
  cityState: '',
  age: '',
}

function buildResult(name: string, age: number): FaxResult {
  const baseEstimate = calculateEstimate(age)
  const { percent } = pickVariation()
  const varied = applyVariation(baseEstimate, percent)
  const nameNoveltyRate = lookupNameNoveltyRate(name)
  const estimate = applyNameEstimateBoost(varied, nameNoveltyRate)
  const riskScore = blendRiskScore(
    variationToRiskScore(percent),
    nameNoveltyRate,
  )
  const zone = scoreToZone(riskScore)
  return {
    baseEstimate,
    estimate,
    variationPercent: percent,
    nameNoveltyRate,
    riskScore,
    zone,
  }
}

export function useFaxCalculator() {
  const [status, setStatus] = useState<CalculatorStatus>('idle')
  const [values, setValues] = useState<FaxFormValues>(emptyValues)
  const [errors, setErrors] = useState<FaxFormErrors>({})
  const [result, setResult] = useState<FaxResult | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [muted, setMuted] = useState(audioController.isMuted())
  const [meterScore, setMeterScore] = useState(0)
  const timerRef = useRef<number | null>(null)
  const sweepRef = useRef<number | null>(null)
  const pendingRef = useRef<{ fax: FaxResult; name: string } | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      if (sweepRef.current !== null) window.clearInterval(sweepRef.current)
    }
  }, [])

  const clearTimers = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (sweepRef.current !== null) {
      window.clearInterval(sweepRef.current)
      sweepRef.current = null
    }
  }

  const setField = (field: keyof FaxFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const toggleMute = () => {
    const next = audioController.toggleMute()
    setMuted(next)
  }

  const runFax = async () => {
    const { errors: nextErrors, data } = validateFaxForm(values)
    setErrors(nextErrors)
    if (!data) return

    clearTimers()
    await audioController.unlock()
    setStatus('calculating')
    setMeterScore(8)
    void audioController.playSuspense()

    const key = normalizeName(data.name)
    const cached = sessionCache.get(key)
    const fax = cached ?? buildResult(data.name, data.age)
    if (!cached) {
      sessionCache.set(key, fax)
    }
    pendingRef.current = { fax, name: data.name }

    let tick = 0
    sweepRef.current = window.setInterval(() => {
      tick += 1
      setMeterScore(8 + ((tick * 17) % 70))
    }, 160)

    timerRef.current = window.setTimeout(() => {
      clearTimers()
      audioController.stopSuspense()
      const pending = pendingRef.current
      if (!pending) return
      setResult(pending.fax)
      setDisplayName(pending.name)
      setMeterScore(pending.fax.riskScore)
      setStatus('success')
      void audioController.playResult(pending.fax.zone)
    }, CALCULATING_MS)
  }

  return {
    status,
    values,
    errors,
    result,
    displayName,
    flavor: result
      ? flavorCopy(result.zone, result.nameNoveltyRate)
      : '',
    muted,
    meterScore,
    setField,
    toggleMute,
    runFax,
  }
}
