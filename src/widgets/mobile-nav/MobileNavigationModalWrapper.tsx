import { ModalCloseButton, ModalWrapper } from '@/shared'

interface MobileNavigationModalWrapperProps {
  children: React.ReactNode
  onClose: () => void
}

function MobileNavigationModalWrapper({
  children,
  onClose,
}: MobileNavigationModalWrapperProps) {
  return (
    <ModalWrapper
      className='relative min-h-[60vh] justify-center font-medium'
      aria-label='모바일 메뉴'
    >
      <ModalCloseButton
        onClose={onClose}
        label='메뉴 닫기'
        className='absolute top-5 right-5'
      />
      {children}
    </ModalWrapper>
  )
}

export default MobileNavigationModalWrapper
