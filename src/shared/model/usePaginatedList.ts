import { useCallback, useEffect, useState } from 'react'

import { mergePaginatedResults } from '@/shared'

type UsePaginatedListOptions<T> = {
  queryKey: string
  enabled?: boolean
  getKey?: (item: T) => string | number
  hasMoreOnReset?: boolean
  hasMoreWhenDisabled?: boolean
}

function usePaginatedList<T>({
  queryKey,
  enabled = true,
  getKey,
  hasMoreOnReset = true,
  hasMoreWhenDisabled = false,
}: UsePaginatedListOptions<T>) {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(hasMoreOnReset)

  const reset = useCallback(() => {
    setPage(1)
    setItems([])
    setHasMore(enabled ? hasMoreOnReset : hasMoreWhenDisabled)
  }, [enabled, hasMoreOnReset, hasMoreWhenDisabled])

  useEffect(() => {
    reset()
  }, [queryKey, enabled, reset])

  const loadMore = useCallback(() => {
    setPage(prev => prev + 1)
  }, [])

  const applyPageResult = useCallback(
    (incoming: T[], responsePage: number, totalPages: number) => {
      setHasMore(responsePage < totalPages)
      setItems(prev =>
        mergePaginatedResults(prev, incoming, responsePage, getKey),
      )
    },
    [getKey],
  )

  return {
    page,
    items,
    hasMore,
    loadMore,
    applyPageResult,
    reset,
  }
}

export { usePaginatedList }
export type { UsePaginatedListOptions }
