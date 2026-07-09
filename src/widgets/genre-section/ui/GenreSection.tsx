import { GenreFilter, type IGenre } from '@/shared'
import type { Media } from '@/entities'

import { useGenreSection } from '../model'
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
