import { useCallback, useMemo } from 'react'

import {
  useInfinitePagination,
  usePaginatedList,
  type BaseMedia,
} from '@/shared'
import useGetContents from './useGetContents'

type UseInfiniteContentsProps = {
  endPoint: string
  params?: Record<string, string | number | boolean>
  scrollRef?: React.RefObject<HTMLUListElement | null>
  direction?: 'horizontal' | 'vertical'
}

function useInfiniteContents<T extends BaseMedia>({
  endPoint,
  params,
  scrollRef,
  direction = scrollRef ? 'horizontal' : 'vertical',
}: UseInfiniteContentsProps) {
  const queryKey = JSON.stringify({ endPoint, params })
  const mode =
    direction === 'horizontal' ? 'horizontal-carousel' : 'vertical-list'

  const pagination = usePaginatedList<T>({ queryKey })

  const { isLoading, isFetching, error, contents, refetch } = useGetContents<T>(
    endPoint,
    { ...params, page: pagination.page },
  )

  const fetchContents = useMemo(() => {
    if (!contents?.results) return null

    return {
      incoming: contents.results,
      page: contents.page,
      totalPages: contents.total_pages,
    }
  }, [contents])

  const { loaderRef, resetSession } = useInfinitePagination({
    pagination,
    mode,
    scrollRef,
    pause: isLoading,
    isFetching,
    fetchContents,
  })

  const handleRefetch = useCallback(() => {
    resetSession()
    refetch()
  }, [refetch, resetSession])

  return {
    loaderRef,
    contents: pagination.items,
    isLoading,
    isFetchingMore: isFetching && pagination.page > 1,
    hasMore: pagination.hasMore,
    error,
    refetch: handleRefetch,
  }
}

export default useInfiniteContents
