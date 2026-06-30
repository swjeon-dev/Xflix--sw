import { tmdbFetch, type IApiReturn, API_ENDPOINT } from '@/shared'
import { ISearchResult } from '../model'

export const getSearch = async (
  query: string,
  page: number,
): Promise<IApiReturn<ISearchResult>> => {
  return tmdbFetch<ISearchResult>(
    API_ENDPOINT.SEARCH_MULTI,
    {
      query,
      include_adult: false,
      page,
    },
    '검색 결과를 찾을 수 없습니다.',
  )
}
