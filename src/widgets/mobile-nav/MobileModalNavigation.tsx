import MobileNavigationModalWrapper from './MobileNavigationModalWrapper'
import MobileNavigationModalContents from './MobileNavigationModalContents'

interface MobileModalNavigationProps {
  onClose: () => void
}

function MobileModalNavigation({ onClose }: MobileModalNavigationProps) {
  return (
    <MobileNavigationModalWrapper onClose={onClose}>
      <MobileNavigationModalContents onClose={onClose} />
    </MobileNavigationModalWrapper>
  )
}

export default MobileModalNavigation
