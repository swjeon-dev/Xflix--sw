import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useRouteLoaderData } from 'react-router'

import { MediaVideoType, ROOT_LOADER_ID, type IGenre } from '@/shared'
import { buildDisplayGenres, GenreFilter } from '@/widget/genre'
import { ContentListUI } from '@/widget/media-list'

function ContentList({ type }: { type: MediaVideoType }) {
  const {
    genres: { tvGenres, movieGenres },
  } = useRouteLoaderData(ROOT_LOADER_ID) as {
    genres: { tvGenres: IGenre[]; movieGenres: IGenre[] }
  }

  const [selected, setSelected] = useState(0)

  const title = type === 'tv' ? 'TV' : '영화'

  const displayGenres = useMemo(() => {
    if (type === 'tv') {
      return buildDisplayGenres(tvGenres)
    } else if (type === 'movie') {
      return buildDisplayGenres(movieGenres)
    }
    return { tabs: [], lists: [] }
  }, [tvGenres, movieGenres, type])

  return (
    <>
      <Helmet>
        <title>{title} 목록</title>
      </Helmet>
      <section>
        <GenreFilter
          type={type}
          tabs={displayGenres.tabs}
          selected={selected}
          onSelect={setSelected}
        />
        <ContentListUI
          type={type}
          genres={displayGenres.lists}
          selected={selected}
        />
      </section>
    </>
  )
}

export default ContentList
