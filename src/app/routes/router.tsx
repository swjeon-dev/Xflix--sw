import { createBrowserRouter } from 'react-router'
import ErrorPage from '@/pages/Error'
import { rootLoader } from '@/app/routes/rootLoader'
import Home from '@/pages/Home'
import MovieDetail from '@/pages/MovieDetail'
import RootLayout from '@/shared/ui/layout/RootLayout'
import { LoadingScreen } from '@/shared/ui/LoadingScreen'
import { routes } from '@/shared/config/routes'
import { removeRootPath } from '@/shared/lib'
import TVDetail from '@/pages/TVDetail'
import Movie from '@/pages/Movie'
import TV from '@/pages/TV'
import Search from '@/pages/Search'
import { searchListLoader } from '@/app/routes/searchListLoader'

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
            { index: true, element: <Movie /> },
            {
              path: removeRootPath(routes.MOVIE.PARAMETER),
              element: <MovieDetail />,
            },
          ],
        },
        {
          path: removeRootPath(routes.TV.LIST),
          children: [
            { index: true, element: <TV /> },
            {
              path: removeRootPath(routes.TV.PARAMETER),
              element: <TVDetail />,
            },
          ],
        },
        {
          path: removeRootPath(routes.SEARCH.LIST),
          element: <Search />,
          loader: searchListLoader,
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/Xflix--sw' },
)
