export const routes = {
  ROOT: '/',
  MOVIE: {
    PARAMETER: '/:id',
    LIST: '/movies',
    DETAIL: (id: string | number) => `/movies/${id}`,
  },
} as const
