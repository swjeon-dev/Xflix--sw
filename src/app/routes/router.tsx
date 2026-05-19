import { createBrowserRouter } from 'react-router'
import ErrorPage from '@/pages/error-page'
import { rootLoader } from '@/app/routes/rootLoader'
import Home from '@/pages/home'
import GenreMovies from '@/pages/genre-movies'
import MovieDetail from '@/pages/movie-detail'
import RootLayout from '@/shared/components/layout/RootLayout'
import { LoadingScreen } from '@/shared/components/ui/LoadingScreen'
import { routes } from '@/shared/constants/routes'
import { removeRootPath } from '@/shared/utils'

export const router = createBrowserRouter(
  [
    {
      path: routes.ROOT,
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      id: 'root',
      HydrateFallback: () => <LoadingScreen />,
      children: [
        { index: true, element: <Home /> },
        {
          path: removeRootPath(routes.MOVIE.LIST),
          children: [
            { index: true, element: <GenreMovies /> },
            {
              path: removeRootPath(routes.MOVIE.PARAMETER),
              element: <MovieDetail />,
            },
          ],
        },
      ],
    },
  ],
  { basename: '/Xflix--sw' },
)
