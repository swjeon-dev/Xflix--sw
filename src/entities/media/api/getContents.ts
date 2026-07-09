import {
  tmdbFetch,
  type IApiReturn,
  type ITmdbContents,
  type QueryParams,
} from '@/shared'

import type { Media } from '../model/media.type'

const getContents = async <T extends Media>(
  endPoint: string,
  queryParams?: QueryParams,
): Promise<IApiReturn<ITmdbContents<T>>> => {
  return tmdbFetch<ITmdbContents<T>>(endPoint, queryParams)
}

export { getContents }
