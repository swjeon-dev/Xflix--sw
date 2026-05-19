import { useEffect, useState } from 'react'
import { getTmdbContents } from '../api/tmdb-service'
import type { ApiPath } from '../api/config'
import type { IMovie } from '../types'

interface IFetchingDataReturn {
  error: string | null
  isLoading: boolean
  contents: IMovie[] | null
}

function useGetContents(
  endPoint: ApiPath,
  queryParams?: Record<string, string>,
): IFetchingDataReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [contents, setContents] = useState<IMovie[] | null>(null)
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  useEffect(() => {
    if (!endPoint) return

    let cancelled = false

    async function fetchContents() {
      setIsLoading(true)
      const parsedQuery = queryKey
        ? (JSON.parse(queryKey) as Record<string, string>)
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
