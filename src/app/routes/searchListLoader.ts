import { redirect, type LoaderFunctionArgs } from 'react-router'
import { routes } from '@/shared/config/routes-config'

export function searchListLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const rawQuery = url.searchParams.get(routes.SEARCH.QUERY_KEY)?.trim()

  if (!rawQuery) {
    throw redirect(routes.ROOT)
  }

  return { query: rawQuery }
}
