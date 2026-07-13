// genre filter params
type DiscoverMedia = 'movie' | 'tv'
type TVSortBy = 'first_air_date.desc' | 'popularity.desc' | 'vote_average.desc'
type MovieSortBy =
  | 'popularity.desc'
  | 'primary_release_date.desc'
  | 'vote_average.desc'

type SortBy = MovieSortBy | TVSortBy

function buildDiscoverBase(media: DiscoverMedia, sortBy: SortBy) {
  const today = new Date().toISOString().split('T')[0]
  const minVoteCount = 500

  return {
    include_adult: 'false',
    include_video: 'false',
    ...(media === 'movie'
      ? { 'primary_release_date.lte': today }
      : { 'first_air_date.lte': today }),
    ...(sortBy === 'vote_average.desc' && { 'vote_count.gte': minVoteCount }),
    sort_by: sortBy,
  }
}

function getDiscoverParams(
  genreId: number,
  sortBy: SortBy = 'popularity.desc',
  media: DiscoverMedia = 'movie',
) {
  return {
    ...buildDiscoverBase(media, sortBy),
    with_genres: String(genreId),
  }
}

function getAllDiscoverParams(sortBy: SortBy, media: DiscoverMedia = 'movie') {
  return buildDiscoverBase(media, sortBy)
}

export { getDiscoverParams, getAllDiscoverParams }
export type { SortBy, DiscoverMedia }
