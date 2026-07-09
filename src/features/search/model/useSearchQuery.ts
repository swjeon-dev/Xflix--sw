import { useCallback, useEffect, useState } from 'react'

import { getSearch } from '../api'
import { filterByMediaType } from '../lib'
import type { ISearchData, SearchMediaType } from './search.types'

type SearchQueryResult = {
  results: ISearchData[]
  page: number
  totalPages: number
}

type UseSearchQueryProps = {
  query: string
  mediaType: SearchMediaType
  page: number
  enabled: boolean
}

function useSearchQuery({
  query,
  mediaType,
  page,
  enabled,
}: UseSearchQueryProps) {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SearchQueryResult | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setIsFetching(false)
      setResult(null)
      setError(null)
      return
    }

    let cancelled = false

    async function loadSearch() {
      setIsFetching(true)
      setResult(null)
      setError(null)

      const response = await getSearch(query, page)

      if (cancelled) return

      if (response.error) {
        setError(response.error)
        setIsFetching(false)
        return
      }

      const data = response.data

      setResult({
        results: filterByMediaType(data?.results ?? [], mediaType),
        page: data?.page ?? 1,
        totalPages: data?.total_pages ?? 1,
      })
      setIsFetching(false)
    }

    loadSearch()

    return () => {
      cancelled = true
    }
  }, [query, mediaType, page, enabled, refetchCount])

  return { result, error, isFetching, refetch }
}

export default useSearchQuery
