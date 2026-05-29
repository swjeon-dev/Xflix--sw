import type { Media } from '@/entities/media'

export function getActorsWithComma(media: Media) {
  if (!media.credits?.cast.length) return null

  return media.credits.cast
    .slice(0, 5)
    .map(actor => actor.name)
    .join(', ')
}

export function getGenresWithComma(media: Media) {
  if (!media.genres?.length) return null

  return media.genres.map(genre => genre.name).join(', ')
}
