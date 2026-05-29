import type { ISeason } from '../types'
import { tmdbFetch, type IApiReturn } from '@/shared'

const tvSeasonPath = (tvId: string | number, season: string | number) =>
  `/tv/${tvId}/season/${season}`

export const getSeason = async (
  tvId: number | string,
  seasonNumber: number | string,
): Promise<IApiReturn<ISeason>> => {
  return tmdbFetch<ISeason>(
    tvSeasonPath(tvId, seasonNumber),
    undefined,
    '시즌 정보를 찾을 수 없습니다.',
  )
}
