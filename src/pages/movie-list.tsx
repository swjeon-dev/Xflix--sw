import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useRouteLoaderData } from 'react-router'

import {
  buildDisplayGenres,
  GenreFilter,
  GenreMoviesList,
} from '@/widget/genre-movies'
import type { IGenre } from '@/shared/types/contents.types'

const LOADER_ID = 'root'

function MovieListView() {
  const {
    genres: { movieGenres },
  } = useRouteLoaderData(LOADER_ID) as { genres: { movieGenres: IGenre[] } }
  const [selected, setSelected] = useState(0)
  const displayGenres = useMemo(
    () => buildDisplayGenres(movieGenres),
    [movieGenres],
  )

  return (
    <>
      <Helmet>
        <title>영화 목록</title>
      </Helmet>
      <section>
        <GenreFilter
          type='movie'
          tabs={displayGenres.tabs}
          selected={selected}
          onSelect={setSelected}
        />
        <GenreMoviesList genres={displayGenres.lists} selected={selected} />
      </section>
    </>
  )
}

export default MovieListView
