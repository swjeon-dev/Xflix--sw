import { useMemo } from 'react'

import { useInfiniteContents } from '@/entities/media'
import type { Media } from '@/entities/media'
import { API_ENDPOINT, buildDiscoverFilterParams } from '@/shared'
import type { SearchFilterKey } from '@/shared'

import { toSearchListItem } from '../lib/toSearchListItem'
import type { SearchMediaType } from './search.types'

type UseFilterSearchProps = {
  filter: SearchFilterKey | null
  filterId: string | null
  type: SearchMediaType
}

function useFilterSearch({ filter, filterId, type }: UseFilterSearchProps) {
  const enabled = Boolean(filter && filterId)

  const endPoint = type === 'movie'
    ? API_ENDPOINT.MOVIE_FILTERED
    : API_ENDPOINT.TV_FILTERED

  const params =
    enabled && filter && filterId
      ? buildDiscoverFilterParams(filter, filterId)
      : undefined

  const {
    contents,
    isLoading,
    isFetchingMore,
    error,
    loaderRef,
    refetch,
  } = useInfiniteContents<Media>({
    endPoint: enabled ? endPoint : '',
    params,
  })

  const items = useMemo(
    () => contents.map(item => toSearchListItem(item, type)),
    [contents, type],
  )

  return {
    items,
    isLoading: enabled && isLoading,
    isFetchingMore: enabled && isFetchingMore,
    error: enabled ? error : null,
    loaderRef,
    refetch,
  }
}

export default useFilterSearch
