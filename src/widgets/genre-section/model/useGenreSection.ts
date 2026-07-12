import { useMemo, useState } from 'react'

import { buildDisplayGenres, type DiscoverMedia, type IGenre, type SortBy } from '@/shared'
import { useInfiniteContents, type Media } from '@/entities/media'

import { getDiscoverListParams, getDiscoverListTitle } from '../lib'

interface UseGenreSectionParams {
  genres: IGenre[]
  endPoint: string
  allTitle: string
  fallbackTitle: string
  sortBy: SortBy
  media: DiscoverMedia
}

function useGenreSection<T extends Media>({
  genres,
  endPoint,
  allTitle,
  fallbackTitle,
  sortBy,
  media,
}: UseGenreSectionParams) {
  const [selected, setSelected] = useState(0)
  const displayGenres = useMemo(() => buildDisplayGenres(genres), [genres])

  const params = getDiscoverListParams(selected, sortBy, media)
  const listTitle = getDiscoverListTitle(
    selected,
    displayGenres.lists,
    allTitle,
    fallbackTitle,
  )

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useInfiniteContents<T>({
      endPoint,
      params,
      direction: 'vertical',
    })

  return {
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
  }
}

export default useGenreSection
