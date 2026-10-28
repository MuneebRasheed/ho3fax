import logo from '../assets/logo.png'
import { SoundToggle } from './SoundToggle'

type HeaderProps = {
  muted: boolean
  onToggleMute: () => void
}

export function Header({ muted, onToggleMute }: HeaderProps) {
  return (
    <header className="hf-header">
      <div className="hf-header__brand">
        <h1 className="hf-logo">
          <img
            className="hf-logo__img"
            src={logo}
            alt="Ho3Fax. Know Before You Go…"
          />
        </h1>
      </div>
      <SoundToggle muted={muted} onToggle={onToggleMute} />
    </header>
  )
}
