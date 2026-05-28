import type { Media } from '@/entities'
import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'

function isMovie(content: Media): content is IMovie {
  return 'title' in content
}

function isTV(content: Media): content is ITV {
  return 'name' in content
}

export { isMovie, isTV }
