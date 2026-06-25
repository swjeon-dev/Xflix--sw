type PossibleLang = 'ko'

interface IApiConfig {
  readonly BASE_URL: string
  readonly LANGUAGE: PossibleLang
  readonly OPTIONS: RequestInit
}

export const API_CONFIG: IApiConfig = {
  BASE_URL: 'https://api.themoviedb.org/3',
  LANGUAGE: 'ko',
  OPTIONS: {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  },
} as const

export const API_ENDPOINT = {
  AUTH_VALID: '/authentication',
  TRENDING: '/trending/movie/week',

  GENRES_MOVIE: '/genre/movie/list',
  GENRES_TV: '/genre/tv/list',

  TV_FILTERED: '/discover/tv',
  // TV_UPCOMING: '/tv/upcoming',
  // TV_RECOMMEND: (id: string | number) => `/tv/${id}/recommendations`,
  TV_POPULAR: '/tv/popular',
  TV_TOP_RATED: '/tv/top_rated',
  TV_DETAIL: (id: string) => `/tv/${id}`,
  TV_SEASONS: (seriesId: string, seasonNumber: string) =>
    `/tv/${seriesId}/season/${seasonNumber}`,

  MOVIE_VIDEOS: (id: string) => `/movie/${id}/videos`,
  TV_VIDEOS: (seriesId: string) => `/tv/${seriesId}/videos`,

  MOVIE_FILTERED: '/discover/movie',
  MOVIE_UPCOMING: '/movie/upcoming',
  MOVIE_POPULAR: '/movie/popular',
  MOVIE_TOP_RATED: '/movie/top_rated',
  MOVIE_DETAIL: (id: string) => `/movie/${id}`,
  MOVIE_SIMILAR: (id: string) => `/movie/${id}/similar`,
  MOVIE_RECOMMEND: (id: string) => `/movie/${id}/recommendations`,

  SEARCH_MULTI: '/search/multi',
} as const

export type ApiPath = {
  [K in keyof typeof API_ENDPOINT]: (typeof API_ENDPOINT)[K] extends (
    arg: string,
  ) => infer R
    ? R
    : (typeof API_ENDPOINT)[K]
}[keyof typeof API_ENDPOINT]
