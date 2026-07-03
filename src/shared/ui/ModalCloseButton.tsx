import { cn } from '@/shared/lib'

import { MODAL_CLOSE_BUTTON_CLASS } from './modal.styles'

interface ModalCloseButtonProps {
  onClose: () => void
  label?: string
  className?: string
}

function ModalCloseButton({
  onClose,
  label = '닫기',
  className,
}: ModalCloseButtonProps) {
  return (
    <button
      type='button'
      className={cn(MODAL_CLOSE_BUTTON_CLASS, className)}
      aria-label={label}
      onClick={onClose}
    >
      ×
    </button>
  )
}

export default ModalCloseButton
