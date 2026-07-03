import { useState } from 'react'

import { ModalContext, type ModalStateBase } from '@/shared'
import type { ModalState } from '@/app/model'

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalState | null>(null)
  const openModal = (modal: ModalStateBase) => {
    setCurrentModal(modal as ModalState)
  }
  const closeModal = () => {
    setCurrentModal(null)
  }

  return (
    <ModalContext.Provider value={{ currentModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
