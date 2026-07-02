import { MediaVideoType } from '@/shared'
import { useModal } from '@/entities/modal'
import TrailerModalWrapper from './ui/TrailerModalWrapper'
import TrailerModalContents from './ui/TrailerModalContents'

interface TrailerModalContentsProps {
  contentId: number | string
  contentTitle: string
  mediaType: MediaVideoType
}

export default function TrailerModal(props: TrailerModalContentsProps) {
  const { closeModal } = useModal()

  return (
    <TrailerModalWrapper onClose={closeModal}>
      <TrailerModalContents {...props} />
    </TrailerModalWrapper>
  )
}
