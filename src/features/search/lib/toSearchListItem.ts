import { type SearchMediaType } from '@/shared'
import { isMovie, type IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'
import type { IPersonCreditItem, IPersonCredits, ISearchData } from '../model'

function toSearchListItem(item: IMovie | ITV): ISearchData {
  if (isMovie(item)) {
    return {
      id: item.id,
      adult: item.adult,
      poster_path: item.poster_path ?? undefined,
      title: item.title,
      original_title: item.original_title,
      release_date: item.release_date,
      popularity: item.popularity,
      media_type: 'movie',
    }
  }

  return {
    id: item.id,
    adult: item.adult ?? false,
    poster_path: item.poster_path ?? undefined,
    name: item.name,
    original_name: item.original_name,
    first_air_date: item.first_air_date,
    popularity: item.popularity,
    media_type: 'tv',
  }
}

function creditToSearchListItem(
  credit: IPersonCreditItem,
  type: SearchMediaType,
): ISearchData {
  if (type === 'movie') {
    return {
      id: credit.id,
      adult: credit.adult ?? false,
      poster_path: credit.poster_path ?? undefined,
      title: credit.title,
      original_title: credit.original_title,
      release_date: credit.release_date,
      popularity: credit.popularity,
      media_type: 'movie',
    }
  }

  return {
    id: credit.id,
    adult: credit.adult ?? false,
    poster_path: credit.poster_path ?? undefined,
    name: credit.name,
    original_name: credit.original_name,
    first_air_date: credit.first_air_date,
    popularity: credit.popularity,
    media_type: 'tv',
  }
}

function personCreditsToSearchItems(
  data: IPersonCredits,
  filter: 'cast' | 'crew',
  type: SearchMediaType,
): ISearchData[] {
  const source = filter === 'cast' ? data.cast : data.crew
  const seen = new Set<number>()
  const items: ISearchData[] = []

  for (const credit of source) {
    if (seen.has(credit.id) || credit.adult) continue
    seen.add(credit.id)
    items.push(creditToSearchListItem(credit, type))
  }

  return items.sort((a, b) => b.popularity - a.popularity)
}

export { toSearchListItem, personCreditsToSearchItems }
