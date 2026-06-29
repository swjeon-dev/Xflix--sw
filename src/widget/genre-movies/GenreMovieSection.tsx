import { useMemo, useState } from 'react'

import { buildDisplayGenres, GenreFilter, type IGenre } from '@/shared'
import GenreMovieList from './GenreMovieList'

export default function GenreMovieSection({ genres }: { genres: IGenre[] }) {
  const [selected, setSelected] = useState(0)
  const displayGenres = useMemo(() => buildDisplayGenres(genres), [genres])

  return (
    <>
      <GenreFilter
        label='영화'
        tabs={displayGenres.tabs}
        selected={selected}
        onSelect={setSelected}
      />
      <GenreMovieList genres={displayGenres.lists} selected={selected} />
    </>
  )
}
