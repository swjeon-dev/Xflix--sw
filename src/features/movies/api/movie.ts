import type { IMovie } from '@/entities/movie'
import { IApiReturn } from '@/shared/types/api.types'
import { tmdbFetch } from '@/shared/api/tmdb/client'
import { API_ENDPOINT } from '@/shared/config/api-config'

export const getMovie = async (
  id: number | string,
  query?: Record<string, string | number | boolean>,
): Promise<IApiReturn<IMovie>> => {
  return tmdbFetch<IMovie>(
    API_ENDPOINT.MOVIE_DETAIL(id),
    query,
    '현재 영화를 찾을 수 없습니다.',
  )
}

