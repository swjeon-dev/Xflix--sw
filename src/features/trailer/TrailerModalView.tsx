import { useEffect } from 'react'

import { useBodyScrollLock, MediaVideoType } from '@/shared'
import TrailerModalContents from './ui/TrailerModalContents'
import TrailerModalWrapper from './ui/TrailerModalWrapper'

interface TrailerModalViewProps {
  isOpen: boolean
  onClose: () => void
  contentId: number | string
  contentTitle: string
  mediaType: MediaVideoType
}

export default function TrailerModalView({
  isOpen,
  onClose,
  contentId,
  contentTitle,
  mediaType,
}: TrailerModalViewProps) {
  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <TrailerModalWrapper contentTitle={contentTitle} onClose={onClose}>
      <TrailerModalContents
        contentId={contentId}
        contentTitle={contentTitle}
        mediaType={mediaType}
      />
    </TrailerModalWrapper>
  )
}
