import { IApiReturn } from '@/shared'
import { IGenre } from '@/shared'
import { API_ENDPOINT } from '@/shared'
import { tmdbFetch } from './client'
import type { MediaVideoType } from '@/shared'

export const getGenres = async (
  type: MediaVideoType,
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
