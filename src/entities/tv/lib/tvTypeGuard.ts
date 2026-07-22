import type { ITV } from '../model'

function isTV<U>(item: ITV | U): item is ITV {
  return typeof item === 'object' && item !== null && 'name' in item
}
export { isTV }
