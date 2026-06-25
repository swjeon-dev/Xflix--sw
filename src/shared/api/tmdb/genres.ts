import { IApiReturn } from '@/shared/types/api.types'
import { IGenre } from '@/shared/types/contents.types'
import { tmdbFetch } from './client'
import { API_ENDPOINT } from '@/shared/config/api'

type GenreType = 'movie' | 'tv'

export const getGenres = async (
  type: GenreType,
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
