const BASE_PARAMS = {
  include_adult: 'false',
  include_video: 'false',
  sort_by: 'popularity.desc',
} as const

function getDiscoverParams(genreId: number) {
  return {
    ...BASE_PARAMS,
    with_genres: String(genreId),
  }
}

function getAllDiscoverParams() {
  return { ...BASE_PARAMS }
}

export { getDiscoverParams, getAllDiscoverParams }
