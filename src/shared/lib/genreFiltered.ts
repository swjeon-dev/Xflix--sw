import type { IGenre } from '@/shared'

function genreFiltered(ids: number[], genres: IGenre[]) {
  const myGenres =
    ids
      ?.map(id => genres.find(g => g.id === id))
      .filter((genre): genre is IGenre => !!genre) ?? []

  return myGenres.length > 2 ? myGenres.slice(0, 2) : myGenres
}

export { genreFiltered }
