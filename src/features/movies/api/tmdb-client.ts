import { API_CONFIG } from './config'
import type { IApiReturn } from '../types'
import { devLog } from '@/shared/utils'

type QueryParams = Record<string, string | number | boolean>

function buildUrl(endpoint: string, query?: QueryParams): string {
  const { BASE_URL, LANGUAGE } = API_CONFIG
  const params = new URLSearchParams({ language: LANGUAGE })

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      params.set(key, String(value))
    }
  }

  return `${BASE_URL}${endpoint}?${params.toString()}`
}

export async function tmdbFetch<T>(
  endpoint: string,
  query?: QueryParams,
  errorMessage = '요청에 실패했습니다.',
): Promise<IApiReturn<T>> {
  try {
    const response = await fetch(buildUrl(endpoint, query), API_CONFIG.OPTIONS)

    if (!response.ok) {
      throw new Error(errorMessage)
    }

    const data: T = await response.json()
    return { data, error: null }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown Error'
    devLog({ message: `tmdbFetch(${endpoint}): ${message}`, type: 'error' })
    return { data: null, error: message }
  }
}
