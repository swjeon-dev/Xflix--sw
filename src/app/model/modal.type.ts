type ModalType = 'trailer' | 'search' | 'mobileNavigation' | 'episodes'

interface ModalState {
  type: ModalType
  props?: any
  className?: string
}

export type { ModalState, ModalType }
