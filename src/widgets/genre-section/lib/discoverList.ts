import {
  getAllDiscoverParams,
  getDiscoverParams,
  type DiscoverMedia,
  type IGenre,
  type SortBy,
} from '@/shared'

function getDiscoverListParams(
  selected: number,
  sortBy: SortBy = 'popularity.desc',
  media: DiscoverMedia = 'movie',
) {
  return selected === 0
    ? getAllDiscoverParams(sortBy, media)
    : getDiscoverParams(selected, sortBy, media)
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
