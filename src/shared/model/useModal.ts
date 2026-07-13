import { useContext } from 'react'

import ModalContext from './ModalContext'
import type { ModalContextProps } from './modal.type'

// 커스텀 훅
function useModal() {
  const context = useContext<ModalContextProps | undefined>(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export default useModal
