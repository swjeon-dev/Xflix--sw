import {
  tmdbFetch,
  type IApiReturn,
  type ITmdbContents,
  type QueryParams,
  type BaseMedia,
} from '@/shared'

const getContents = async <T extends BaseMedia>(
  endPoint: string,
  queryParams?: QueryParams,
): Promise<IApiReturn<ITmdbContents<T>>> => {
  return tmdbFetch<ITmdbContents<T>>(endPoint, queryParams)
}

export { getContents }
