import { ModalCloseButton, ModalWrapper } from '@/shared'

interface TrailerModalWrapperProps {
  children: React.ReactNode
  onClose: () => void
}

function TrailerModalWrapper({ children, onClose }: TrailerModalWrapperProps) {
  return (
    <ModalWrapper className='max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl'>
      <header className='flex shrink-0 items-center justify-end gap-4 px-4 py-3'>
        <ModalCloseButton onClose={onClose} />
      </header>
      <div className='relative aspect-video w-full'>{children}</div>
    </ModalWrapper>
  )
}

export default TrailerModalWrapper
