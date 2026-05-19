import { apiValidCheck, getGenres } from '@/features/movies'

export const rootLoader = async () => {
  const auth = await apiValidCheck()

  if (auth.error) {
    throw new Error(auth.error)
  }

  const genresResult = await getGenres()

  return { genres: genresResult.data ?? [] }
}
