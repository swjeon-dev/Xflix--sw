import type { ITV } from '@/entities/tv'

function getDirector(tv: ITV) {
  if (!tv.credits) return null

  return tv.created_by.length > 0 ? tv.created_by[0].name : null
}

function getActors(tv: ITV) {
  if (!tv.credits?.cast.length) return []

  return tv.credits.cast.slice(0, 5).map(actor => actor.name)
}

function getGenres(tv: ITV) {
  if (!tv.genres?.length) return []

  return tv.genres.map(genre => genre.name)
}

function getTVMoreInfo(tv: ITV) {
  return {
    actors: getActors(tv),
    genres: getGenres(tv),
    director: getDirector(tv),
  }
}

type ITVMoreInfo = ReturnType<typeof getTVMoreInfo>

export { getTVMoreInfo, type ITVMoreInfo }
