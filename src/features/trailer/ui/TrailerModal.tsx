import type { MediaVideoType } from '@/shared'
import TrailerModalWrapper from './TrailerModalWrapper'
import TrailerModalContents from './TrailerModalContents'

interface TrailerModalProps {
  contentId: number | string
  contentTitle: string
  mediaType: MediaVideoType
  onClose: () => void
}

export default function TrailerModal({
  onClose,
  contentId,
  contentTitle,
  mediaType,
}: TrailerModalProps) {
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
