import SearchModalWrapper from './SearchModalWrapper'
import SearchModalContents from './SearchModalContents'

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  return (
    <SearchModalWrapper>
      <SearchModalContents onClose={onClose} />
    </SearchModalWrapper>
  )
}
