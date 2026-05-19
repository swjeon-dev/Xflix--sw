// featuredMovie 책임 분리를 위한 모델
import { API_ENDPOINT } from '@/features/movies'
import useGetContents from '@/features/movies/hooks/useGetContents'
import { IFeaturedMovie } from '@/features/movies/types/movie'
import { getTmdbImgPath } from '@/features/movies/utils/image'
import { routes } from '@/shared/constants/routes'
import { useMemo } from 'react'

function useGetFeaturedMovie() {
  const { isLoading, error, contents } = useGetContents(API_ENDPOINT.TRENDING)

  const featuredContent: IFeaturedMovie | null = useMemo(() => {
    if (!contents?.length) return null

    const content = contents[Math.floor(Math.random() * 5)]
    if (!content.backdrop_path) return null

    const backdropUrl = getTmdbImgPath({
      path: content.backdrop_path,
      size: 'original',
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
