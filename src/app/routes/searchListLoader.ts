import { redirect, type LoaderFunctionArgs } from 'react-router'

import { routes } from '@/shared/config/routes'

export function searchListLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const term = url.searchParams.get('term')?.trim()
  const type = url.searchParams.get('type')?.trim()

  if (!term) {
    throw redirect(routes.ROOT)
  }

  return { term, type }
}
