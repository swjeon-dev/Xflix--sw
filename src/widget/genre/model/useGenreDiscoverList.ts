import {
  getAllDiscoverParams,
  getDiscoverParams,
  useGetContents,
  useListInfiniteScroll,
  type IGenre,
} from '@/shared'
import type { Media } from '@/entities'

interface UseGenreDiscoverListParams {
  genres: IGenre[]
  selected: number
  endPoint: string
  allTitle: string
  fallbackTitle: string
}

function useGenreDiscoverList<T extends Media>({
  genres,
  selected,
  endPoint,
  allTitle,
  fallbackTitle,
}: UseGenreDiscoverListParams) {
  const selectedGenre = genres.find(genre => genre.id === selected)
  const params =
    selected === 0 ? getAllDiscoverParams() : getDiscoverParams(selected)

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useListInfiniteScroll<T>({
      endPoint,
      params,
      direction: 'vertical',
      useContents: useGetContents<T>,
    })

  const listTitle =
    selected === 0 ? allTitle : (selectedGenre?.name ?? fallbackTitle)

  return {
    loaderRef,
    contents,
    isLoading,
    isFetchingMore,
    error,
    refetch,
    listTitle,
  }
}

export default useGenreDiscoverList
