import type { IApiReturn, BaseMedia, ICredits, IGenre } from '@/shared'

export interface IMovie extends BaseMedia {
  adult: boolean
  title: string
  original_title: string
  release_date: string
  video: boolean
  tagline?: string
  runtime?: number
  genres?: IGenre[]
  credits?: ICredits
}

export interface IFeaturedMovie {
  id: number
  title: string
  backdropUrl: string
  overview: string
  date: string
  detailUrl: string
}

export type IMovieApiReturn = IApiReturn<IMovie>
