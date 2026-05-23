import type { ISeason } from '@/entities/tv'
import type { IApiReturn } from '@/shared/types/api.types'
import { tmdbFetch } from '@/shared/api/tmdb/client'

// [외부 수정] src/shared/config/api-config.ts — 선택 사항
// TV_SEASON: (tvId: string | number, season: string | number) =>
//   `/tv/${tvId}/season/${season}`,

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
