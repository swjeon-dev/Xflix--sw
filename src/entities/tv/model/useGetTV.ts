import { useEffect, useState } from 'react'

import { getTV } from '../api/tv'
import type { ITV } from './tv.types'

export interface IFetchingDataReturn {
  error: string | null
  isLoading: boolean
  tv: ITV | null
}

function useGetTV(
  id: string | undefined,
  queryParams?: Record<string, string>,
): IFetchingDataReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tv, setTv] = useState<ITV | null>(null)
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      setTv(null)
      setError(null)
      return
    }

    let cancelled = false

    async function fetchTv(id: string) {
      setIsLoading(true)
      setTv(null)
      setError(null)

      const parsedQuery = queryKey
        ? (JSON.parse(queryKey) as Record<string, string>)
        : undefined
      const result = await getTV(id, parsedQuery)

      if (cancelled) return

      setTv(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    fetchTv(id)
    return () => {
      cancelled = true
    }
  }, [id, queryKey])

  return { error, isLoading, tv }
}

export default useGetTV
