import { RouterProvider } from 'react-router'
import { router } from '@/app/routes/router'

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter
