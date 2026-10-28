/**
 * Lightweight audio abstraction using Web Audio API oscillators.
 * Swap in real files under /public/audio later without changing call sites.
 * Playback only starts after an explicit user gesture (CTA click).
 */

export type ResultSoundKind = 'green' | 'yellow' | 'red'

export class AudioController {
  private ctx: AudioContext | null = null
  private muted = true
  private suspenseNodes: OscillatorNode[] = []
  private suspenseGain: GainNode | null = null
  private resultNodes: AudioNode[] = []

  isMuted(): boolean {
    return this.muted
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    if (muted) {
      this.stopAll()
    }
  }

  toggleMute(): boolean {
    this.setMuted(!this.muted)
    return this.muted
  }

  /** Call from a click handler so the AudioContext can resume. */
  async unlock(): Promise<void> {
    const ctx = this.ensureContext()
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }
  }

  async playSuspense(): Promise<void> {
    if (this.muted) return
    await this.unlock()
    this.stopSuspense()

    const ctx = this.ensureContext()
    const gain = ctx.createGain()
    gain.gain.value = 0.04
    gain.connect(ctx.destination)
    this.suspenseGain = gain

    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(110, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 1.6)
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.6)
    osc.connect(gain)
    osc.start()
    this.suspenseNodes = [osc]
  }

  stopSuspense(): void {
    for (const osc of this.suspenseNodes) {
      try {
        osc.stop()
        osc.disconnect()
      } catch {
        /* already stopped */
      }
    }
    this.suspenseNodes = []
    if (this.suspenseGain) {
      try {
        this.suspenseGain.disconnect()
      } catch {
        /* ignore */
      }
      this.suspenseGain = null
    }
  }

  async playResult(kind: ResultSoundKind): Promise<void> {
    if (this.muted) return
    await this.unlock()
    this.stopSuspense()
    this.stopResult()

    const ctx = this.ensureContext()
    if (kind === 'green') {
      this.playBellPair(ctx)
    } else if (kind === 'red') {
      this.playSiren(ctx)
    } else {
      this.playSoftChime(ctx)
    }
  }

  stopAll(): void {
    this.stopSuspense()
    this.stopResult()
  }

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    return this.ctx
  }

  private stopResult(): void {
    for (const node of this.resultNodes) {
      try {
        if (node instanceof OscillatorNode) {
          node.stop()
        }
        node.disconnect()
      } catch {
        /* ignore */
      }
    }
    this.resultNodes = []
  }

  private playBellPair(ctx: AudioContext): void {
    const times = [0, 0.22]
    const freqs = [880, 1174]
    for (let i = 0; i < times.length; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freqs[i]!
      const t = ctx.currentTime + times[i]!
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.5)
      this.resultNodes.push(osc, gain)
    }
  }

  private playSiren(ctx: AudioContext): void {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    const t = ctx.currentTime
    osc.frequency.setValueAtTime(440, t)
    osc.frequency.linearRampToValueAtTime(880, t + 0.35)
    osc.frequency.linearRampToValueAtTime(440, t + 0.7)
    osc.frequency.linearRampToValueAtTime(880, t + 1.05)
    gain.gain.value = 0.05
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 1.1)
    this.resultNodes.push(osc, gain)
  }

  private playSoftChime(ctx: AudioContext): void {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    const t = ctx.currentTime
    osc.frequency.value = 660
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.08, t + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.55)
    this.resultNodes.push(osc, gain)
  }
}

export const audioController = new AudioController()
