import { devLog } from '../lib'
import { buildYoutubeEmbedUrl } from '../lib'
import { useGetVideo, type MediaVideoType } from '../model'
import PlayerWithYoutube from './PlayerWithYoutube'

interface TrailerUIProps {
  contentId: number | string
  contentTitle: string
  mediaType?: MediaVideoType
  backdropUrl: string
}
function TrailerUI({
  contentId,
  contentTitle,
  backdropUrl,
  mediaType = 'movie',
}: TrailerUIProps) {
  const {
    trailer,
    isLoading: isVideosLoading,
    error: videosError,
  } = useGetVideo(contentId.toString(), mediaType)

  if (videosError) {
    devLog({ message: videosError, type: 'error' })
  }

  const youtubeEmbedUrl = trailer
    ? buildYoutubeEmbedUrl(trailer.key, 'background')
    : null

  if (!(!isVideosLoading && youtubeEmbedUrl)) {
    return (
      <img
        src={backdropUrl}
        alt={`${contentTitle} 포스터`}
        className='w-full h-full object-cover'
      />
    )
  }

  return (
    <PlayerWithYoutube
      title={`${contentTitle} 트레일러`}
      src={youtubeEmbedUrl}
      className='object-cover pointer-events-none scale-[1.35]'
    />
  )
}

export default TrailerUI
