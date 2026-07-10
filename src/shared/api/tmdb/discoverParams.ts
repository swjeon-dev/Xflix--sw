import type { SearchFilterKey } from '@/shared/types/searchTag.types'

const BASE_PARAMS = {
  include_adult: 'false',
  include_video: 'false',
  sort_by: 'popularity.desc',
} as const

const DISCOVER_FILTER_PARAM: Record<SearchFilterKey, string> = {
  genre: 'with_genres',
  cast: 'with_cast',
  crew: 'with_crew',
}

function getDiscoverParams(genreId: number) {
  return {
    ...BASE_PARAMS,
    with_genres: String(genreId),
  }
}

function getAllDiscoverParams() {
  return { ...BASE_PARAMS }
}

function buildDiscoverFilterParams(filter: SearchFilterKey, id: string | number) {
  return {
    ...BASE_PARAMS,
    [DISCOVER_FILTER_PARAM[filter]]: String(id),
  }
}

export { getDiscoverParams, getAllDiscoverParams, buildDiscoverFilterParams }
