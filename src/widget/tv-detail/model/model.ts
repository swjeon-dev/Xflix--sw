import type { ITV } from '@/entities/tv'
import { getActorsWithComma, getGenresWithComma } from '@/shared'

export function getDirector(tv: ITV) {
  if (!tv.credits) return null

  return tv.created_by.length > 0 ? tv.created_by[0].name : null
}

export function getTVMoreInfo(tv: ITV) {
  return {
    actors: getActorsWithComma(tv),
    genres: getGenresWithComma(tv),
    director: getDirector(tv),
  }
}

export type ITVMoreInfo = ReturnType<typeof getTVMoreInfo>
