import { useEffect, useState } from 'react'
import { getTV } from '@/features/tv/api/tv'
import type { ITV } from '@/entities/tv'

interface IFetchingDataReturn {
  error: string | null
  isLoading: boolean
  tv: ITV | null
}

function useGetTv(
  id: number | string,
  queryParams?: Record<string, string>,
): IFetchingDataReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tv, setTv] = useState<ITV | null>(null)
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }

    let cancelled = false

    async function fetchTv() {
      setIsLoading(true)
      const parsedQuery = queryKey
        ? (JSON.parse(queryKey) as Record<string, string>)
        : undefined
      const result = await getTV(id, parsedQuery)

      if (cancelled) return

      setTv(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    fetchTv()
    return () => {
      cancelled = true
    }
  }, [id, queryKey])

  return { error, isLoading, tv }
}

export default useGetTv
