import type { IApiReturn } from '@/shared/types/api.types'
import type { BaseMedia, ICredits, IGenre } from '@/shared/types/contents.types'

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
