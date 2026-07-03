interface ModalStateBase {
  type: string
  props?: unknown
  className?: string
}

interface ModalContextProps {
  currentModal: ModalStateBase | null
  openModal: (modal: ModalStateBase) => void
  closeModal: () => void
}

export type { ModalStateBase, ModalContextProps }
