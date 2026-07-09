import { useInView } from '@/shared'
import { useGetSeason, type ISeasonMeta } from '@/entities/tv'

import { buildSeasonData } from '../lib'

interface UseTVEpisodesParams {
  tvId: string | undefined
  seasonNumber?: number
  seasonMeta?: ISeasonMeta
}

function useTVEpisodes({
  tvId,
  seasonNumber = 1,
  seasonMeta,
}: UseTVEpisodesParams) {
  const { ref: sectionRef, inView } = useInView()
  const { season, isLoading, error, refetch } = useGetSeason(
    tvId,
    seasonNumber,
    { enabled: inView },
  )

  const { seasonName, posterPath, airDate, episodeCount } = buildSeasonData(
    season,
    seasonMeta,
  )

  const hasEpisodes = !!season?.episodes.length

  return {
    sectionRef,
    season,
    isLoading,
    error,
    refetch,
    seasonName,
    posterPath,
    airDate,
    episodeCount,
    hasEpisodes,
  }
}

export default useTVEpisodes
