import { IconBolt, IconCrown, IconHeart, IconSmile } from './icons'

const features = [
  {
    Icon: IconHeart,
    title: 'Fun',
    copy: 'Because dating should be fun.',
  },
  {
    Icon: IconSmile,
    title: 'User Friendly',
    copy: 'Simple. Fast. No drama.',
  },
  {
    Icon: IconBolt,
    title: 'Quick & Easy',
    copy: 'Get the facts in seconds.',
  },
  {
    Icon: IconCrown,
    title: 'Built to Win',
    copy: 'Smarter dates. Better decisions.',
  },
] as const

export function FeatureBar() {
  return (
    <ul className="hf-features">
      {features.map(({ Icon, title, copy }) => (
        <li key={title} className="hf-features__item">
          <span className="hf-features__icon-wrap">
            <Icon className="hf-features__icon" />
          </span>
          <span className="hf-features__title">{title}</span>
          <span className="hf-features__copy">{copy}</span>
        </li>
      ))}
    </ul>
  )
}
