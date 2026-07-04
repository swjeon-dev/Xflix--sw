import { createContext } from 'react'
import type { IGenre } from '@/shared'

interface GenreContextValue {
  movieGenres: IGenre[]
  tvGenres: IGenre[]
}

const GenreContext = createContext<GenreContextValue>({
  movieGenres: [],
  tvGenres: [],
})

export { GenreContext, type GenreContextValue }
