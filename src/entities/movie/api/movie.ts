import type { IMovie } from '../types'
import { tmdbFetch, API_ENDPOINT, type IApiReturn } from '@/shared'

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
