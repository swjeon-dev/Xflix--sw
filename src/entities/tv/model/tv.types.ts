import type { IApiReturn } from '@/shared/types/api.types'
import type { BaseMedia } from '@/shared/types/contents.types'

export interface ITV extends BaseMedia {
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
}

export type ITVApiReturn = IApiReturn<ITV>
