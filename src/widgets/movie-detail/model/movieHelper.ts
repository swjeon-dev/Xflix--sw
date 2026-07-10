import type { IMovie } from '@/entities/movie'
import type { ISearchFilterTag } from '@/shared'

function getDirector(movie: IMovie): ISearchFilterTag | null {
  const director = movie.credits?.crew.find(person => person.job === 'Director')
  if (!director) return null

  return { id: director.id, name: director.name }
}

function runtimeToHours(runtime: number) {
  if (runtime === 0) return '0시간 0분'
  if (runtime < 60) return `${runtime}분`
  return `${Math.floor(runtime / 60)}시간 ${runtime % 60}분`
}

function getActors(movie: IMovie): ISearchFilterTag[] {
  if (!movie.credits?.cast.length) return []

  return movie.credits.cast.slice(0, 5).map(actor => ({
    id: actor.id,
    name: actor.name,
  }))
}

function getGenres(movie: IMovie): ISearchFilterTag[] {
  if (!movie.genres?.length) return []

  return movie.genres.map(genre => ({
    id: genre.id,
    name: genre.name,
  }))
}

function getMovieMoreInfo(movie: IMovie) {
  return {
    actors: getActors(movie),
    genres: getGenres(movie),
    director: getDirector(movie),
    runtime: runtimeToHours(movie.runtime ?? 0),
  }
}

type IMovieMoreInfo = ReturnType<typeof getMovieMoreInfo>

export { getMovieMoreInfo, type IMovieMoreInfo }
