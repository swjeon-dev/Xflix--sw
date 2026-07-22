import { useState } from 'react'

import type { IGenre, BaseMedia } from '@/shared'

import { toSortBy, type SortOption } from '../lib'
import { useGenreSection } from '../model'
import GenreGridList from './GenreGridList'
import GenreSortFilter from './GenreSortFilter'

interface GenreSectionProps<T extends BaseMedia> {
  label: '영화' | 'TV'
  genres: IGenre[]
  endPoint: string
  allTitle: string
  fallbackTitle: string
  renderItem: (item: T) => React.ReactNode
}

function GenreSection<T extends BaseMedia>({
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
    media: label === '영화' ? 'movie' : 'tv',
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
