import { useModal } from '@/shared'
import type { ISeasonMeta } from '@/entities/tv'

import { openEpisodesModal } from '../lib'
import { useTVEpisodes } from '../model'
import TVEpisodesWrapper from './TVEpisodesWrapper'
import TVEpisodesHeader from './TVEpisodesHeader'
import TVEpisodesLoader from './TVEpisodesLoader'
import TVEpisodesError from './TVEpisodesError'
import TVEpisodesContents from './TVEpisodesContents'

interface TVEpisodesProps {
  tvId: string | undefined
  seasonNumber?: number
  title?: string
  previewCount?: number
  seasonMeta?: ISeasonMeta
}

function TVEpisodes({
  tvId,
  seasonNumber = 1,
  title = '에피소드',
  previewCount = 5,
  seasonMeta,
}: TVEpisodesProps) {
  const { openModal } = useModal()
  const {
    season,
    isLoading,
    error,
    refetch,
    seasonName,
    posterPath,
    airDate,
    episodeCount,
    hasEpisodes,
  } = useTVEpisodes({ tvId, seasonNumber, seasonMeta })

  if (!isLoading && !error && !hasEpisodes) return null

  return (
    <TVEpisodesWrapper title={title}>
      <TVEpisodesHeader
        seasonName={seasonName ?? null}
        posterPath={posterPath}
        episodeCount={episodeCount}
        airDate={airDate}
        onOpenAll={() => season && openEpisodesModal(openModal, season)}
      />
      {isLoading && <TVEpisodesLoader length={previewCount} />}
      {error && <TVEpisodesError onRetry={refetch} />}
      {hasEpisodes && season && (
        <TVEpisodesContents season={season} previewCount={previewCount} />
      )}
    </TVEpisodesWrapper>
  )
}

export default TVEpisodes
