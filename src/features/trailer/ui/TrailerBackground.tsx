import { devLog, type MediaVideoType } from '@/shared'
import { useTrailerPlay } from '../model'
import YoutubePlayer from './YoutubePlayer'

interface TrailerBackgroundProps {
  contentId: number | string
  contentTitle: string
  mediaType?: MediaVideoType
  backdropUrl: string
}

function TrailerBackground({
  contentId,
  contentTitle,
  backdropUrl,
  mediaType = 'movie',
}: TrailerBackgroundProps) {
  const { isError, isReady, trailerUrl, error, markUnavailable } =
    useTrailerPlay(contentId.toString(), mediaType, 'background')

  if (isError && error) {
    devLog({ message: error, type: 'error' })
  }

  if (!isReady || !trailerUrl) {
    return (
      <img
        src={backdropUrl}
        alt={`${contentTitle} 포스터`}
        className='w-full h-full object-cover'
      />
    )
  }

  return (
    <YoutubePlayer
      variant='background'
      title={contentTitle}
      src={trailerUrl}
      onUnavailable={markUnavailable}
    />
  )
}

export default TrailerBackground
