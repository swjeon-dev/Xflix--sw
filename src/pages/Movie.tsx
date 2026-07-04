import { Helmet } from 'react-helmet-async'

import { GenreMovieSection } from '@/widgets/genre-movie'
import { useGenre } from '@/entities/genre'

function Movie() {
  const { movieGenres } = useGenre()

  return (
    <>
      <Helmet>
        <title>영화 목록</title>
      </Helmet>
      <section>
        <GenreMovieSection genres={movieGenres} />
      </section>
    </>
  )
}

export default Movie
