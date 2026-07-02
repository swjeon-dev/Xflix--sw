interface TrailerModalWrapperProps {
  children: React.ReactNode
  onClose: () => void
}

function TrailerModalWrapper({ children, onClose }: TrailerModalWrapperProps) {
  return (
    <div
      className='w-full max-w-5xl rounded-xl bg-black overflow-hidden shadow-2xl'
      onClick={e => e.stopPropagation()}
    >
      <header className='flex items-center justify-end gap-4 px-4 py-3 shrink-0'>
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
  )
}

export default TrailerModalWrapper
