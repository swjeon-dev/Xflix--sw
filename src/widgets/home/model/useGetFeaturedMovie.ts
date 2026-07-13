// featuredMovie 책임 분리를 위한 모델
import { useMemo } from 'react'
import { API_ENDPOINT, getTmdbImgPath } from '@/shared'
import { routes } from '@/shared/config/routes'
import { useGetContents } from '@/entities/media'
import type { IFeaturedMovie, IMovie } from '@/entities/movie'

function useGetFeaturedMovie() {
  const { isLoading, error, contents } = useGetContents<IMovie>(
    API_ENDPOINT.TRENDING,
  )

  const featuredContent: IFeaturedMovie | null = useMemo(() => {
    if (!contents?.results.length) return null

    const content = contents.results[Math.floor(Math.random() * 5)]
    if (!content.backdrop_path) return null

    const backdropUrl = getTmdbImgPath({
      path: content.backdrop_path,
      size: 'w1280',
    })
    if (!backdropUrl) return null

    return {
      id: content.id,
      title: content.title,
      backdropUrl,
      overview: content.overview,
      detailUrl: routes.MOVIE.DETAIL(content.id),
    }
  }, [contents])

  return {
    isLoading,
    error,
    featuredContent,
  }
}

export default useGetFeaturedMovie
