import { API_ENDPOINT, type ApiPath } from '@/shared/config/api-config'

export const HOME_MOVIE_CATEGORIES = [
  {
    title: '개봉 예정인 영화',
    endPoint: API_ENDPOINT.MOVIE_UPCOMING as ApiPath,
  },
  {
    title: '인기 영화',
    endPoint: API_ENDPOINT.MOVIE_POPULAR as ApiPath,
  },
  {
    title: '평점이 높은 영화',
    endPoint: API_ENDPOINT.MOVIE_TOP_RATED as ApiPath,
  },
] as const
