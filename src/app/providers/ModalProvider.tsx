import { useState } from 'react'

import {
  ModalContext,
  type ModalContextProps,
  type ModalStateBase,
} from '@/shared'
import type { ModalState } from '../model'

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalState | null>(null)

  const openModal = (modal: ModalStateBase) => {
    setCurrentModal(modal as ModalState)
  }

  const closeModal = () => {
    setCurrentModal(null)
  }

  const value: ModalContextProps = {
    currentModal,
    openModal,
    closeModal,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalProvider
