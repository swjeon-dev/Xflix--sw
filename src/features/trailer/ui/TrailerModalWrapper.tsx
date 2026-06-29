import { Modal } from '@/shared'

interface TrailerModalWrapperProps {
  children: React.ReactNode
  onClose: () => void
}

function TrailerModalWrapper({ children, onClose }: TrailerModalWrapperProps) {
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
          className='relative w-full max-w-5xl aspect-video rounded-xl bg-black overflow-hidden shadow-2xl'
          onClick={e => e.stopPropagation()}
        >
          <header className='absolute top-0 left-0 right-0 z-10 flex items-center justify-end gap-4 px-4 py-3 bg-gradient-to-b from-black/80 to-transparent'>
            <button
              type='button'
              className='shrink-0 w-9 h-9 rounded-full hover:bg-white/10 text-white text-xl'
              aria-label='modal close button'
              onClick={onClose}
            >
              ×
            </button>
          </header>
          {children}
        </div>
      </div>
    </Modal>
  )
}

export default TrailerModalWrapper
