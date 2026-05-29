import { useEffect, useState } from 'react'
import { getMovie } from '@/entities/movie'
import type { IMovie } from '@/entities/movie'

interface IFetchingDataReturn {
  error: string | null
  isLoading: boolean
  movie: IMovie | null
}

function useGetMovie(
  id: number | string,
  queryParams?: Record<string, string>,
): IFetchingDataReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState<IMovie | null>(null)
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }

    let cancelled = false

    async function fetchMovie() {
      setIsLoading(true)
      const parsedQuery = queryKey
        ? (JSON.parse(queryKey) as Record<string, string>)
        : undefined
      const result = await getMovie(id, parsedQuery)

      if (cancelled) return

      setMovie(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    fetchMovie()
    return () => {
      cancelled = true
    }
  }, [id, queryKey])

  return { error, isLoading, movie }
}

export default useGetMovie
