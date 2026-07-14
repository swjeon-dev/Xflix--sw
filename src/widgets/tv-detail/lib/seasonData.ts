import type { ISeason, ISeasonMeta } from '@/entities/tv'

export const buildSeasonData = (
  season: ISeason | null,
  seasonMeta?: ISeasonMeta,
) => {
  const seasonName = season?.name ?? seasonMeta?.name
  const posterPath = season?.poster_path ?? seasonMeta?.poster_path ?? null
  const airDate = season?.air_date ?? seasonMeta?.air_date ?? ''
  const episodeCount = season?.episodes.length ?? 0

  return { seasonName, posterPath, airDate, episodeCount }
}
