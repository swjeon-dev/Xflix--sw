import type { Media } from '@/entities/media'
import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'

import type { SearchMediaType } from '@/shared'
import type {
  IPersonCreditItem,
  IPersonCredits,
  ISearchData,
} from '../model'

function toSearchListItem(item: Media, type: SearchMediaType): ISearchData {
  if (type === 'movie') {
    const movie = item as IMovie

    return {
      id: movie.id,
      adult: movie.adult,
      poster_path: movie.poster_path ?? undefined,
      title: movie.title,
      original_title: movie.original_title,
      release_date: movie.release_date,
      popularity: movie.popularity,
      media_type: 'movie',
    }
  }

  const tv = item as ITV

  return {
    id: tv.id,
    adult: tv.adult ?? false,
    poster_path: tv.poster_path ?? undefined,
    name: tv.name,
    original_name: tv.original_name,
    first_air_date: tv.first_air_date,
    popularity: tv.popularity,
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
