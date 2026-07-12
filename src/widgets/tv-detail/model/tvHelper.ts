import type { ITV } from '@/entities/tv'
import type { ISearchFilterTag } from '@/shared'

function getDirector(tv: ITV): ISearchFilterTag | null {
  const creator = tv.created_by[0]
  if (!creator) return null

  return { id: creator.id, name: creator.name }
}

function getActors(tv: ITV): ISearchFilterTag[] {
  if (!tv.credits?.cast.length) return []

  return tv.credits.cast.slice(0, 5).map(actor => ({
    id: actor.id,
    name: actor.name,
  }))
}

function getGenres(tv: ITV): ISearchFilterTag[] {
  if (!tv.genres?.length) return []

  return tv.genres.map(genre => ({
    id: genre.id,
    name: genre.name,
  }))
}

function getAiringDate(first: string, last: string) {
  if (!first) return null
  if (!last || first === last) return first
  return `${first} ~ ${last}`
}

function getTVMoreInfo(tv: ITV) {
  return {
    actors: getActors(tv),
    genres: getGenres(tv),
    director: getDirector(tv),
    airingDate: getAiringDate(tv.first_air_date, tv.last_air_date),
  }
}

type ITVMoreInfo = ReturnType<typeof getTVMoreInfo>

export { getTVMoreInfo, type ITVMoreInfo }
