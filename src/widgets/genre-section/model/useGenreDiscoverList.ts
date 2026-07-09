import { getAllDiscoverParams, getDiscoverParams, type IGenre } from '@/shared'
import { useInfiniteContents, type Media } from '@/entities/media'

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
    useInfiniteContents<T>({
      endPoint,
      params,
      direction: 'vertical',
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
