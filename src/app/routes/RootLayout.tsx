import { Outlet, ScrollRestoration } from 'react-router'
import { Helmet } from 'react-helmet-async'

import { AppHeader } from '@/widget/header'
import { Footer } from '@/widget/footer'

function RootLayout() {
  return (
    <>
      <Helmet titleTemplate='%s | XFlix' defaultTitle='...' />
      <div className='min-h-screen bg-black'>
        <AppHeader />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
      </div>
    </>
  )
}

export default RootLayout
