import { DialogWrapper } from '@/shared/ui'
import { useModal } from '@/entities/modal'
import TrailerModal from '@/features/trailer/ui/TrailerModal'

const MODAL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  trailer: TrailerModal,
}

export default function GlobalModalContainer() {
  const { currentModal, closeModal } = useModal()

  if (!currentModal) return null

  const { type, props, className } = currentModal
  const ModalContent = MODAL_COMPONENTS[type]

  return (
    <DialogWrapper isOpen={true} onClose={closeModal} className={className}>
      {ModalContent && <ModalContent {...props} onClose={closeModal} />}
    </DialogWrapper>
  )
}
