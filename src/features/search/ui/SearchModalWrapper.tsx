import { ModalWrapper } from '@/shared'

interface SearchModalWrapperProps {
  children: React.ReactNode
}

function SearchModalWrapper({ children }: SearchModalWrapperProps) {
  return (
    <ModalWrapper className='w-full max-w-3xl'>{children}</ModalWrapper>
  )
}

export default SearchModalWrapper
