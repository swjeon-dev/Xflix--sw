import { Modal } from '@/shared'

interface TrailerModalWrapperProps {
  children: React.ReactNode
  contentTitle: string
  onClose: () => void
}

function TrailerModalWrapper({
  children,
  contentTitle,
  onClose,
}: TrailerModalWrapperProps) {
  return (
    <Modal>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80'
        role='dialog'
        aria-modal='true'
        aria-labelledby='trailer-modal-title'
        onClick={onClose}
      >
        <div
          className='w-full max-w-5xl rounded-xl bg-black overflow-hidden shadow-2xl'
          onClick={e => e.stopPropagation()}
        >
          <header className='flex items-center justify-between gap-4 px-4 py-3 shrink-0'>
            <h2 id='trailer-modal-title' className='text-lg font-semibold text-white truncate'>
              {contentTitle}
            </h2>
            <button
              type='button'
              className='shrink-0 w-9 h-9 rounded-full hover:bg-white/10 text-white text-xl leading-none'
              aria-label='닫기'
              onClick={onClose}
            >
              ×
            </button>
          </header>
          <div className='relative w-full aspect-video'>{children}</div>
        </div>
      </div>
    </Modal>
  )
}

export default TrailerModalWrapper
