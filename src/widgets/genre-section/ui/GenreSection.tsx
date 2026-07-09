import { useMemo, useState } from 'react'

import { buildDisplayGenres, GenreFilter, type IGenre } from '@/shared'
import type { Media } from '@/entities'
import { useInfiniteContents } from '@/entities/media'

import { getDiscoverListParams, getDiscoverListTitle } from '../lib'
import GenreGridList from './GenreGridList'

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

  const params = getDiscoverListParams(selected)
  const listTitle = getDiscoverListTitle(
    selected,
    displayGenres.lists,
    allTitle,
    fallbackTitle,
  )

  const {
    loaderRef,
    contents,
    isLoading,
    isFetchingMore,
    error,
    refetch,
  } = useInfiniteContents<T>({
    endPoint,
    params,
    direction: 'vertical',
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
        listTitle={listTitle}
        items={contents}
        isLoading={isLoading}
        isFetchingMore={isFetchingMore}
        error={error}
        loaderRef={loaderRef}
        onRetry={refetch}
        renderItem={renderItem}
      />
    </>
  )
}

export default GenreSection
