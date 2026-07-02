import { RouterProvider } from 'react-router'
import { router } from '@/app/routes/router'
import GlobalModalContainer from './providers/GlobalModalContainer'

function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalModalContainer />
    </>
  )
}

export default AppRouter
