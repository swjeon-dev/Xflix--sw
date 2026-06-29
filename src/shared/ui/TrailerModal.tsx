import { useEffect } from 'react'

import { buildYoutubeEmbedUrl } from '../lib'
import { useGetVideo, type MediaVideoType } from '../model'
import Modal from './Modal'
import { LoadingComponent } from './LoadingScreen'

interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  contentId: number | string
  contentTitle: string
  mediaType: MediaVideoType
}

function TrailerModalContent({
  title,
  youtubeEmbedUrl,
}: {
  title: string
  youtubeEmbedUrl: string
}) {
  return (
    <iframe
      title={`${title} 트레일러`}
      src={youtubeEmbedUrl}
      className='absolute inset-0 w-full h-full'
      allow='autoplay; encrypted-media; picture-in-picture'
      allowFullScreen
    />
  )
}

function TrailerModalContentError({ error }: { error: string | null }) {
  return (
    <div className='absolute inset-0 flex items-center justify-center p-8 text-center text-white/80'>
      {error ?? '재생할 트레일러를 찾을 수 없습니다.'}
    </div>
  )
}

function TrailerModal({
  isOpen,
  onClose,
  contentId,
  contentTitle,
  mediaType,
}: TrailerModalProps) {
  const { trailer, isLoading, error } = useGetVideo(
    isOpen ? String(contentId) : '',
    mediaType,
  )

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const youtubeEmbedUrl = trailer
    ? buildYoutubeEmbedUrl(trailer.key, 'modal')
    : null

  return (
    <Modal>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80'
        role='dialog'
        aria-modal='true'
        aria-labelledby='trailer-modal-title'
        onClick={onClose}
      >
        <div
          className='relative w-full max-w-5xl aspect-video rounded-xl bg-black overflow-hidden shadow-2xl'
          onClick={e => e.stopPropagation()}
        >
          <header className='absolute top-0 left-0 right-0 z-10 flex items-center justify-end gap-4 px-4 py-3 bg-gradient-to-b from-black/80 to-transparent'>
            <button
              type='button'
              className='shrink-0 w-9 h-9 rounded-full hover:bg-white/10 text-white text-xl leading-none'
              aria-label='닫기'
              onClick={onClose}
            >
              ×
            </button>
          </header>
          {isLoading ? (
            <LoadingComponent style='absolute inset-0 flex items-center justify-center bg-black text-white' />
          ) : youtubeEmbedUrl ? (
            <TrailerModalContent
              title={contentTitle}
              youtubeEmbedUrl={youtubeEmbedUrl}
            />
          ) : (
            <TrailerModalContentError error={error} />
          )}
        </div>
      </div>
    </Modal>
  )
}

export default TrailerModal
