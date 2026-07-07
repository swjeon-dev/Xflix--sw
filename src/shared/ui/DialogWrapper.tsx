import { useEffect, useRef, ReactNode } from 'react'

import { cn } from '@/shared/lib'

interface DialogWrapperProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

const BASE_DIALOG_CLASS =
  'fixed inset-0 z-50 m-0 max-w-none max-h-none w-full h-full border-0 bg-transparent p-4 md:p-8 flex items-center justify-center shadow-none backdrop:bg-black/80'

function DialogWrapper({
  isOpen,
  onClose,
  children,
  className = '',
}: DialogWrapperProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      onCancel={e => {
        e.preventDefault()
        onClose()
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
      className={cn(BASE_DIALOG_CLASS, className)}
    >
      {children}
    </dialog>
  )
}

export default DialogWrapper
