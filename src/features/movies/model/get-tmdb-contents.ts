import { useEffect, useState } from 'react'
import { getTmdbContents } from '../api/tmdb-service'
import type { ApiPath } from '../../../shared/config/api-config'
import type { ITmdbContents } from '@/entities/movie/model'

interface IFetchingDataReturn {
  error: string | null
  isLoading: boolean
  contents: ITmdbContents | null
}

function useGetContents(
  endPoint: ApiPath,
  queryParams?: Record<string, string | number | boolean>,
): IFetchingDataReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [contents, setContents] = useState<ITmdbContents | null>(null)
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  useEffect(() => {
    if (!endPoint) return

    let cancelled = false

    async function fetchContents() {
      setIsLoading(true)
      const parsedQuery = queryKey
        ? (JSON.parse(queryKey) as Record<string, string | number | boolean>)
        : undefined
      const result = await getTmdbContents(endPoint, parsedQuery)

      if (cancelled) return

      setContents(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    fetchContents()
    return () => {
      cancelled = true
    }
  }, [endPoint, queryKey])

  return { error, isLoading, contents }
}

export default useGetContents
