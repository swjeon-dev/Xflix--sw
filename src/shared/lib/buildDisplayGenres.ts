import type { IGenre } from '@/shared/types'

const ALL_GENRE_TAB = { id: 0, name: '전체' } as const

type IGenreTab = IGenre | typeof ALL_GENRE_TAB

function buildDisplayGenres(genres: IGenre[]) {
  return {
    tabs: [ALL_GENRE_TAB, ...genres] as IGenreTab[],
    lists: genres,
  }
}

type IDisplayGenres = ReturnType<typeof buildDisplayGenres>

export {
  ALL_GENRE_TAB,
  type IGenreTab,
  type IDisplayGenres,
  buildDisplayGenres,
}
