import SearchForm from './ui/SearchForm'
import SearchModalWrapper from './ui/SearchModalWrapper'

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
