import { useEffect, useState } from 'react'

import { getSeason } from '../api/season'
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
  const [fetchKey, setFetchKey] = useState(0)

  useEffect(() => {
    if (!enabled || !tvId || seasonNumber == null) {
      setIsLoading(false)
      return
    }

    const seriesId = tvId
    let cancelled = false

    async function fetchSeason() {
      setIsLoading(true)
      setError(null)

      const result = await getSeason(seriesId, String(seasonNumber))

      if (cancelled) return

      setSeason(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    fetchSeason()

    return () => {
      cancelled = true
    }
  }, [tvId, seasonNumber, fetchKey, enabled])

  const refetch = () => setFetchKey(k => k + 1)

  return { error, isLoading, season, refetch }
}

export default useGetSeason
