import { useEffect, useState } from 'react'

import { getMovie } from '../api/movie'
import type { IMovie } from './movie.types'
import type { QueryParams } from '@/shared'

interface IUseGetMovieReturn {
  error: string | null
  isLoading: boolean
  movie: IMovie | null
}

function useGetMovie(
  id: string | undefined,
  queryParams?: QueryParams,
): IUseGetMovieReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(id))
  const [movie, setMovie] = useState<IMovie | null>(null)
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      setMovie(null)
      setError(null)
      return
    }
    let cancelled = false

    async function fetchMovie(id: string) {
      setIsLoading(true)
      setMovie(null)
      setError(null)

      const parsedQuery = queryKey
        ? (JSON.parse(queryKey) as QueryParams)
        : undefined
      const result = await getMovie(id, parsedQuery)

      if (cancelled) return

      setMovie(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    fetchMovie(id)
    return () => {
      cancelled = true
    }
  }, [id, queryKey])

  return { error, isLoading, movie }
}

export default useGetMovie
