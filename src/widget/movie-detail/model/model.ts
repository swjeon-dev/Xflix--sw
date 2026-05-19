import { IMovie } from '@/entities/movie/model'

export function getCrewByJob(movie: IMovie, job: string) {
  if (!movie.credits) return null

  return movie.credits.crew.find(person => person.job === job)?.name ?? null
}

export function runtimeToHours(runtime: number) {
  if (runtime === 0) return '0시간 0분'
  if (runtime < 60) return `${runtime}분`
  return `${Math.floor(runtime / 60)}시간 ${runtime % 60}분`
}

export function getActorsWithComma(movie: IMovie) {
  if (!movie.credits?.cast.length) return null

  return movie.credits.cast
    .slice(0, 5)
    .map(actor => actor.name)
    .join(', ')
}

export function getGenresWithComma(movie: IMovie) {
  if (!movie.genres?.length) return null

  return movie.genres.map(genre => genre.name).join(', ')
}

export function getMovieMoreInfo(movie: IMovie) {
  return {
    actors: getActorsWithComma(movie),
    genres: getGenresWithComma(movie),
    director: getCrewByJob(movie, 'Director'),
    runtime: runtimeToHours(movie.runtime),
  }
}

export type IMovieMoreInfo = ReturnType<typeof getMovieMoreInfo>
