import type { IMovie } from '../model'

function isMovie<U>(item: IMovie | U): item is IMovie {
  return typeof item === 'object' && item !== null && 'title' in item
}

export { isMovie }
