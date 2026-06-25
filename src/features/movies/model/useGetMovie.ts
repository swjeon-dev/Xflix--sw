import { useEffect, useState } from 'react'
import { getMovie } from '../api/movie'
import type { IMovie } from '@/entities/movie'
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

      const result = await getMovie(id, queryParams)

      if (cancelled) return

      setMovie(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    fetchMovie(id)
    return () => {
      cancelled = true
    }
  }, [id])

  return { error, isLoading, movie }
}

export default useGetMovie
