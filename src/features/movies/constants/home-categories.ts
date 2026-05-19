import { API_ENDPOINT } from '../api/config'

export const HOME_CATEGORIES = [
  {
    id: 2,
    title: '개봉 예정인 영화',
    endPoint: API_ENDPOINT.MOVIE_UPCOMING,
  },
  {
    id: 3,
    title: '인기 영화',
    endPoint: API_ENDPOINT.MOVIE_POPULAR,
  },
  {
    id: 4,
    title: '평점이 높은 영화',
    endPoint: API_ENDPOINT.MOVIE_TOP_RATED,
  },
] as const
