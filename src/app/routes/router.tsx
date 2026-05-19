import { createBrowserRouter } from 'react-router'
import ErrorPage from '@/pages/error-page'
import { rootLoader } from '@/app/routes/rootLoader'
import Home from '@/pages/Home'
import GenreMovies from '@/pages/genre-movies'
import MovieDetail from '@/pages/movie-detail'
import RootLayout from '@/shared/ui/layout/RootLayout'
import { LoadingScreen } from '@/shared/ui/LoadingScreen'
import { routes } from '@/shared/config/routes'
import { removeRootPath } from '@/shared/lib'

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
