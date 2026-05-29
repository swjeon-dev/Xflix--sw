import type { Media } from '../types'
import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'

export function isMovie(content: Media): content is IMovie {
  return 'title' in content
}

export function isTV(content: Media): content is ITV {
  return 'name' in content
}
