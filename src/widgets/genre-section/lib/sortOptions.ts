import type { SortBy } from '@/shared'

type SortOption = 'latest' | 'popular' | 'rating'
type MediaLabel = '영화' | 'TV'

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: 'latest', label: '최신순' },
  { key: 'popular', label: '추천순' },
  { key: 'rating', label: '평점순' },
]

function toSortBy(option: SortOption, media: MediaLabel): SortBy {
  switch (option) {
    case 'latest':
      return media === '영화'
        ? 'primary_release_date.desc'
        : 'first_air_date.desc'
    case 'popular':
      return 'popularity.desc'
    case 'rating':
      return 'vote_average.desc'
  }
}

export { SORT_OPTIONS, toSortBy }
export type { SortOption }
