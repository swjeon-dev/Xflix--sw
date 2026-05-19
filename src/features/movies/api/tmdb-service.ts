import { API_ENDPOINT } from './config'
import { tmdbFetch } from './tmdb-client'
import type { IApiReturn, IGenre, IMovie, ITmdbContents } from '../types'

export const getGenres = async (): Promise<IApiReturn<IGenre[]>> => {
  const result = await tmdbFetch<{ genres: IGenre[] }>(
    API_ENDPOINT.GENRES,
    undefined,
    '장르를 알 수 없습니다.',
  )

  if (result.error || !result.data?.genres) {
    return {
      data: null,
      error: result.error ?? '올바르지 않은 응답 데이터 형식입니다.',
    }
  }

  return { data: result.data.genres, error: null }
}

export const getTmdbContents = async (
  endPoint: string,
  query?: Record<string, string | number | boolean>,
): Promise<IApiReturn<IMovie[]>> => {
  const result = await tmdbFetch<ITmdbContents>(endPoint, {
    page: 1,
    ...query,
  })

  return {
    data: result.data?.results ?? null,
    error: result.error,
  }
}

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
