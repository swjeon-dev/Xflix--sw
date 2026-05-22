import type { IApiReturn } from '@/shared/types/api.types'
import type { BaseMedia, IGenre } from '@/shared/types/contents.types'

export interface ICreditsPerson {
  id: number
  name: string
  job?: string
  character?: string
}

export interface IMovieCredits {
  cast: ICreditsPerson[]
  crew: ICreditsPerson[]
}

export interface IMovie extends BaseMedia {
  adult: boolean
  title: string
  original_title: string
  release_date: string
  video: boolean
  tagline?: string
  runtime?: number
  genres?: IGenre[]
  credits?: IMovieCredits
}

export interface IFeaturedMovie {
  id: number
  title: string
  backdropUrl: string
  overview: string
  detailUrl: string
}

export type IMovieApiReturn = IApiReturn<IMovie>
