import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { getSearch } from '../api'
import { filterByMediaType, mergeResults } from '../lib'
import type { ISearchData, IUseSearchProps } from './search.types'

function useSearch({ query, mediaType }: IUseSearchProps) {
  const trimmedQuery = query?.trim() ?? ''
  const enabled = trimmedQuery.length > 0
  const queryKey = `${trimmedQuery}-${mediaType}`

  const [items, setItems] = useState<ISearchData[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const canLoadMoreRef = useRef(true)
  const hasMoreRef = useRef(false)
  const isFetchingRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastQueryKeyRef = useRef(queryKey)
  const scrollYBeforeFetchRef = useRef<number | null>(null)

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

          if (
            !enabled ||
            !hasMoreRef.current ||
            !canLoadMoreRef.current ||
            isFetchingRef.current
          ) {
            return
          }

          canLoadMoreRef.current = false
          scrollYBeforeFetchRef.current = window.scrollY
          setPage(prev => prev + 1)
        },
        { threshold: 0.5, rootMargin: '0px' },
      )

      observerRef.current.observe(target)
    },
    [disconnectObserver, enabled],
  )

  const loaderRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) {
        disconnectObserver()
        return
      }

      if (!hasMoreRef.current) return
      connectObserver(node)
    },
    [connectObserver, disconnectObserver],
  )

  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setItems([])
      setPage(1)
      setIsFetching(false)
      setError(null)
      hasMoreRef.current = false
      canLoadMoreRef.current = true
      isFetchingRef.current = false
      scrollYBeforeFetchRef.current = null
      lastQueryKeyRef.current = queryKey
      disconnectObserver()
      return
    }

    const queryKeyChanged = lastQueryKeyRef.current !== queryKey

    if (queryKeyChanged) {
      lastQueryKeyRef.current = queryKey
      setItems([])
      setError(null)
      hasMoreRef.current = true
      canLoadMoreRef.current = true
      isFetchingRef.current = false
      scrollYBeforeFetchRef.current = null

      if (page !== 1) {
        setPage(1)
        return
      }
    }

    let cancelled = false

    async function fetchSearch() {
      setIsFetching(true)
      isFetchingRef.current = true

      const response = await getSearch(trimmedQuery, page)

      if (cancelled) return

      if (response.error) {
        setError(response.error)
        setIsFetching(false)
        isFetchingRef.current = false
        scrollYBeforeFetchRef.current = null
        return
      }

      const data = response.data
      const filtered = filterByMediaType(data?.results ?? [], mediaType)
      const nextHasMore = (data?.page ?? 1) < (data?.total_pages ?? 1)

      setError(null)
      hasMoreRef.current = nextHasMore
      if (!nextHasMore) disconnectObserver()

      setItems(prev => mergeResults(prev, filtered, page))
      setIsFetching(false)
      isFetchingRef.current = false
    }

    fetchSearch()

    return () => {
      cancelled = true
    }
  }, [
    disconnectObserver,
    enabled,
    trimmedQuery,
    mediaType,
    page,
    queryKey,
    refetchCount,
  ])

  useLayoutEffect(() => {
    const savedScrollY = scrollYBeforeFetchRef.current
    if (savedScrollY === null || isFetching) return

    scrollYBeforeFetchRef.current = null
    window.scrollTo({ top: savedScrollY, behavior: 'instant' })
  }, [items.length, isFetching])

  const isInitialFetch = isFetching && items.length === 0

  return {
    items,
    isLoading: enabled && isInitialFetch,
    isFetchingMore: enabled && isFetching && !isInitialFetch,
    error: enabled ? error : null,
    loaderRef,
    refetch,
  }
}

export default useSearch
