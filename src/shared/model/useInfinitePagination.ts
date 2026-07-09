import { useCallback, useLayoutEffect } from 'react'

import {
  useInfiniteScroll,
  type InfiniteScrollDirection,
} from './useInfiniteScroll'
import { usePaginatedList } from './usePaginatedList'

type InfiniteScrollMode = 'search' | 'vertical-list' | 'horizontal-carousel'

type PageResult<T> = {
  incoming: T[]
  page: number
  totalPages: number
}

type PaginatedList<T> = ReturnType<typeof usePaginatedList<T>>

type UseInfinitePaginationConfig<T> = {
  pagination: PaginatedList<T>
  mode: InfiniteScrollMode
  scrollRef?: React.RefObject<HTMLUListElement | null>
  enabled?: boolean
  pause?: boolean
  isFetching?: boolean
  fetchContents?: PageResult<T> | null
  onBeforeLoadMore?: () => void
}

const SCROLL_PRESETS = {
  search: {
    direction: 'vertical' as InfiniteScrollDirection,
    threshold: 0.5,
    rootMargin: '0px',
  },
  'vertical-list': {
    direction: 'vertical' as InfiniteScrollDirection,
  },
  'horizontal-carousel': {
    direction: 'horizontal' as InfiniteScrollDirection,
  },
} as const

function useInfinitePagination<T>({
  pagination,
  mode,
  scrollRef,
  enabled = true,
  pause = false,
  isFetching = false,
  fetchContents = null,
  onBeforeLoadMore,
}: UseInfinitePaginationConfig<T>) {
  const preset = SCROLL_PRESETS[mode]
  const isSearchMode = mode === 'search'
  const { items, hasMore, loadMore, applyPageResult, reset } = pagination

  const { loaderRef, reset: resetScroll } = useInfiniteScroll({
    enabled,
    hasMore,
    isFetching,
    onLoadMore: loadMore,
    onBeforeLoadMore,
    scrollRootRef: mode === 'horizontal-carousel' ? scrollRef : undefined,
    direction: preset.direction,
    threshold: 'threshold' in preset ? preset.threshold : undefined,
    rootMargin: 'rootMargin' in preset ? preset.rootMargin : undefined,
    pause: isSearchMode ? pause || isFetching : pause,
    watchKey: isSearchMode ? undefined : items.length,
  })

  useLayoutEffect(() => {
    if (!enabled) {
      reset()
      resetScroll()
      return
    }

    if (!fetchContents) return

    applyPageResult(
      fetchContents.incoming,
      fetchContents.page,
      fetchContents.totalPages,
    )
  }, [
    applyPageResult,
    enabled,
    fetchContents?.incoming,
    fetchContents?.page,
    fetchContents?.totalPages,
    reset,
    resetScroll,
  ])

  const resetSession = useCallback(() => {
    reset()
    resetScroll()
  }, [reset, resetScroll])

  return {
    loaderRef,
    resetSession,
  }
}

export { SCROLL_PRESETS, useInfinitePagination }
export type {
  InfiniteScrollMode,
  PageResult,
  PaginatedList,
  UseInfinitePaginationConfig,
}
