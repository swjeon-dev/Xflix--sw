import { useCallback, useEffect, useState } from 'react'

import { getSeason } from '../api'
import type { ISeason } from './season.types'

interface IUseGetSeasonReturn {
  error: string | null
  isLoading: boolean
  season: ISeason | null
  refetch: () => void
}

function useGetSeason(
  tvId: string | undefined,
  seasonNumber: number | string | undefined,
  options?: { enabled?: boolean },
): IUseGetSeasonReturn {
  const enabled = options?.enabled ?? true

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [season, setSeason] = useState<ISeason | null>(null)
  const [refetchCount, setRefetchCount] = useState(0)

  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!enabled || !tvId || seasonNumber == null) {
      setIsLoading(false)
      setSeason(null)
      setError(null)
      return
    }

    const seriesId = tvId
    const resolvedSeasonNumber = seasonNumber
    let cancelled = false

    async function loadSeason() {
      setIsLoading(true)
      setSeason(null)
      setError(null)

      const result = await getSeason(seriesId, String(resolvedSeasonNumber))

      if (cancelled) return

      setSeason(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    loadSeason()

    return () => {
      cancelled = true
    }
  }, [tvId, seasonNumber, enabled, refetchCount])

  return { error, isLoading, season, refetch }
}

export default useGetSeason
