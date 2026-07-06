import { useMemo, useState } from 'react'

import { buildDisplayGenres, GenreFilter, type IGenre } from '@/shared'
import type { Media } from '@/entities'

import GenreGridList from './GenreGridList'
import { useGenreDiscoverList } from '@/widgets/genre-section/model'

interface GenreSectionProps<T extends Media> {
  label: '영화' | 'TV'
  genres: IGenre[]
  endPoint: string
  allTitle: string
  fallbackTitle: string
  renderItem: (item: T) => React.ReactNode
}

function GenreSection<T extends Media>({
  label,
  genres,
  endPoint,
  allTitle,
  fallbackTitle,
  renderItem,
}: GenreSectionProps<T>) {
  const [selected, setSelected] = useState(0)
  const displayGenres = useMemo(() => buildDisplayGenres(genres), [genres])

  const list = useGenreDiscoverList<T>({
    genres: displayGenres.lists,
    selected,
    endPoint,
    allTitle,
    fallbackTitle,
  })

  return (
    <>
      <GenreFilter
        label={label}
        tabs={displayGenres.tabs}
        selected={selected}
        onSelect={setSelected}
      />
      <GenreGridList
        listTitle={list.listTitle}
        items={list.contents}
        isLoading={list.isLoading}
        isFetchingMore={list.isFetchingMore}
        error={list.error}
        loaderRef={list.loaderRef}
        onRetry={list.refetch}
        renderItem={renderItem}
      />
    </>
  )
}

export default GenreSection
