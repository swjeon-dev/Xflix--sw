import { useEffect } from 'react'
import Modal from '@/shared/ui/Modal'
import type { IEpisode } from '@/entities/tv'
import EpisodeDetail from './EpisodeCard'

interface EpisodesModalProps {
  isOpen: boolean
  seasonName: string
  episodes: IEpisode[]
  selectedEpisode: IEpisode | null
  onClose: () => void
  onSelectEpisode: (episode: IEpisode | null) => void
}

function EpisodesModal({
  isOpen,
  seasonName,
  episodes,
  selectedEpisode,
  onClose,
  onSelectEpisode,
}: EpisodesModalProps) {
  const selectedIndex = selectedEpisode
    ? episodes.findIndex(ep => ep.id === selectedEpisode.id)
    : -1

  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex >= 0 && selectedIndex < episodes.length - 1

  function goPrev() {
    if (!hasPrev) return
    onSelectEpisode(episodes[selectedIndex - 1])
  }

  function goNext() {
    if (!hasNext) return
    onSelectEpisode(episodes[selectedIndex + 1])
  }

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (!selectedEpisode) return
      if (e.key === 'ArrowLeft' && selectedIndex > 0) {
        onSelectEpisode(episodes[selectedIndex - 1])
      }
      if (e.key === 'ArrowRight' && selectedIndex < episodes.length - 1) {
        onSelectEpisode(episodes[selectedIndex + 1])
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    isOpen,
    selectedEpisode,
    selectedIndex,
    episodes,
    onClose,
    onSelectEpisode,
  ])

  if (!isOpen) return null

  return (
    <Modal>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80'
        role='dialog'
        aria-modal='true'
        aria-labelledby='episodes-modal-title'
        onClick={onClose}
      >
        <div
          className='relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl bg-zinc-900 text-white shadow-2xl overflow-hidden'
          onClick={e => e.stopPropagation()}
        >
          <header className='flex items-center justify-between gap-4 px-4 py-3 border-b border-white/10 shrink-0'>
            <h2
              id='episodes-modal-title'
              className='text-lg font-semibold truncate'
            >
              {seasonName}
              {selectedEpisode && (
                <span className='text-white/60 font-normal'>
                  {' '}
                  · {selectedEpisode.episode_number}화
                </span>
              )}
            </h2>
            <button
              type='button'
              className='shrink-0 w-9 h-9 rounded-full hover:bg-white/10 text-xl leading-none'
              aria-label='modal close button'
              onClick={onClose}
            >
              ×
            </button>
          </header>

          {selectedEpisode ? (
            <>
              <div className='overflow-y-auto flex-1 p-4'>
                <EpisodeDetail episode={selectedEpisode} />
              </div>
              <footer className='flex items-center justify-between gap-2 px-4 py-3 border-t border-white/10 shrink-0'>
                <button
                  type='button'
                  disabled={!hasPrev}
                  className='px-4 py-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-sm'
                  onClick={goPrev}
                >
                  이전 화
                </button>
                <button
                  type='button'
                  className='px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-sm'
                  onClick={() => onSelectEpisode(null)}
                >
                  목록으로
                </button>
                <button
                  type='button'
                  disabled={!hasNext}
                  className='px-4 py-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-sm'
                  onClick={goNext}
                >
                  다음 화
                </button>
              </footer>
            </>
          ) : (
            <ul className='overflow-y-auto flex-1 flex flex-col gap-2 p-4'>
              {episodes.map(episode => (
                <li key={episode.id}>
                  <button
                    type='button'
                    className='w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors'
                    onClick={() => onSelectEpisode(episode)}
                  >
                    <span className='font-medium'>
                      {episode.episode_number}. {episode.name}
                    </span>
                    {episode.runtime != null && episode.runtime > 0 && (
                      <span className='ml-2 text-sm text-white/50'>
                        {episode.runtime}분
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default EpisodesModal
