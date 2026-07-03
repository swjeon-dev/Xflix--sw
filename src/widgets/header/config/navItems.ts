import { routes } from '@/shared/config/routes'

const NAV_ITEMS = [
  { id: 1, label: '홈', path: routes.ROOT },
  { id: 3, label: '영화', path: routes.MOVIE.LIST },
  { id: 4, label: 'TV', path: routes.TV.LIST },
] as const

type NavItem = (typeof NAV_ITEMS)[number]

export { NAV_ITEMS, type NavItem }
