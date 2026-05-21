import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useRouteLoaderData } from 'react-router'

import {
  buildDisplayGenres,
  GenreFilter,
  GenreMoviesList,
} from '@/widget/genre-movies'
import type { IGenre } from '@/entities/movie/model'

function GenreMovies() {
  const { genres } = useRouteLoaderData('root') as { genres: IGenre[] }
  const [selected, setSelected] = useState(0)
  const displayGenres = useMemo(() => buildDisplayGenres(genres), [genres])

  return (
    <>
      <Helmet>
        <title>Movie List</title>
      </Helmet>
      <section>
        <GenreFilter
          tabs={displayGenres.tabs}
          selected={selected}
          onSelect={setSelected}
        />
        <GenreMoviesList genres={displayGenres.lists} selected={selected} />
      </section>
    </>
  )
}

export default GenreMovies
