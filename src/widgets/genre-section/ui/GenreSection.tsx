import { useState } from 'react'

import type { IGenre } from '@/shared'
import type { Media } from '@/entities'

import { toSortBy, type SortOption } from '../lib'
import { useGenreSection } from '../model'
import GenreGridList from './GenreGridList'
import GenreSortFilter from './GenreSortFilter'

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
  const [sortOption, setSortOption] = useState<SortOption>('popular')

  const {
    selected,
    setSelected,
    displayGenres,
    listTitle,
    loaderRef,
    contents,
    isLoading,
    isFetchingMore,
    error,
    refetch,
  } = useGenreSection<T>({
    genres,
    endPoint,
    allTitle,
    fallbackTitle,
    sortBy: toSortBy(sortOption, label),
  })

  return (
    <>
      <h1 className='pt-24 text-white main-page_px text-3xl md:text-5xl font-semibold'>
        {label}
      </h1>
      <GenreSortFilter
        tabs={displayGenres.tabs}
        selected={selected}
        onSelect={setSelected}
        sortOption={sortOption}
        onSortChange={setSortOption}
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
