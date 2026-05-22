export interface IGenre {
  id: number
  name: string
}

export interface ICreditsPerson {
  id: number
  name: string
  job?: string
  character?: string
}

export interface ICredits {
  cast: ICreditsPerson[]
  crew: ICreditsPerson[]
}

export interface BaseMedia {
  id: number
  overview: string
  popularity: number

  backdrop_path: string | null
  poster_path: string | null

  original_language: string

  genre_ids: number[]

  vote_average: number
  vote_count: number
}

export interface ITmdbContents<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
