const discoverBaseParams = {
  include_adult: 'false',
  include_video: 'false',
  sort_by: 'popularity.desc',
} as const

export function getDiscoverSearchParams(genreId: number) {
  return {
    ...discoverBaseParams,
    with_genres: String(genreId),
  }
}

export function getAllDiscoverSearchParams() {
  return { ...discoverBaseParams }
}
