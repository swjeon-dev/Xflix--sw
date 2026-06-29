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

  if (!isOpen) return null

  return (
    <TrailerModalWrapper onClose={onClose}>
      <TrailerModalContents
        contentId={contentId}
        contentTitle={contentTitle}
        mediaType={mediaType}
      />
    </TrailerModalWrapper>
  )
}
