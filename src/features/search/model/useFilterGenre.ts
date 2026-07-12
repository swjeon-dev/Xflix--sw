import { useMemo } from 'react'

import { useInfiniteContents } from '@/entities/media'
import type { Media } from '@/entities/media'
import { API_ENDPOINT, getDiscoverParams } from '@/shared'
import type { SearchFilterKey } from '@/shared'

import { toSearchListItem } from '../lib/toSearchListItem'
import type { SearchMediaType } from './search.types'

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
    useInfiniteContents<Media>({
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

export default useFilterGenre
