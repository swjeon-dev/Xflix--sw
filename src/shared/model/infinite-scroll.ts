import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetContents } from '@/features/movies'
import type { IMovie } from '@/entities/movie/model'
import type { ApiPath } from '@/shared/config/api-config'

function mergeResults(prev: IMovie[], incoming: IMovie[], page: number) {
  if (page === 1) return incoming

  const ids = new Set(prev.map(item => item.id))
  const next = incoming.filter(item => !ids.has(item.id))
  return [...prev, ...next]
}

const ROOT_MARGIN = {
  horizontal: '0px 320px 0px 0px',
  vertical: '0px 0px 320px 0px',
} as const

// contentscarousel(가로) · genre 목록(세로) 등 무한 스크롤
export default function useListInfiniteScroll({
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
  const [items, setItems] = useState<IMovie[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const canLoadMoreRef = useRef(true)
  const hasMoreRef = useRef(true)
  const isFetchingRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loaderNodeRef = useRef<HTMLElement | null>(null)

  const queryKey = JSON.stringify({ endPoint, params })

  const { isLoading, isFetching, error, contents, refetch } = useGetContents(
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
    setItems(prev => mergeResults(prev, contents.results, contents.page))
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

  // 가로: sentinel ref가 ul(scrollRef)보다 먼저 붙을 수 있어, 로드 후 한 번 더 연결
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
