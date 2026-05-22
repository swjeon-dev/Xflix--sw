import type { ITV } from '@/entities/tv'
import type { IApiReturn } from '@/shared/types/api.types'
import { tmdbFetch } from '@/shared/api/tmdb/client'
import { API_ENDPOINT } from '@/shared/config/api-config'

export const getTV = async (
  id: number | string,
  query?: Record<string, string | number | boolean>,
): Promise<IApiReturn<ITV>> => {
  return tmdbFetch<ITV>(
    API_ENDPOINT.TV_DETAIL(id),
    query,
    '현재 TV 정보를 찾을 수 없습니다.',
  )
}
