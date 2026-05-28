import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetContents, type ApiPath } from '@/shared'

import type { IMovie, ITV } from '@/entities'

function mergeResults<T extends ITV | IMovie>(
  prev: T[],
  incoming: T[],
  page: number,
) {
  if (page === 1) return incoming

  const ids = new Set(prev.map(item => item.id))
  const next = incoming.filter(item => !ids.has(item.id))
  return [...prev, ...next]
}

const ROOT_MARGIN = {
  horizontal: '0px 320px 0px 0px',
  vertical: '0px 0px 320px 0px',
} as const

export default function useListInfiniteScroll<T extends ITV | IMovie>({
  endPoint,
  params,
  scrollRef,
  direction = scrollRef ? 'horizontal' : 'vertical',
}: {
  endPoint: ApiPath
  params?: Record<string, string | number | boolean>
  scrollRef?: React.RefObject<HTMLElement | null>
  direction?: 'horizontal' | 'vertical'
}) {
  const [items, setItems] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const canLoadMoreRef = useRef(true)
  const hasMoreRef = useRef(true)
  const isFetchingRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loaderNodeRef = useRef<HTMLElement | null>(null)

  const queryKey = JSON.stringify({ endPoint, params })

  const { isLoading, isFetching, error, contents, refetch } = useGetContents<T>(
    endPoint,
    { ...params, page },
  )

  const resetList = useCallback(() => {
    setPage(1)
    setItems([])
    setHasMore(true)
    hasMoreRef.current = true
    canLoadMoreRef.current = true
    isFetchingRef.current = false
  }, [])

  useEffect(() => {
    resetList()
  }, [queryKey, resetList])

  useEffect(() => {
    hasMoreRef.current = hasMore
    if (!hasMore) observerRef.current?.disconnect()
  }, [hasMore])

  useEffect(() => {
    isFetchingRef.current = isFetching
  }, [isFetching])

  useEffect(() => {
    if (!contents?.results) return

    const nextHasMore = contents.page < contents.total_pages
    setHasMore(nextHasMore)
    hasMoreRef.current = nextHasMore
    setItems(prev => mergeResults<T>(prev, contents.results, contents.page))
    isFetchingRef.current = false
  }, [contents])

  function handleRefetch() {
    resetList()
    refetch()
  }

  const disconnectObserver = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [])

  const tryLoadMore = useCallback(() => {
    if (
      !hasMoreRef.current ||
      !canLoadMoreRef.current ||
      isFetchingRef.current
    ) {
      return
    }

    canLoadMoreRef.current = false
    isFetchingRef.current = true
    setPage(prev => prev + 1)
  }, [])

  const connectObserver = useCallback(
    (target: HTMLElement) => {
      disconnectObserver()

      const root = scrollRef?.current ?? null
      if (direction === 'horizontal' && !root) return

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return

          if (!entry.isIntersecting) {
            canLoadMoreRef.current = true
            return
          }

          tryLoadMore()
        },
        {
          root,
          threshold: 0,
          rootMargin: ROOT_MARGIN[direction],
        },
      )

      observerRef.current.observe(target)
    },
    [direction, disconnectObserver, scrollRef, tryLoadMore],
  )

  const bindObserver = useCallback(() => {
    const target = loaderNodeRef.current
    if (!target || !hasMoreRef.current) return

    const root = scrollRef?.current ?? null
    if (direction === 'horizontal' && !root) return

    connectObserver(target)
  }, [connectObserver, direction, scrollRef])

  const setLoaderRef = useCallback(
    (node: HTMLElement | null) => {
      loaderNodeRef.current = node

      if (!node) {
        disconnectObserver()
        return
      }

      bindObserver()
    },
    [bindObserver, disconnectObserver],
  )

  useEffect(() => {
    if (isLoading) return
    bindObserver()
  }, [isLoading, items.length, hasMore, direction, bindObserver])

  useEffect(() => {
    return () => disconnectObserver()
  }, [disconnectObserver])

  return {
    loaderRef: setLoaderRef,
    contents: items,
    isLoading,
    isFetchingMore: isFetching && page > 1,
    hasMore,
    error,
    refetch: handleRefetch,
  }
}
