import { useInView, useModal } from '@/shared'
import { useGetSeason, type ISeasonMeta } from '@/entities/tv'

import { buildSeasonData, openEpisodesModal } from '../lib'
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

  if (episodeCount === 0) return null

  const hasEpisodes = !!season?.episodes.length

  return (
    <TVEpisodesWrapper title={title} sectionRef={sectionRef}>
      <TVEpisodesHeader
        seasonName={seasonName ?? null}
        posterPath={posterPath}
        episodeCount={episodeCount}
        airDate={airDate}
        onOpenAll={() => season && openEpisodesModal(openModal, season)}
        isOpenDisabled={!hasEpisodes}
      />
      {isLoading && <TVEpisodesLoader length={previewCount} />}
      {error && <TVEpisodesError onRetry={refetch} />}
      {hasEpisodes && (
        <TVEpisodesContents season={season} previewCount={previewCount} />
      )}
    </TVEpisodesWrapper>
  )
}

export default TVEpisodes
