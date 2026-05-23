import { useEffect, useState } from 'react'
import { tmdbFetch } from '@/shared/api/tmdb'
import { API_ENDPOINT } from '@/shared/config/api-config'

export interface IVideo {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  id: string
  type: string
  official: boolean
  published_at: string
}

export interface IVideoReturn {
  id: number
  results: IVideo[]
}

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

function useGetTmdbVideos(id?: string | number): IUseGetTmdbVideosReturn {
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

    const movieId = id

    async function fetchVideos() {
      setIsLoading(true)
      const result = await tmdbFetch<IVideoReturn>(
        API_ENDPOINT.MOVIE_VIDEOS(movieId),
        undefined,
        '영화 영상 정보를 찾을 수 없습니다.',
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
  }, [id])

  return { error, isLoading, videos, trailer }
}

export default useGetTmdbVideos
