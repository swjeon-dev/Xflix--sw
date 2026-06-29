import type { ITV } from '@/entities/tv'
import {
  type IApiReturn,
  type QueryParams,
  tmdbFetch,
  API_ENDPOINT,
} from '@/shared'

export const getTV = async (
  id: string,
  query?: QueryParams,
): Promise<IApiReturn<ITV>> => {
  return tmdbFetch<ITV>(
    API_ENDPOINT.TV_DETAIL(id),
    query,
    '현재 TV 정보를 찾을 수 없습니다.',
  )
}
