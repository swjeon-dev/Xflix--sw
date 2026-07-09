import { useEffect, useState } from 'react'

import { parseQueryKey, type QueryParams } from '@/shared'

import { getMovie } from '../api'
import type { IMovie } from './movie.types'

interface IUseGetMovieReturn {
  error: string | null
  isLoading: boolean
  movie: IMovie | null
}

function useGetMovie(
  id: string | undefined,
  queryParams?: QueryParams,
): IUseGetMovieReturn {
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(id))
  const [movie, setMovie] = useState<IMovie | null>(null)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      setMovie(null)
      setError(null)
      return
    }

    const movieId = id
    let cancelled = false

    async function loadMovie() {
      setIsLoading(true)
      setMovie(null)
      setError(null)

      const result = await getMovie(movieId, parseQueryKey(queryKey))

      if (cancelled) return

      setMovie(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    loadMovie()

    return () => {
      cancelled = true
    }
  }, [id, queryKey])

  return { error, isLoading, movie }
}

export default useGetMovie
