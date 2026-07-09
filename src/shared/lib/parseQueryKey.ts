import type { QueryParams } from '@/shared'

function parseQueryKey(queryKey: string): QueryParams | undefined {
  return queryKey ? (JSON.parse(queryKey) as QueryParams) : undefined
}

export { parseQueryKey }
