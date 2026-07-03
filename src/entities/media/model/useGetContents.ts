import { useEffect, useState } from 'react'

import { tmdbFetch, type ITmdbContents, type QueryParams } from '@/shared'
import type { Media } from '@/entities'

interface IFetchingDataReturn<T extends Media> {
  error: string | null
  isLoading: boolean
  isFetching: boolean
  contents: ITmdbContents<T> | null
  refetch: () => void
}

// 무한 스크롤 컴포넌트 사용을 위한 hook
function useGetContents<T extends Media>(
  endPoint: string,
  queryParams?: QueryParams,
): IFetchingDataReturn<T> {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [contents, setContents] = useState<ITmdbContents<T> | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  function refetch() {
    setRefetchCount(prev => prev + 1)
  }

  useEffect(() => {
    if (!endPoint) return

    let cancelled = false

    async function fetchContents() {
      const parsedQuery = queryKey
        ? (JSON.parse(queryKey) as Record<string, string | number | boolean>)
        : undefined
      const page = Number(parsedQuery?.page ?? 1)
      const isInitialPage = page === 1

      if (isInitialPage) setIsLoading(true)
      setIsFetching(true)

      const result = await tmdbFetch<ITmdbContents<T>>(endPoint, parsedQuery)

      if (cancelled) return

      setContents(result.data)
      setError(result.error)
      setIsFetching(false)
      if (isInitialPage) setIsLoading(false)
    }

    fetchContents()
    return () => {
      cancelled = true
    }
  }, [endPoint, queryKey, refetchCount])

  return { error, isLoading, isFetching, contents, refetch }
}

export default useGetContents
