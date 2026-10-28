import { IconVolumeOff, IconVolumeOn } from './icons'

type SoundToggleProps = {
  muted: boolean
  onToggle: () => void
}

export function SoundToggle({ muted, onToggle }: SoundToggleProps) {
  return (
    <button
      type="button"
      className="hf-sound"
      onClick={onToggle}
      aria-pressed={!muted}
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
    >
      {muted ? (
        <IconVolumeOff className="hf-sound__icon" />
      ) : (
        <IconVolumeOn className="hf-sound__icon" />
      )}
    </button>
  )
}
