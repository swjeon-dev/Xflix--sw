import { SearchForm, SearchModalWrapper } from './ui'

interface SearchModalViewProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModalView({
  isOpen,
  onClose,
}: SearchModalViewProps) {
  return (
    <SearchModalWrapper isOpen={isOpen} onClose={onClose}>
      <SearchForm onClose={onClose} />
    </SearchModalWrapper>
  )
}
