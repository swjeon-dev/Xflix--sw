import { API_ENDPOINT } from '@/shared/config/api'

export const MOVIE_CATEGORIES = [
  {
    title: '개봉 예정인 영화',
    endPoint: API_ENDPOINT.MOVIE_UPCOMING,
  },
  {
    title: '인기 영화',
    endPoint: API_ENDPOINT.MOVIE_POPULAR,
  },
  {
    title: '평점이 높은 영화',
    endPoint: API_ENDPOINT.MOVIE_TOP_RATED,
  },
] as const

export const TV_CATEGORIES = [
  {
    title: '평점이 높은 TV 프로그램',
    endPoint: API_ENDPOINT.TV_TOP_RATED,
  },
  {
    title: '인기 TV 프로그램',
    endPoint: API_ENDPOINT.TV_POPULAR,
  },
] as const
