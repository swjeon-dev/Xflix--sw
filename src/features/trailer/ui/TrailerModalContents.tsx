import { useEffect, useState } from 'react'

import { LoadingComponent, type MediaVideoType } from '@/shared'
import useGetVideo from '../model/useGetVideo'
import TrailerError from './TrailerError'
import YoutubePlayer from './YoutubePlayer'

interface TrailerModalContentsProps {
  contentId: number | string
  contentTitle: string
  mediaType: MediaVideoType
}

function TrailerModalContents({
  contentId,
  contentTitle,
  mediaType,
}: TrailerModalContentsProps) {
  const [playbackUnavailable, setPlaybackUnavailable] = useState(false)
  const { trailerUrl, isLoading, status, error } = useGetVideo(
    contentId.toString(),
    mediaType,
    'modal',
  )

  useEffect(() => {
    setPlaybackUnavailable(false)
  }, [contentId, mediaType])

  if (isLoading) {
    return (
      <LoadingComponent style='absolute inset-0 flex items-center justify-center bg-black text-white' />
    )
  }

  if (status === 'error') {
    return <TrailerError variant='error' message={error} />
  }

  if (status === 'empty' || !trailerUrl || playbackUnavailable) {
    return <TrailerError variant='empty' />
  }

  return (
    <YoutubePlayer
      title={contentTitle}
      src={trailerUrl}
      variant='modal'
      onUnavailable={() => setPlaybackUnavailable(true)}
    />
  )
}

export default TrailerModalContents
