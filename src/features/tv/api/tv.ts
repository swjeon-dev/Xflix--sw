import type { ITV } from '@/entities/tv'
import { tmdbFetch, API_ENDPOINT, type IApiReturn } from '@/shared'

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
