// genre filter params
type TVSortBy = 'first_air_date.desc' | 'popularity.desc' | 'vote_average.desc'
type MovieSortBy =
  | 'popularity.desc'
  | 'primary_release_date.desc'
  | 'vote_average.desc'

type SortBy = MovieSortBy | TVSortBy

const BASE_PARAMS = {
  include_adult: 'false',
  include_video: 'false',
  sort_by: 'popularity.desc',
} as const

function getDiscoverParams(
  genreId: number,
  sortBy: SortBy = 'popularity.desc',
) {
  return {
    ...BASE_PARAMS,
    with_genres: String(genreId),
    sort_by: sortBy,
  }
}

function getAllDiscoverParams(sortBy: SortBy) {
  return { ...BASE_PARAMS, sort_by: sortBy }
}

export { getDiscoverParams, getAllDiscoverParams }
export type { SortBy }
