import { useContext } from 'react'
import { GenreContext } from './GenreContext'

function useGenre() {
  const { movieGenres, tvGenres } = useContext(GenreContext)

  return { movieGenres, tvGenres }
}

export default useGenre
