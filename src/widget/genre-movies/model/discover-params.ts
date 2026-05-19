export function getDiscoverSearchParams(genreId: number) {
  return {
    include_adult: 'false',
    include_video: 'false',
    sort_by: 'popularity.desc',
    with_genres: String(genreId),
  }
}
