import { getAllDiscoverParams, getDiscoverParams, type IGenre } from '@/shared'
import type { SortBy } from '@/shared'

function getDiscoverListParams(
  selected: number,
  sortBy: SortBy = 'popularity.desc',
) {
  return selected === 0
    ? getAllDiscoverParams(sortBy)
    : getDiscoverParams(selected, sortBy)
}

function getDiscoverListTitle(
  selected: number,
  genres: IGenre[],
  allTitle: string,
  fallbackTitle: string,
) {
  if (selected === 0) return allTitle

  return genres.find(genre => genre.id === selected)?.name ?? fallbackTitle
}

export { getDiscoverListParams, getDiscoverListTitle }
