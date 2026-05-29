import { Outlet, ScrollRestoration } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { Header, Footer } from '@/shared/ui'

function RootLayout() {
  return (
    <>
      <Helmet titleTemplate='%s | XFlix' defaultTitle='...' />
      <div className='min-h-screen bg-black'>
        <Header />
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
