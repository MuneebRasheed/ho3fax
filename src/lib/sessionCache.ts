import type { RiskZone } from './riskMeter'

export type FaxResult = {
  baseEstimate: number
  estimate: number
  variationPercent: number
  /** Owner-supplied entertainment rate when name matches top list; else 0. */
  nameNoveltyRate: number
  riskScore: number
  zone: RiskZone
}

export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ')
}

/** In-memory session cache — clears on full page reload / new tab. */
export class SessionCache {
  private readonly map = new Map<string, FaxResult>()

  get(key: string): FaxResult | undefined {
    return this.map.get(key)
  }

  set(key: string, value: FaxResult): void {
    this.map.set(key, value)
  }

  has(key: string): boolean {
    return this.map.has(key)
  }

  clear(): void {
    this.map.clear()
  }

  get size(): number {
    return this.map.size
  }
}

/** Module-level cache for the browser tab session. */
export const sessionCache = new SessionCache()
