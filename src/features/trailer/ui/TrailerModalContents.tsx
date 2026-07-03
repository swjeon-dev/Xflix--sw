import { LoadingComponent } from '@/shared'
import type { MediaVideoType } from '../model/video.types'
import { useTrailerPlay } from '../model'
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
  const {
    isLoading,
    isError,
    isEmpty,
    isReady,
    trailerUrl,
    error,
    markUnavailable,
  } = useTrailerPlay(contentId.toString(), mediaType, 'modal')

  if (isLoading)
    return (
      <LoadingComponent style='absolute inset-0 flex items-center justify-center bg-black text-white' />
    )

  if (isError) return <TrailerError variant='error' message={error} />
  if (isEmpty) return <TrailerError variant='empty' />
  if (!isReady || !trailerUrl) return null

  return (
    <YoutubePlayer
      title={contentTitle}
      src={trailerUrl}
      variant='modal'
      onUnavailable={markUnavailable}
    />
  )
}

export default TrailerModalContents
