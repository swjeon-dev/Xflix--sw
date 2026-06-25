import { useState } from 'react'
import { getTmdbImgPath } from '@/shared/lib'
import { SkeletonUI } from '@/shared/ui'
import type { IEpisode } from '@/entities/tv'
import useGetSeason from '../model/useGetSeason'
import { EpisodePreviewItem } from './episode-row'
import EpisodesModal from './episodes-modal'

interface EpisodesListProps {
  tvId: number | string
  seasonNumber?: number
  title?: string
  /** 목록에 보여줄 미리보기 개수 (나머지는 모달에서) */
  previewCount?: number
}

function EpisodesListWrapper({
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

function EpisodesList({
  tvId,
  seasonNumber = 1,
  title = '에피소드',
  previewCount = 5,
}: EpisodesListProps) {
  const { season, isLoading, error, refetch } = useGetSeason(
    String(tvId),
    seasonNumber,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null)

  function openModal(episode: IEpisode | null = null) {
    setSelectedEpisode(episode)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setSelectedEpisode(null)
  }

  function handleSelectEpisode(episode: IEpisode | null) {
    setSelectedEpisode(episode)
  }

  if (isLoading) {
    return (
      <EpisodesListWrapper title={title}>
        <ul className='flex flex-col gap-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <EpisodePreviewSkeleton key={i} />
          ))}
        </ul>
      </EpisodesListWrapper>
    )
  }

  if (error) {
    return (
      <EpisodesListWrapper title={title}>
        <div className='flex flex-col gap-4 items-center py-8'>
          <p className='text-lg text-white/70'>
            에피소드 목록을 불러오지 못했습니다.
          </p>
          <button
            type='button'
            className='px-4 py-2 rounded bg-white/10 hover:bg-white/20'
            onClick={refetch}
          >
            다시 시도
          </button>
        </div>
      </EpisodesListWrapper>
    )
  }

  if (!season?.episodes.length) return null

  const previewEpisodes = season.episodes.slice(0, previewCount)
  const remainingCount = season.episodes.length - previewEpisodes.length

  return (
    <EpisodesListWrapper title={title}>
      <SeasonHeader
        seasonName={season.name}
        posterPath={season.poster_path}
        episodeCount={season.episodes.length}
        airDate={season.air_date}
        onOpenAll={() => openModal(null)}
      />

      <ul className='flex flex-col gap-2'>
        {previewEpisodes.map((episode: IEpisode) => (
          <EpisodePreviewItem
            key={episode.id}
            episode={episode}
            onClick={ep => openModal(ep)}
          />
        ))}
        {remainingCount > 0 && (
          <li>
            <button
              type='button'
              className='w-full py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors'
              onClick={() => openModal(null)}
            >
              + {remainingCount}화 더 보기
            </button>
          </li>
        )}
      </ul>

      <EpisodesModal
        isOpen={isModalOpen}
        seasonName={season.name}
        episodes={season.episodes}
        selectedEpisode={selectedEpisode}
        onClose={closeModal}
        onSelectEpisode={handleSelectEpisode}
      />
    </EpisodesListWrapper>
  )
}

export default EpisodesList
