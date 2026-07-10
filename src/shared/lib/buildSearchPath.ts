type SearchRouteParams = Record<string, string | number | boolean>

function buildSearchPath(params: SearchRouteParams) {
  const searchParams = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)]),
    ),
  )

  const query = searchParams.toString()
  return query ? `/search?${query}` : '/search'
}

export { buildSearchPath }
