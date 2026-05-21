import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetContents } from '@/features/movies'
import type { IMovie } from '@/entities/movie/model'

function mergeResults(prev: IMovie[], incoming: IMovie[], page: number) {
  if (page === 1) return incoming

  const ids = new Set(prev.map(item => item.id))
  const next = incoming.filter(item => !ids.has(item.id))
  return [...prev, ...next]
}

export default function useListInfiniteScroll({
  endPoint,
  params,
  scrollRef,
}: {
  endPoint: string
  params?: Record<string, string | number | boolean>
  scrollRef: React.RefObject<HTMLElement | null>
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
    const root = scrollRef.current
    const target = loaderRef.current
    if (!root || !target || !hasMore) return

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
        // 끝에 닿기 전에 미리 로드해 스크롤이 끊기지 않게 함
        rootMargin: '0px 320px 0px 0px',
      },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [scrollRef, hasMore, isFetching, page, items.length])

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
