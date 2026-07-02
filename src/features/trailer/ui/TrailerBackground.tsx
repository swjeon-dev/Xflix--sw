import { useEffect, useState } from 'react'

import { devLog, type MediaVideoType } from '@/shared'
import useGetVideo from '../model/useGetVideo'
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
  const [playbackUnavailable, setPlaybackUnavailable] = useState(false)
  const { trailerUrl, isLoading, status, error } = useGetVideo(
    contentId.toString(),
    mediaType,
    'background',
  )

  useEffect(() => {
    setPlaybackUnavailable(false)
  }, [contentId, mediaType])

  if (status === 'error' && error) {
    devLog({ message: error, type: 'error' })
  }

  if (
    isLoading ||
    status !== 'ready' ||
    !trailerUrl ||
    playbackUnavailable
  ) {
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
      title={contentTitle}
      src={trailerUrl}
      variant='background'
      onUnavailable={() => setPlaybackUnavailable(true)}
    />
  )
}

export default TrailerBackground
