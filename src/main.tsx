import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import AppRouter from './app/AppRouter'
import ModalProvider from './app/providers/ModalProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ModalProvider>
        <AppRouter />
      </ModalProvider>
    </HelmetProvider>
  </StrictMode>,
)
