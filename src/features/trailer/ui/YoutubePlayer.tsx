import clsx from 'clsx'
import { type YoutubeEmbedVariant } from '../lib'

interface YoutubePlayerProps {
  title: string
  src: string
  variant: YoutubeEmbedVariant
}

const BASE_CLASS = 'absolute inset-0 w-full h-full'
const BACKGROUND_CLASS = 'object-cover pointer-events-none scale-[1.35]'

function YoutubePlayer({ title, src, variant }: YoutubePlayerProps) {
  const className = clsx(
    BASE_CLASS,
    variant === 'background' && BACKGROUND_CLASS,
  )

  return (
    <iframe
      title={`${title} 트레일러`}
      src={src}
      className={className}
      allow='encrypted-media; picture-in-picture; autoplay;'
      allowFullScreen
    />
  )
}

export default YoutubePlayer
