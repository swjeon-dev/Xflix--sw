import { useEffect, useState } from 'react'
import { getSeason } from '../api/season'
import type { ISeason } from '@/entities/tv'

interface IUseGetSeasonReturn {
  error: string | null
  isLoading: boolean
  season: ISeason | null
  refetch: () => void
}

function useGetSeason(
  tvId: number | string,
  seasonNumber: number | string,
): IUseGetSeasonReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [season, setSeason] = useState<ISeason | null>(null)
  const [fetchKey, setFetchKey] = useState(0)

  useEffect(() => {
    if (!tvId && tvId !== 0) {
      setIsLoading(false)
      return
    }

    let cancelled = false

    async function fetchSeason() {
      setIsLoading(true)
      const result = await getSeason(tvId, seasonNumber)

      if (cancelled) return

      setSeason(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    fetchSeason()
    return () => {
      cancelled = true
    }
  }, [tvId, seasonNumber, fetchKey])

  const refetch = () => setFetchKey(k => k + 1)

  return { error, isLoading, season, refetch }
}

export default useGetSeason
