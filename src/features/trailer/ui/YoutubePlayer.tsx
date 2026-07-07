import clsx from 'clsx'

import { type YoutubeEmbedVariant } from '../lib'
import useYoutubePlayer from '../model/useYoutubePlayer'

interface YoutubePlayerProps {
  title: string
  src: string
  variant: YoutubeEmbedVariant
  onUnavailable?: () => void
}

const BASE_CLASS = 'absolute inset-0 w-full h-full'
const BACKGROUND_CLASS =
  'scale-[1.35] [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:object-cover'

function YoutubePlayer({
  title,
  src,
  variant,
  onUnavailable,
}: YoutubePlayerProps) {
  const { containerRef } = useYoutubePlayer({
    src,
    variant,
    onUnavailable,
  })

  const className = clsx(
    BASE_CLASS,
    variant === 'background' && BACKGROUND_CLASS,
  )

  return (
    <div
      ref={containerRef}
      title={`${title} 트레일러`}
      className={className}
      aria-label={`${title} 트레일러`}
    />
  )
}

export default YoutubePlayer
