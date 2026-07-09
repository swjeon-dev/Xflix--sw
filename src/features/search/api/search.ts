import { tmdbFetch, type IApiReturn, API_ENDPOINT } from '@/shared'
import type { ISearchResult, SearchMediaType } from '../model'

function getSearchEndpoint(mediaType: SearchMediaType) {
  return mediaType === 'movie'
    ? API_ENDPOINT.SEARCH_MOVIE
    : API_ENDPOINT.SEARCH_TV
}

export const getSearch = async (
  query: string,
  page: number,
  mediaType: SearchMediaType,
): Promise<IApiReturn<ISearchResult>> => {
  return tmdbFetch<ISearchResult>(
    getSearchEndpoint(mediaType),
    {
      query,
      include_adult: false,
      page,
    },
    '검색 결과를 찾을 수 없습니다.',
  )
}
