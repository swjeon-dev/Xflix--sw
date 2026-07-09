import { useEffect, useState } from 'react'

import { parseQueryKey, type QueryParams } from '@/shared'

import { getTV } from '../api'
import type { ITV } from './tv.types'

interface IUseGetTVReturn {
  error: string | null
  isLoading: boolean
  tv: ITV | null
}

function useGetTV(
  id: string | undefined,
  queryParams?: QueryParams,
): IUseGetTVReturn {
  const queryKey = queryParams ? JSON.stringify(queryParams) : ''

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(id))
  const [tv, setTv] = useState<ITV | null>(null)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      setTv(null)
      setError(null)
      return
    }

    const tvId = id
    let cancelled = false

    async function loadTv() {
      setIsLoading(true)
      setTv(null)
      setError(null)

      const result = await getTV(tvId, parseQueryKey(queryKey))

      if (cancelled) return

      setTv(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    loadTv()

    return () => {
      cancelled = true
    }
  }, [id, queryKey])

  return { error, isLoading, tv }
}

export default useGetTV
