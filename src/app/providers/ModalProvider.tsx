import { useState } from 'react'

import { ModalContext, type ModalState } from '@/shared'

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalState | null>(null)
  const openModal = (modal: ModalState) => {
    setCurrentModal(modal)
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
