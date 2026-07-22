import { useMemo } from 'react'

import { useInfiniteContents } from '@/entities/media'
import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'
import type { SearchFilterKey, SearchMediaType } from '@/shared'
import { API_ENDPOINT, getDiscoverParams } from '@/shared'

import { toSearchListItem } from '../lib/toSearchListItem'

type UseFilterGenreProps = {
  filter: SearchFilterKey | null
  filterId: string | null
  type: SearchMediaType
}

function useFilterGenre({ filter, filterId, type }: UseFilterGenreProps) {
  const enabled = Boolean(filter === 'genre' && filterId)

  const endPoint =
    type === 'movie' ? API_ENDPOINT.MOVIE_FILTERED : API_ENDPOINT.TV_FILTERED

  const params =
    enabled && filterId
      ? getDiscoverParams(Number(filterId), 'popularity.desc', type)
      : undefined

  const { contents, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useInfiniteContents<IMovie | ITV>({
      endPoint: enabled ? endPoint : '',
      params,
    })

  const items = useMemo(() => contents.map(toSearchListItem), [contents])

  return {
    items,
    isLoading: enabled && isLoading,
    isFetchingMore: enabled && isFetchingMore,
    error: enabled ? error : null,
    loaderRef,
    refetch,
  }
}

export default useFilterGenre
