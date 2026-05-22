import type { ITV } from '@/entities/tv'

export function getDirector(tv: ITV) {
  if (!tv.credits) return null

  return tv.created_by.length > 0 ? tv.created_by[0].name : null
}

export function runtimeToHours(runtime: number) {
  if (runtime === 0) return '0시간 0분'
  if (runtime < 60) return `${runtime}분`
  return `${Math.floor(runtime / 60)}시간 ${runtime % 60}분`
}

export function getActorsWithComma(tv: ITV) {
  if (!tv.credits?.cast.length) return null

  return tv.credits.cast
    .slice(0, 5)
    .map(actor => actor.name)
    .join(', ')
}

export function getGenresWithComma(tv: ITV) {
  if (!tv.genres?.length) return null

  return tv.genres.map(genre => genre.name).join(', ')
}

export function getTVMoreInfo(tv: ITV) {
  return {
    actors: getActorsWithComma(tv),
    genres: getGenresWithComma(tv),
    director: getDirector(tv),
    runtime: runtimeToHours(tv.runtime ?? 0),
  }
}

export type ITVMoreInfo = ReturnType<typeof getTVMoreInfo>
