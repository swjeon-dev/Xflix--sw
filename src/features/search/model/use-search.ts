import { useCallback, useEffect, useRef, useState } from 'react'
import { tmdbFetch } from '@/shared/api/tmdb'
import { API_ENDPOINT } from '@/shared/config/api-config'
import type { ISearchData, ISearchResult } from './search.types'

export type SearchMediaType = 'movie' | 'tv'

function filterByMediaType(results: ISearchData[], mediaType: SearchMediaType) {
  return results.filter(item => item.media_type === mediaType)
}

function mergeSearchResults(
  prev: ISearchData[],
  incoming: ISearchData[],
  page: number,
) {
  if (page === 1) return incoming

  const ids = new Set(prev.map(item => `${item.media_type}-${item.id}`))
  return [
    ...prev,
    ...incoming.filter(item => !ids.has(`${item.media_type}-${item.id}`)),
  ]
}

export function useSearch({
  query,
  mediaType,
}: {
  query: string | null | undefined
  mediaType: SearchMediaType
}) {
  const trimmedQuery = query?.trim() ?? ''
  const enabled = trimmedQuery.length > 0
  const queryKey = `${trimmedQuery}-${mediaType}`

  const [items, setItems] = useState<ISearchData[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const canLoadMoreRef = useRef(true)
  const hasMoreRef = useRef(true)
  const isFetchingRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loaderNodeRef = useRef<HTMLElement | null>(null)
  const lastQueryKeyRef = useRef(queryKey)

  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setItems([])
      setPage(1)
      setHasMore(false)
      setIsLoading(false)
      setIsFetchingMore(false)
      setError(null)
      lastQueryKeyRef.current = queryKey
      return
    }

    const queryKeyChanged = lastQueryKeyRef.current !== queryKey

    if (queryKeyChanged) {
      lastQueryKeyRef.current = queryKey
      setItems([])
      setHasMore(true)
      setError(null)
      hasMoreRef.current = true
      canLoadMoreRef.current = true
      isFetchingRef.current = false

      if (page !== 1) {
        setPage(1)
        return
      }
    }

    let cancelled = false

    async function fetchSearch() {
      const isInitialPage = page === 1

      if (isInitialPage) setIsLoading(true)
      setIsFetchingMore(!isInitialPage)
      isFetchingRef.current = true

      const response = await tmdbFetch<ISearchResult>(
        API_ENDPOINT.SEARCH_MULTI,
        {
          query: trimmedQuery,
          include_adult: false,
          language: 'ko-KR',
          page,
        },
      )

      if (cancelled) return

      if (response.error) {
        setError(response.error)
        setIsLoading(false)
        setIsFetchingMore(false)
        isFetchingRef.current = false
        return
      }

      const data = response.data
      const filtered = filterByMediaType(data?.results ?? [], mediaType)
      const nextHasMore = (data?.page ?? 1) < (data?.total_pages ?? 1)

      setError(null)
      setHasMore(nextHasMore)
      hasMoreRef.current = nextHasMore
      setItems(prev => mergeSearchResults(prev, filtered, page))
      setIsLoading(false)
      setIsFetchingMore(false)
      isFetchingRef.current = false
      canLoadMoreRef.current = true
    }

    fetchSearch()

    return () => {
      cancelled = true
    }
  }, [enabled, trimmedQuery, mediaType, page, queryKey, refetchCount])

  const tryLoadMore = useCallback(() => {
    if (
      !enabled ||
      !hasMoreRef.current ||
      !canLoadMoreRef.current ||
      isFetchingRef.current
    ) {
      return
    }

    canLoadMoreRef.current = false
    setPage(prev => prev + 1)
  }, [enabled])

  const disconnectObserver = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [])

  const connectObserver = useCallback(
    (target: HTMLElement) => {
      disconnectObserver()

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return

          if (!entry.isIntersecting) {
            canLoadMoreRef.current = true
            return
          }

          tryLoadMore()
        },
        { threshold: 0, rootMargin: '0px 0px 320px 0px' },
      )

      observerRef.current.observe(target)
    },
    [disconnectObserver, tryLoadMore],
  )

  const setLoaderRef = useCallback(
    (node: HTMLElement | null) => {
      loaderNodeRef.current = node

      if (!node) {
        disconnectObserver()
        return
      }

      if (!hasMoreRef.current || isLoading) return
      connectObserver(node)
    },
    [connectObserver, disconnectObserver, isLoading],
  )

  useEffect(() => {
    if (!enabled || isLoading) return

    const target = loaderNodeRef.current
    if (!target || !hasMore) return

    connectObserver(target)

    return () => disconnectObserver()
  }, [
    enabled,
    isLoading,
    items.length,
    hasMore,
    connectObserver,
    disconnectObserver,
  ])

  useEffect(() => {
    return () => disconnectObserver()
  }, [disconnectObserver])

  return {
    items,
    isLoading: enabled && isLoading,
    isFetchingMore: enabled && isFetchingMore,
    hasMore: enabled && hasMore,
    error: enabled ? error : null,
    loaderRef: setLoaderRef,
    refetch,
    isEnabled: enabled,
  }
}
