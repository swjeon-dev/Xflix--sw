import type { IApiReturn } from '@/shared/types/api.types'
import type { BaseMedia, ITmdbContents } from '@/shared/types/contents.types'
import { tmdbFetch } from './client'

export const getTmdbContents = async <T extends BaseMedia>(
  endPoint: string,
  query?: Record<string, string | number | boolean>,
): Promise<IApiReturn<ITmdbContents<T>>> => {
  const result = await tmdbFetch<ITmdbContents<T>>(endPoint, { ...query })

  return {
    data: result.data ?? null,
    error: result.error,
  }
}
