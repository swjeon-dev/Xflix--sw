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
  SEARCH: {
    LIST: '/search',
    QUERY_KEY: 'query',
    DETAIL: (query: string) => {
      const params = new URLSearchParams({
        query: query.trim(),
      })
      return `/search?${params.toString()}`
    },
  },
} as const
