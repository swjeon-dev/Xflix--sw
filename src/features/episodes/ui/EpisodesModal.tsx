import type { IEpisode } from '@/entities/tv'

import useEpisode from '../model/useEpisode'
import EpisodeModalContents from './EpisodeModalContents'
import EpisodeModalWrapper from './EpisodeModalWrapper'

interface EpisodesModalProps {
  onClose: () => void
  seasonName: string
  episodes: IEpisode[]
  initialEpisode?: IEpisode | null
}

function EpisodesModal({
  onClose,
  seasonName,
  episodes,
  initialEpisode = null,
}: EpisodesModalProps) {
  const {
    selectedEpisode,
    setSelectedEpisode,
    hasPrev,
    hasNext,
    goPrev,
    goNext,
    subtitle,
  } = useEpisode({ initialEpisode, episodes, onClose })

  const footer = selectedEpisode ? (
    <>
      <button
        type='button'
        disabled={!hasPrev}
        className='rounded bg-white/10 px-4 py-2 text-sm hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40'
        onClick={goPrev}
      >
        이전 화
      </button>
      <button
        type='button'
        className='rounded bg-white/10 px-4 py-2 text-sm hover:bg-white/20'
        onClick={() => setSelectedEpisode(null)}
      >
        목록으로
      </button>
      <button
        type='button'
        disabled={!hasNext}
        className='rounded bg-white/10 px-4 py-2 text-sm hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40'
        onClick={goNext}
      >
        다음 화
      </button>
    </>
  ) : undefined

  return (
    <EpisodeModalWrapper
      title={seasonName}
      subtitle={subtitle}
      onClose={onClose}
      footer={footer}
    >
      <EpisodeModalContents
        episodes={episodes}
        selectedEpisode={selectedEpisode}
        onSelectEpisode={setSelectedEpisode}
      />
    </EpisodeModalWrapper>
  )
}

export default EpisodesModal
