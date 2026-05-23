import { createBrowserRouter } from 'react-router'
import ErrorPage from '@/pages/error-page'
import { rootLoader } from '@/app/routes/rootLoader'
import Home from '@/pages/home'
import MovieDetail from '@/pages/movie-detail'
import RootLayout from '@/shared/ui/layout/RootLayout'
import { LoadingScreen } from '@/shared/ui/LoadingScreen'
import { routes } from '@/shared/config/routes'
import { removeRootPath } from '@/shared/lib'
import TVDetail from '@/pages/tv-detail'
import MovieListView from '@/pages/movie-list'
import TVListView from '@/pages/tv-list'

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
        {
          path: removeRootPath(routes.TV.LIST),
          children: [
            { index: true, element: <TVListView /> },
            {
              path: removeRootPath(routes.TV.PARAMETER),
              element: <TVDetail />,
            },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/Xflix--sw' },
)
