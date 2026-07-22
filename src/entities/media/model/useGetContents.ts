import { useCallback, useEffect, useState } from 'react'

import {
  parseQueryKey,
  type ITmdbContents,
  type QueryParams,
  type BaseMedia,
} from '@/shared'

import { getContents } from '../api'

interface IFetchingDataReturn<T extends BaseMedia> {
  error: string | null
  isLoading: boolean
  isFetching: boolean
  contents: ITmdbContents<T> | null
  refetch: () => void
}

function useGetContents<T extends BaseMedia>(
  endPoint: string,
  queryParams?: QueryParams,
): IFetchingDataReturn<T> {
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [contents, setContents] = useState<ITmdbContents<T> | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!endPoint) {
      setIsLoading(false)
      setIsFetching(false)
      setContents(null)
      setError(null)
      return
    }

    let cancelled = false

    async function loadContents() {
      const parsedQuery = parseQueryKey(queryKey)
      const page = Number(parsedQuery?.page ?? 1)
      const isInitialPage = page === 1

      if (isInitialPage) setIsLoading(true)
      setIsFetching(true)

      const result = await getContents<T>(endPoint, parsedQuery)

      if (cancelled) return

      setContents(result.data)
      setError(result.error)
      setIsFetching(false)
      if (isInitialPage) setIsLoading(false)
    }

    loadContents()

    return () => {
      cancelled = true
    }
  }, [endPoint, queryKey, refetchCount])

  return { error, isLoading, isFetching, contents, refetch }
}

export default useGetContents
