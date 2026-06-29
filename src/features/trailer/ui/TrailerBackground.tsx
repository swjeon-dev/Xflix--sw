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
  const { trailerUrl, isLoading, error } = useGetVideo(
    contentId.toString(),
    mediaType,
    'background',
  )

  if (error) {
    devLog({ message: error, type: 'error' })
  }

  if (isLoading || !trailerUrl) {
    return (
      <img
        src={backdropUrl}
        alt={`${contentTitle} 포스터`}
        className='w-full h-full object-cover'
      />
    )
  }

  return (
    <YoutubePlayer title={contentTitle} src={trailerUrl} variant='background' />
  )
}

export default TrailerBackground
