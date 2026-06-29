import type { ITV } from '@/entities/tv'

function getDirector(tv: ITV) {
  if (!tv.credits) return null

  return tv.created_by.length > 0 ? tv.created_by[0].name : null
}

function getActorsWithComma(tv: ITV) {
  if (!tv.credits?.cast.length) return null

  return tv.credits.cast
    .slice(0, 5)
    .map(actor => actor.name)
    .join(', ')
}

function getGenresWithComma(tv: ITV) {
  if (!tv.genres?.length) return null

  return tv.genres.map(genre => genre.name).join(', ')
}

function getTVMoreInfo(tv: ITV) {
  return {
    actors: getActorsWithComma(tv),
    genres: getGenresWithComma(tv),
    director: getDirector(tv),
  }
}

type ITVMoreInfo = ReturnType<typeof getTVMoreInfo>

export {
  getDirector,
  getActorsWithComma,
  getGenresWithComma,
  getTVMoreInfo,
  type ITVMoreInfo,
}
