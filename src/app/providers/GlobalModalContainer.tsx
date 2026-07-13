import { lazy, Suspense, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { DialogWrapper, useModal, cn } from '@/shared'
import { MobileModalNavigation } from '@/widgets/mobile-nav'
import type { ModalState, ModalType } from '../model'

const TrailerModalLazy = lazy(
  () => import('@/features/trailer/ui/TrailerModal'),
)
const SearchModalLazy = lazy(() => import('@/features/search/ui/SearchModal'))
const EpisodesModalLazy = lazy(
  () => import('@/features/episodes/ui/EpisodesModal'),
)

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
      return <TrailerModalLazy {...modal.props} onClose={onClose} />
    case 'episodes':
      return <EpisodesModalLazy {...modal.props} onClose={onClose} />
    case 'search':
      return <SearchModalLazy onClose={onClose} />
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
      <Suspense fallback={null}>
        <ModalBody modal={modal} onClose={closeModal} />
      </Suspense>
    </DialogWrapper>
  )
}
