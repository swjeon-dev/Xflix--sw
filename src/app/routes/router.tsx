import { createBrowserRouter } from 'react-router'
import ErrorPage from '@/pages/error-page'
import { rootLoader } from '@/app/routes/rootLoader'
import Home from '@/pages/home'
import MovieListView from '@/pages/movie-list-view'
import MovieDetail from '@/pages/movie-detail'
import RootLayout from '@/shared/ui/layout/RootLayout'
import { LoadingScreen } from '@/shared/ui/LoadingScreen'
import { routes } from '@/shared/config/routes'
import { removeRootPath } from '@/shared/lib'

export const LOADER_ID = 'root'

export const router = createBrowserRouter(
  [
    {
      path: routes.ROOT,
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      id: LOADER_ID,
      HydrateFallback: () => <LoadingScreen />,
      children: [
        { index: true, element: <Home /> },
        {
          path: removeRootPath(routes.MOVIE.LIST),
          children: [
            { index: true, element: <MovieListView /> },
            {
              path: removeRootPath(routes.MOVIE.PARAMETER),
              element: <MovieDetail />,
            },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/Xflix--sw' },
)
