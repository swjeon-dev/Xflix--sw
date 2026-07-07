import type { SearchMediaType } from '@/features/search'

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
    SEASON: (tvId: string | number, season: string | number) =>
      `/tv/${tvId}/season/${season}`,
  },
  SEARCH: {
    LIST: '/search',
    QUERY_KEY: 'word',
    MEDIA_TYPE_KEY: 'type',
    DETAIL: (searchWord: string, mediaType: SearchMediaType) => {
      const params = new URLSearchParams({
        word: searchWord.trim(),
        type: mediaType,
      })
      return `/search?${params.toString()}`
    },
  },
} as const
