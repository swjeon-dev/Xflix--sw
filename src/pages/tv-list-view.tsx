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

function TVListView() {
  const {
    genres: { tvGenres },
  } = useRouteLoaderData(LOADER_ID) as { genres: { tvGenres: IGenre[] } }
  const [selected, setSelected] = useState(0)
  const displayGenres = useMemo(() => buildDisplayGenres(tvGenres), [tvGenres])

  return (
    <>
      <Helmet>
        <title>TV 목록</title>
      </Helmet>
      <section>
        <GenreFilter
          type='tv'
          tabs={displayGenres.tabs}
          selected={selected}
          onSelect={setSelected}
        />
        <GenreMoviesList genres={displayGenres.lists} selected={selected} />
      </section>
    </>
  )
}

export default TVListView
