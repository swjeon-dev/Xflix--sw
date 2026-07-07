import { Outlet, ScrollRestoration } from 'react-router'
import { Helmet } from 'react-helmet-async'

import { AppHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { GlobalModalContainer, GenreProvider } from '../providers'

function RootLayout() {
  return (
    <>
      <Helmet titleTemplate='%s | XFlix' defaultTitle='...' />
      <GenreProvider>
        <div className='min-h-screen bg-black'>
          <AppHeader />
          <main>
            <Outlet />
          </main>
          <Footer />
          <ScrollRestoration />
        </div>
        <GlobalModalContainer />
      </GenreProvider>
    </>
  )
}

export default RootLayout
