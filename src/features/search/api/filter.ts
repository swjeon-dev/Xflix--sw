import { tmdbFetch, type IApiReturn, API_ENDPOINT } from '@/shared'
import type { IPersonCredits, SearchMediaType } from '../model'

function getFilterByPersonEndpoint(type: SearchMediaType, personId: string) {
  return type === 'movie'
    ? API_ENDPOINT.PERSON_MOVIE_CREDITS(personId)
    : API_ENDPOINT.PERSON_TV_CREDITS(personId)
}

async function getSearchByPerson(
  type: SearchMediaType,
  personId: string,
): Promise<IApiReturn<IPersonCredits>> {
  return tmdbFetch<IPersonCredits>(
    getFilterByPersonEndpoint(type, personId),
    undefined,
    '검색 결과를 찾을 수 없습니다.',
  )
}

export { getSearchByPerson }
