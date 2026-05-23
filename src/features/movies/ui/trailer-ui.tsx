import { devLog } from '@/shared/lib'
import useGetTmdbVideos from '../model/get-tmdb-videos'

export default function TrailerUI({
  contentId,
  contentTitle,
  children,
}: {
  contentId: number | string
  contentTitle: string
  children: React.ReactNode
}) {
  const {
    trailer,
    isLoading: isVideosLoading,
    error: videosError,
  } = useGetTmdbVideos(contentId)

  if (videosError) {
    devLog({ message: videosError, type: 'error' })
  }

  const youtubeEmbedUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}&rel=0&playsinline=1&modestbranding=1`
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
