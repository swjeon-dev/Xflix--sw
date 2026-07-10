import type { Media } from '@/entities/media'
import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'

import type { ISearchData, SearchMediaType } from '../model'

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

export { toSearchListItem }
