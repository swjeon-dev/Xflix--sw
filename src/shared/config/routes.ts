export const routes = {
  ROOT: '/',
  MOVIE: {
    PARAMETER: '/:id',
    LIST: '/movies',
    DETAIL: (id: string | number) => `/movies/${id}`,
  },
  TV: {
    PARAMETER: '/:id',
    LIST: '/tv',
    DETAIL: (id: string | number) => `/tv/${id}`,
  },
} as const
