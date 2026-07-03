type ModalType = 'trailer' | 'search' | 'mobileNavigation' | 'episodes'

interface ModalState {
  type: ModalType
  props?: any
  className?: string
}

interface ModalContextProps {
  currentModal: ModalState | null
  openModal: (modal: ModalState) => void
  closeModal: () => void
}

export type { ModalState, ModalContextProps, ModalType }
