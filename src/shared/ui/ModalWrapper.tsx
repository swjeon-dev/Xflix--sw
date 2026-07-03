import { cn } from '@/shared/lib'

import { MODAL_PANEL_CLASS } from './modal.styles'

interface ModalWrapperProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

/** DialogWrapper 안쪽 패널 — 레이아웃·헤더는 feature wrapper에서 구성 */
function ModalWrapper({
  children,
  className,
  'aria-label': ariaLabel,
}: ModalWrapperProps) {
  return (
    <div
      className={cn(MODAL_PANEL_CLASS, className)}
      onClick={e => e.stopPropagation()}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}

export default ModalWrapper
