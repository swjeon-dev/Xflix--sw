import { useEffect, useState } from 'react'
import { getTmdbContents } from '../api/tmdb-service'
import type { ApiPath } from '../../../shared/config/api-config'
import type { ITmdbContents } from '@/entities/movie/model'

interface IFetchingDataReturn {
  error: string | null
  isLoading: boolean
  isFetching: boolean
  contents: ITmdbContents | null
  refetch: () => void
}

function useGetContents(
  endPoint: ApiPath,
  queryParams?: Record<string, string | number | boolean>,
): IFetchingDataReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [contents, setContents] = useState<ITmdbContents | null>(null)
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

      const result = await getTmdbContents(endPoint, parsedQuery)

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
