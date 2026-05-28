import { createBrowserRouter } from 'react-router'
import ErrorPage from '@/pages/error-page'
import { rootLoader } from '@/app/routes/rootLoader'
import Home from '@/pages/home'

import ContentList from '@/pages/content-list'
import SearchListView from '@/pages/search-list'
import { searchListLoader } from '@/app/routes/searchListLoader'
import {
  ROOT_LOADER_ID,
  RootLayout,
  LoadingScreen,
  routes,
  removeRootPath,
} from '@/shared'

import Detail from '@/pages/detail'

export const router = createBrowserRouter(
  [
    {
      path: routes.ROOT,
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      id: ROOT_LOADER_ID,
      HydrateFallback: () => <LoadingScreen />,
      children: [
        { index: true, element: <Home /> },
        {
          path: removeRootPath(routes.MOVIE.LIST),
          children: [
            { index: true, element: <ContentList type='movie' /> },
            {
              path: removeRootPath(routes.MOVIE.PARAMETER),
              element: <Detail type='movie' />,
            },
          ],
        },
        {
          path: removeRootPath(routes.TV.LIST),
          children: [
            { index: true, element: <ContentList type='tv' /> },
            {
              path: removeRootPath(routes.TV.PARAMETER),
              element: <Detail type='tv' />,
            },
          ],
        },
        {
          path: removeRootPath(routes.SEARCH.LIST),
          element: <SearchListView />,
          loader: searchListLoader,
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/Xflix--sw' },
)
