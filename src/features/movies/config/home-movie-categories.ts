import { API_ENDPOINT } from '@/shared/config/api'

export const HOME_MOVIE_CATEGORIES = [
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
