import { redirect, type LoaderFunctionArgs } from 'react-router'

import { routes } from '@/shared/config/routes'

export function searchListLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const rawWord = url.searchParams.get(routes.SEARCH.TERM_KEY)?.trim()
  const rawMediaType = url.searchParams
    .get(routes.SEARCH.MEDIA_TYPE_KEY)
    ?.trim()

  if (!rawWord) {
    throw redirect(routes.ROOT)
  }

  return { query: rawWord, type: rawMediaType }
}
