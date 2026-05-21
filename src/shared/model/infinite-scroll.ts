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
  const isFetchingMoreRef = useRef(false)
  const loaderRef = useRef<HTMLElement>(null)

  const queryKey = JSON.stringify({ endPoint, params })

  const { isLoading, isFetching, error, contents, refetch } = useGetContents(
    endPoint,
    { ...params, page },
  )

  const resetList = useCallback(() => {
    setPage(1)
    setItems([])
    setHasMore(true)
    isFetchingMoreRef.current = false
  }, [])

  useEffect(() => {
    resetList()
  }, [queryKey, resetList])

  useEffect(() => {
    if (!contents?.results) return

    setHasMore(contents.page < contents.total_pages)
    setItems(prev => mergeResults(prev, contents.results, contents.page))
    isFetchingMoreRef.current = false
  }, [contents])

  function handleRefetch() {
    resetList()
    refetch()
  }

  useEffect(() => {
    const root = scrollRef?.current ?? null
    const target = loaderRef.current
    if (!target || !hasMore) return
    if (direction === 'horizontal' && !root) return

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) return
        if (isFetchingMoreRef.current || isFetching) return

        isFetchingMoreRef.current = true
        setPage(prev => prev + 1)
      },
      {
        root,
        threshold: 0,
        rootMargin: ROOT_MARGIN[direction],
      },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [scrollRef, direction, hasMore, isFetching, page, items.length])

  return {
    loaderRef,
    contents: items,
    isLoading,
    isFetchingMore: isFetching && page > 1,
    hasMore,
    error,
    refetch: handleRefetch,
  }
}
