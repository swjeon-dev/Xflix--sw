import { createContext } from 'react'

import type { ModalContextProps } from './modal.type'

// context 생성
const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export default ModalContext
