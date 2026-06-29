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
  const { trailerUrl, isLoading, error } = useGetVideo(
    contentId.toString(),
    mediaType,
    'modal',
  )

  if (isLoading) {
    return (
      <LoadingComponent style='absolute inset-0 flex items-center justify-center bg-black text-white' />
    )
  }

  if (!trailerUrl) {
    return <TrailerError error={error} />
  }

  return <YoutubePlayer title={contentTitle} src={trailerUrl} variant='modal' />
}

export default TrailerModalContents
