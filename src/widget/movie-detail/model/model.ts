import type { IMovie } from '@/entities/movie'
import { getActorsWithComma, getGenresWithComma } from '@/shared'

export function getCrewByJob(movie: IMovie, job: string) {
  if (!movie.credits) return null

  return movie.credits.crew.find(person => person.job === job)?.name ?? null
}

export function runtimeToHours(runtime: number) {
  if (runtime === 0) return '0시간 0분'
  if (runtime < 60) return `${runtime}분`
  return `${Math.floor(runtime / 60)}시간 ${runtime % 60}분`
}

export function getMovieMoreInfo(movie: IMovie) {
  return {
    actors: getActorsWithComma(movie),
    genres: getGenresWithComma(movie),
    director: getCrewByJob(movie, 'Director'),
    runtime: runtimeToHours(movie.runtime ?? 0),
  }
}

export type IMovieMoreInfo = ReturnType<typeof getMovieMoreInfo>
