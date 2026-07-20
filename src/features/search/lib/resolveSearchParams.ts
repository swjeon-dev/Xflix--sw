import type { SearchFilterKey } from '@/shared'

import type { SearchMediaType } from '@/shared'

type SearchPageMode = 'term' | 'filter' | 'idle'

type ResolvedSearchParams = {
  mode: SearchPageMode
  type: SearchMediaType
  term: string | null
  filter: SearchFilterKey | null
  filterId: string | null
  label: string | null
}

const FILTER_KEYS: SearchFilterKey[] = ['genre', 'cast', 'crew']

function resolveSearchParams(
  searchParams: URLSearchParams,
): ResolvedSearchParams {
  const rawType = searchParams.get('type')
  const type: SearchMediaType = rawType === 'tv' ? 'tv' : 'movie'
  const term = searchParams.get('term')?.trim() || null

  if (term) {
    return {
      mode: 'term',
      type,
      term,
      filter: null,
      filterId: null,
      label: null,
    }
  }

  for (const filter of FILTER_KEYS) {
    const filterId = searchParams.get(filter)?.trim()
    if (filterId) {
      return {
        mode: 'filter',
        type,
        term: null,
        filter,
        filterId,
        label: searchParams.get('label')?.trim() || null,
      }
    }
  }

  return {
    mode: 'idle',
    type,
    term: null,
    filter: null,
    filterId: null,
    label: null,
  }
}

export type { SearchPageMode, ResolvedSearchParams }
export { resolveSearchParams }
