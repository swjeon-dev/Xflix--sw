import { Helmet } from 'react-helmet-async'
import { useRouteLoaderData } from 'react-router'

import type { IGenre } from '@/shared'
import { GenreMovieSection } from '@/widget/genre-movie'

const LOADER_ID = 'root'

function Movie() {
  const {
    genres: { movieGenres },
  } = useRouteLoaderData(LOADER_ID) as { genres: { movieGenres: IGenre[] } }

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
