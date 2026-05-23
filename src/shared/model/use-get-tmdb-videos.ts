import { useEffect, useState } from 'react'
import { tmdbFetch } from '@/shared/api/tmdb'
import { API_ENDPOINT } from '@/shared/config/api-config'
import type { IVideo, IVideoReturn, MediaVideoType } from './video.types'

interface IUseGetTmdbVideosReturn {
  error: string | null
  isLoading: boolean
  videos: IVideo[]
  trailer: IVideo | null
}
function pickYoutubeTrailer(videos: IVideo[]): IVideo | null {
  const youtube = videos.filter(video => video.site === 'YouTube')

  return (
    youtube.find(video => video.type === 'Trailer' && video.official) ??
    youtube.find(video => video.type === 'Trailer') ??
    youtube[0] ??
    null
  )
}

function getVideosEndpoint(id: string | number, mediaType: MediaVideoType) {
  return mediaType === 'movie'
    ? API_ENDPOINT.MOVIE_VIDEOS(id)
    : API_ENDPOINT.TV_VIDEOS(id)
}

function useGetTmdbVideos(
  id?: string | number,
  mediaType: MediaVideoType = 'movie',
): IUseGetTmdbVideosReturn {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [trailer, setTrailer] = useState<IVideo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) {
      setVideos([])
      setTrailer(null)
      setError(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    const contentId = id
    const errorMessage =
      mediaType === 'movie'
        ? '영화 영상 정보를 찾을 수 없습니다.'
        : 'TV 프로그램 영상 정보를 찾을 수 없습니다.'

    async function fetchVideos() {
      setIsLoading(true)
      const result = await tmdbFetch<IVideoReturn>(
        getVideosEndpoint(contentId, mediaType),
        undefined,
        errorMessage,
      )

      if (cancelled) return

      const results = result.data?.results ?? []
      setVideos(results)
      setTrailer(pickYoutubeTrailer(results))
      setError(result.error)
      setIsLoading(false)
    }

    fetchVideos()
    return () => {
      cancelled = true
    }
  }, [id, mediaType])

  return { error, isLoading, videos, trailer }
}

export default useGetTmdbVideos
