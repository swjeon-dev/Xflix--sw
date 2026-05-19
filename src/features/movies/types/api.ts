import type { IMovie } from './movie'

export interface IDates {
  maximum: string
  minimum: string
}

export interface ITmdbContents {
  date?: IDates
  page: number
  results: IMovie[]
  total_pages: number
  total_results: number
}

export interface IApiReturn<T> {
  data: T | null
  error: string | null
}
