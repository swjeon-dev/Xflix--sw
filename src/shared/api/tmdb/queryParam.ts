const BASE_PARAMS = {
  include_adult: 'false',
  include_video: 'false',
  sort_by: 'popularity.desc',
} as const

function getSearchParams(genreId: number) {
  return {
    ...BASE_PARAMS,
    with_genres: String(genreId),
  }
}

function getAllSearchParams() {
  return { ...BASE_PARAMS }
}

export { getSearchParams, getAllSearchParams }
