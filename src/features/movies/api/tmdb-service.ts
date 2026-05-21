import {
  IApiReturn,
  IGenre,
  IMovie,
  ITmdbContents,
} from '@/entities/movie/model'
import { API_ENDPOINT } from '@/shared/config/api-config'
import { tmdbFetch } from './tmdb-client'

type GenreType = 'movie' | 'tv'

export const getGenres = async (
  type: GenreType = 'movie',
): Promise<IApiReturn<IGenre[]>> => {
  const result = await tmdbFetch<{ genres: IGenre[] }>(
    type === 'movie' ? API_ENDPOINT.GENRES_MOVIE : API_ENDPOINT.GENRES_TV,
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

// page*

export const getTmdbContents = async (
  endPoint: string,
  query?: Record<string, string | number | boolean>,
): Promise<IApiReturn<ITmdbContents>> => {
  const result = await tmdbFetch<ITmdbContents>(endPoint, {
    ...query,
  })

  return {
    data: result.data ?? null,
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
