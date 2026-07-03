import type { ISeason } from '../model/season.types'
import { tmdbFetch, type IApiReturn, API_ENDPOINT } from '@/shared'

export const getSeason = async (
  tvId: string,
  seasonNumber: string,
): Promise<IApiReturn<ISeason>> => {
  return tmdbFetch<ISeason>(
    API_ENDPOINT.TV_SEASONS(tvId, seasonNumber),
    undefined,
    '시즌 정보를 찾을 수 없습니다.',
  )
}
