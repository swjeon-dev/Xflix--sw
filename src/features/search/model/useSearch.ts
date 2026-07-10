import { useCallback, useLayoutEffect, useRef } from 'react'

import { useInfinitePagination, usePaginatedList } from '@/shared'

import type { ISearchData, IUseSearchProps } from './search.types'
import useSearchQuery from './useSearchQuery'

const getSearchItemKey = (item: ISearchData) => `${item.media_type}-${item.id}`

function useSearch({ term, type }: IUseSearchProps) {
  const trimmedTerm = term?.trim() ?? ''
  const enabled = trimmedTerm.length > 0
  const queryKey = `${trimmedTerm}-${type}`

  const scrollAnchorRef = useRef<{
    scrollY: number
    itemCount: number
  } | null>(null)

  const pagination = usePaginatedList<ISearchData>({
    queryKey,
    enabled,
    getKey: getSearchItemKey,
    hasMoreOnReset: true,
    hasMoreWhenDisabled: false,
  })

  const { result, error, isFetching, refetch } = useSearchQuery({
    term: trimmedTerm,
    type,
    page: pagination.page,
    enabled,
  })

  const { loaderRef, resetSession } = useInfinitePagination({
    pagination,
    mode: 'search',
    enabled,
    isFetching,
    fetchContents: result
      ? {
          incoming: result.results,
          page: result.page,
          totalPages: result.totalPages,
        }
      : null,
    onBeforeLoadMore: () => {
      scrollAnchorRef.current = {
        scrollY: window.scrollY,
        itemCount: pagination.items.length,
      }
    },
  })

  useLayoutEffect(() => {
    if (!error) return

    scrollAnchorRef.current = null
  }, [error])

  useLayoutEffect(() => {
    const anchor = scrollAnchorRef.current
    if (!anchor) return

    window.scrollTo({ top: anchor.scrollY, behavior: 'instant' })

    if (!isFetching && pagination.items.length > anchor.itemCount) {
      scrollAnchorRef.current = null
    }
  }, [isFetching, pagination.items.length])

  const handleRefetch = useCallback(() => {
    resetSession()
    refetch()
  }, [refetch, resetSession])

  const isInitialFetch = isFetching && pagination.items.length === 0

  return {
    items: pagination.items,
    isLoading: enabled && isInitialFetch,
    isFetchingMore: enabled && isFetching && !isInitialFetch,
    error: enabled ? error : null,
    loaderRef,
    refetch: handleRefetch,
  }
}

export default useSearch
