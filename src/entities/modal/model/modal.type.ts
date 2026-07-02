// 모달 상태 타입
interface ModalState {
  type: string
  props?: any
  className?: string
}

// 모달 context 타입
interface ModalContextProps {
  currentModal: ModalState | null
  openModal: (modal: ModalState) => void
  closeModal: () => void
}

export type { ModalState, ModalContextProps }
