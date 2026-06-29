import { useMemo, useState } from 'react'

import { buildDisplayGenres, GenreFilter, type IGenre } from '@/shared'

import GenreTVList from './GenreTVList'

interface GenreTVSectionProps {
  genres: IGenre[]
}

function GenreTVSection({ genres }: GenreTVSectionProps) {
  const [selected, setSelected] = useState(0)
  const displayGenres = useMemo(() => buildDisplayGenres(genres), [genres])

  return (
    <>
      <GenreFilter
        label='TV'
        tabs={displayGenres.tabs}
        selected={selected}
        onSelect={setSelected}
      />
      <GenreTVList genres={displayGenres.lists} selected={selected} />
    </>
  )
}

export default GenreTVSection
