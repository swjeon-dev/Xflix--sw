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
  const { season, isLoading, error, refetch } = useGetSeason(tvId, seasonNumber)

  const { seasonName, posterPath, airDate, episodeCount } = buildSeasonData(
    season,
    seasonMeta,
  )

  const hasEpisodes = !!season?.episodes.length

  return {
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
