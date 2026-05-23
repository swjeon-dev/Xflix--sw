import type { IApiReturn } from '@/shared/types/api.types'
import type { BaseMedia, ICredits, IGenre } from '@/shared/types/contents.types'
import { ISeason } from './season.types'

type CreatedBy = {
  id: number
  credit_id: string
  name: string
  original_name: string
  gender: number
  profile_path: string
}

export interface ITV extends BaseMedia {
  name: string
  original_name: string
  first_air_date: string
  last_air_date: string
  origin_country: string[]
  created_by: CreatedBy[]
  tagline?: string
  runtime?: number
  adult?: boolean
  genres?: IGenre[]
  credits?: ICredits
  seasons?: ISeason[]
}

export type ITVApiReturn = IApiReturn<ITV>
