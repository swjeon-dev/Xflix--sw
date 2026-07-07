import {
  MODAL_FOOTER_CLASS,
  MODAL_HEADER_CLASS,
  MODAL_HEADER_TITLE_CLASS,
  ModalCloseButton,
  ModalWrapper,
} from '@/shared'
import { cn } from '@/shared/lib'

interface EpisodeModalWrapperProps {
  title: string
  subtitle?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

function EpisodeModalWrapper({
  title,
  subtitle,
  onClose,
  children,
  footer,
}: EpisodeModalWrapperProps) {
  return (
    <ModalWrapper className='max-h-[85vh] max-w-3xl overflow-hidden rounded-xl bg-zinc-900 text-white shadow-2xl'>
      <header className={MODAL_HEADER_CLASS}>
        <h2 id='episodes-modal-title' className={MODAL_HEADER_TITLE_CLASS}>
          {title}
          {subtitle && (
            <span className='font-normal text-white/60'> · {subtitle}</span>
          )}
        </h2>
        <ModalCloseButton onClose={onClose} />
      </header>
      {children}
      {footer && (
        <footer className={cn(MODAL_FOOTER_CLASS, 'justify-between gap-2')}>
          {footer}
        </footer>
      )}
    </ModalWrapper>
  )
}

export default EpisodeModalWrapper
