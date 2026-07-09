import { getAllDiscoverParams, getDiscoverParams, type IGenre } from '@/shared'

function getDiscoverListParams(selected: number) {
  return selected === 0 ? getAllDiscoverParams() : getDiscoverParams(selected)
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
