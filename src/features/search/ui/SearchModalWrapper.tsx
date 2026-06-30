import { useEffect } from 'react'

import { Modal, useBodyScrollLock } from '@/shared'

interface SearchModalWrapperProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function SearchModalWrapper({
  isOpen,
  onClose,
  children,
}: SearchModalWrapperProps) {
  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Modal>
      <div
        className='fixed inset-0 z-50 flex items-start justify-center bg-black/90 p-4 pt-[20vh] md:p-8'
        role='dialog'
        aria-modal='true'
        aria-labelledby='search-modal-title'
        onClick={onClose}
      >
        {children}
      </div>
    </Modal>
  )
}

export default SearchModalWrapper
