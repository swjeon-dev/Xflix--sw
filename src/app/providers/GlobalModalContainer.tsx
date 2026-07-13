import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { TrailerModal } from '@/features/trailer'
import { SearchModal } from '@/features/search'
import { EpisodesModal } from '@/features/episodes'
import { MobileModalNavigation } from '@/widgets/mobile-nav'
import { DialogWrapper, useModal, cn } from '@/shared'
import type { ModalState, ModalType } from '../model'

const MODAL_DIALOG_CLASS: Record<ModalType, string> = {
  trailer: '',
  search: 'items-start bg-black/90 pt-[20vh]',
  mobileNavigation: 'backdrop:bg-black/100 text-white p-0 md:p-0',
  episodes: '',
}

function ModalBody({
  modal,
  onClose,
}: {
  modal: ModalState
  onClose: () => void
}) {
  switch (modal.type) {
    case 'trailer':
      return <TrailerModal {...modal.props} onClose={onClose} />
    case 'episodes':
      return <EpisodesModal {...modal.props} onClose={onClose} />
    case 'search':
      return <SearchModal onClose={onClose} />
    case 'mobileNavigation':
      return <MobileModalNavigation onClose={onClose} />
  }
}

export default function GlobalModalContainer() {
  const { currentModal, closeModal } = useModal()
  const location = useLocation()
  const prevLocation = useRef(location.pathname)
  const modal = currentModal as ModalState | null

  useEffect(() => {
    const currentLocation = location.pathname

    if (prevLocation.current === currentLocation) return

    prevLocation.current = currentLocation
    closeModal()
  }, [location.pathname, closeModal])

  if (!modal) return null

  return (
    <DialogWrapper
      isOpen
      onClose={closeModal}
      className={cn(MODAL_DIALOG_CLASS[modal.type], modal.className)}
    >
      <ModalBody modal={modal} onClose={closeModal} />
    </DialogWrapper>
  )
}
