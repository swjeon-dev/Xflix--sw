import { tmdbFetch, type IApiReturn, API_ENDPOINT } from '@/shared'
import type { ISearchResult, SearchMediaType } from '../model'

function getSearchEndpoint(type: SearchMediaType) {
  return type === 'movie'
    ? API_ENDPOINT.SEARCH_MOVIE
    : API_ENDPOINT.SEARCH_TV
}

export const getSearch = async (
  term: string,
  page: number,
  type: SearchMediaType,
): Promise<IApiReturn<ISearchResult>> => {
  return tmdbFetch<ISearchResult>(
    getSearchEndpoint(type),
    {
      query: term,
      include_adult: false,
      page,
    },
    '검색 결과를 찾을 수 없습니다.',
  )
}
