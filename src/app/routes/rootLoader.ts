import { apiValidCheck } from '@/shared/api/tmdb/auth'
import { getGenres } from '@/shared/api/tmdb/genres'

export const rootLoader = async () => {
  const auth = await apiValidCheck()

  if (auth.error) {
    throw new Error(auth.error)
  }

  const [movieGenres, tvGenres] = await Promise.all([
    getGenres('movie'),
    getGenres('tv'),
  ])

  return {
    genres: {
      movieGenres: movieGenres.data ?? [],
      tvGenres: tvGenres.data ?? [],
    },
  }
}
