import { API_ENDPOINT, type ApiPath } from '@/shared/config/api-config'

export const HOME_TV_CATEGORIES = [
  {
    title: '평점이 높은 TV 프로그램',
    endPoint: API_ENDPOINT.TV_TOP_RATED as ApiPath,
  },
  {
    title: '인기 TV 프로그램',
    endPoint: API_ENDPOINT.TV_POPULAR as ApiPath,
  },
] as const
