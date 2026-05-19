import type { IGenre } from '@/entities/movie/model'

export const ALL_GENRE_TAB = { id: 0, name: '전체' } as const

export type IGenreTab = IGenre | typeof ALL_GENRE_TAB

export function buildDisplayGenres(genres: IGenre[]) {
  return {
    tabs: [ALL_GENRE_TAB, ...genres] as IGenreTab[],
    lists: genres,
  }
}

export type IDisplayGenres = ReturnType<typeof buildDisplayGenres>
