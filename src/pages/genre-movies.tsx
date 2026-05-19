import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useRouteLoaderData } from 'react-router'
import type { IGenre } from '@/features/movies'
import {
  buildDisplayGenres,
  GenreFilter,
  GenreMoviesList,
} from '@/widget/genre-movies'

function GenreMovies() {
  const { genres } = useRouteLoaderData('root') as { genres: IGenre[] }
  const [selected, setSelected] = useState(0)
  const displayGenres = useMemo(() => buildDisplayGenres(genres), [genres])

  return (
    <>
      <Helmet>
        <title>Movie List</title>
      </Helmet>
      <GenreFilter
        tabs={displayGenres.tabs}
        selected={selected}
        onSelect={setSelected}
      />
      <GenreMoviesList
        lists={displayGenres.lists}
        selected={selected}
      />
    </>
  )
}

export default GenreMovies
