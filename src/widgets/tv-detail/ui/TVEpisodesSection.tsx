import { getTmdbImgPath } from '@/shared/lib'
import { SkeletonUI } from '@/shared/ui'
import { useModal } from '@/shared'
import {
  EpisodePreviewItem,
  useGetSeason,
  type IEpisode,
  type ISeason,
} from '@/entities/tv'

interface TVEpisodesSectionProps {
  tvId: number | string
  seasonNumber?: number
  title?: string
  previewCount?: number
}

function SectionWrapper({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className='flex flex-col gap-4 py-10 text-white main-page_px'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {children}
    </section>
  )
}

function SeasonHeader({
  seasonName,
  posterPath,
  episodeCount,
  airDate,
  onOpenAll,
}: {
  seasonName: string
  posterPath: string | null
  episodeCount: number
  airDate: string
  onOpenAll: () => void
}) {
  const posterUrl = getTmdbImgPath({ path: posterPath, size: 'w154' })

  return (
    <div className='flex flex-wrap gap-4 items-center justify-between mb-2'>
      <div className='flex gap-4 items-start'>
        {posterUrl && (
          <img
            src={posterUrl}
            alt={seasonName}
            className='w-24 md:w-32 rounded-md object-cover shrink-0'
          />
        )}
        <div className='flex flex-col gap-1'>
          <h3 className='text-xl font-semibold'>{seasonName}</h3>
          <p className='text-sm text-white/60'>
            {episodeCount}화{airDate ? ` · ${airDate.split('-')[0]}` : ''}
          </p>
        </div>
      </div>
      <button
        type='button'
        className='px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm shrink-0'
        onClick={onOpenAll}
      >
        에피소드 목록 ({episodeCount}화)
      </button>
    </div>
  )
}

function EpisodePreviewSkeleton() {
  return (
    <li className='p-3 rounded-lg bg-white/5' aria-hidden>
      <SkeletonUI />
    </li>
  )
}

function EpisodesError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className='flex flex-col gap-4 items-center py-8'>
      <p className='text-lg text-white/70'>
        에피소드 목록을 불러오지 못했습니다.
      </p>
      {onRetry && (
        <button
          type='button'
          className='px-4 py-2 rounded bg-white/10 hover:bg-white/20'
          onClick={onRetry}
        >
          다시 시도
        </button>
      )}
    </div>
  )
}

function openEpisodesModal(
  openModal: ReturnType<typeof useModal>['openModal'],
  season: ISeason,
  episode: IEpisode | null = null,
) {
  openModal({
    type: 'episodes',
    props: {
      seasonName: season.name,
      episodes: season.episodes,
      initialEpisode: episode,
    },
  })
}

function TVEpisodesSection({
  tvId,
  seasonNumber = 1,
  title = '에피소드',
  previewCount = 5,
}: TVEpisodesSectionProps) {
  const { openModal } = useModal()
  const { season, isLoading, error, refetch } = useGetSeason(
    String(tvId),
    seasonNumber,
  )

  if (isLoading) {
    return (
      <SectionWrapper title={title}>
        <ul className='flex flex-col gap-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <EpisodePreviewSkeleton key={i} />
          ))}
        </ul>
      </SectionWrapper>
    )
  }

  if (error) {
    return (
      <SectionWrapper title={title}>
        <EpisodesError onRetry={refetch} />
      </SectionWrapper>
    )
  }

  if (!season?.episodes.length) return null

  const previewEpisodes = season.episodes.slice(0, previewCount)
  const remainingCount = season.episodes.length - previewEpisodes.length

  return (
    <SectionWrapper title={title}>
      <SeasonHeader
        seasonName={season.name}
        posterPath={season.poster_path}
        episodeCount={season.episodes.length}
        airDate={season.air_date}
        onOpenAll={() => openEpisodesModal(openModal, season)}
      />

      <ul className='flex flex-col gap-2'>
        {previewEpisodes.map((episode: IEpisode) => (
          <EpisodePreviewItem
            key={episode.id}
            episode={episode}
            onClick={ep => openEpisodesModal(openModal, season, ep)}
          />
        ))}
        {remainingCount > 0 && (
          <li>
            <button
              type='button'
              className='w-full py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors'
              onClick={() => openEpisodesModal(openModal, season)}
            >
              + {remainingCount}화 더 보기
            </button>
          </li>
        )}
      </ul>
    </SectionWrapper>
  )
}

export default TVEpisodesSection
