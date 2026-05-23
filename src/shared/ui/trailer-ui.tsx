import { devLog } from '@/shared/lib'
import { buildYoutubeEmbedUrl } from '@/shared/lib/helper/build-youtube-embed-url'
import useGetTmdbVideos from '@/shared/model/use-get-tmdb-videos'
import type { MediaVideoType } from '@/shared/model/video.types'

export default function TrailerUI({
  contentId,
  contentTitle,
  mediaType = 'movie',
  children,
}: {
  contentId: number | string
  contentTitle: string
  mediaType?: MediaVideoType
  children: React.ReactNode
}) {
  const {
    trailer,
    isLoading: isVideosLoading,
    error: videosError,
  } = useGetTmdbVideos(contentId, mediaType)

  if (videosError) {
    devLog({ message: videosError, type: 'error' })
  }

  const youtubeEmbedUrl = trailer
    ? buildYoutubeEmbedUrl(trailer.key, 'background')
    : null

  return !isVideosLoading && !videosError && youtubeEmbedUrl ? (
    <iframe
      title={`${contentTitle} 트레일러`}
      src={youtubeEmbedUrl}
      className='absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.35]'
      allow='encrypted-media; picture-in-picture'
      allowFullScreen
    />
  ) : (
    children
  )
}
