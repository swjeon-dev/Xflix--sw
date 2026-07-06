import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { TrailerModal } from '@/features/trailer'
import { SearchModal } from '@/features/search'
import { EpisodesModal } from '@/features/episodes'
import { MobileModalNavigation } from '@/widgets/mobile-nav'
import { DialogWrapper, useModal, cn } from '@/shared'
import type { ModalType } from '../model'

const MODAL_DIALOG_CLASS: Record<ModalType, string> = {
  trailer: '',
  search: 'items-start bg-black/90 pt-[20vh]',
  mobileNavigation: 'backdrop:bg-black/100 text-white p-0 md:p-0',
  episodes: '',
}

const MODAL_COMPONENTS: Record<ModalType, React.ComponentType<any>> = {
  trailer: TrailerModal,
  search: SearchModal,
  mobileNavigation: MobileModalNavigation,
  episodes: EpisodesModal,
}

export default function GlobalModalContainer() {
  const { currentModal, closeModal } = useModal()
  const location = useLocation()
  const prevLocation = useRef(location.pathname)

  useEffect(() => {
    const currentLocation = location.pathname

    if (prevLocation.current === currentLocation) return

    prevLocation.current = currentLocation
    closeModal()
  }, [location.pathname])

  if (!currentModal) return null

  const { type, props, className } = currentModal
  const ModalComponent = MODAL_COMPONENTS[type as ModalType]

  if (!ModalComponent) throw new Error(`Modal component for ${type} not found`)

  return (
    <DialogWrapper
      isOpen={Boolean(currentModal)}
      onClose={closeModal}
      className={cn(MODAL_DIALOG_CLASS[type as ModalType], className)}
    >
      <ModalComponent {...(props as object)} onClose={closeModal} />
    </DialogWrapper>
  )
}
