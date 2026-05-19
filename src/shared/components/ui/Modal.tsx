import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
}

const Modal = ({ children }: PortalProps) => {
  const element = document.getElementById('modal-root')

  if (!element) {
    console.error('modal-root 엘리먼트를 찾을 수 없습니다.')
    return null
  }

  return createPortal(children, element)
}

export default Modal
