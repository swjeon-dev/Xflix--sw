import { type GenreContextValue } from '@/entities/genre'
import { apiValidCheck } from '@/shared/api/tmdb/auth'
import { getGenres } from '@/shared'

export const rootLoader = async (): Promise<GenreContextValue> => {
  const auth = await apiValidCheck()

  if (auth.error) {
    throw new Error(auth.error)
  }

  const [movieGenres, tvGenres] = await Promise.all([
    getGenres('movie'),
    getGenres('tv'),
  ])

  return {
    movieGenres: movieGenres.data ?? [],
    tvGenres: tvGenres.data ?? [],
  }
}
