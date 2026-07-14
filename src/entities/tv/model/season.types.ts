import type { IApiReturn } from '@/shared/types/api.types'

export interface IGuestStar {
  character: string
  credit_id: string
  order: number
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

export interface IEpisodeCrew {
  department?: string
  job: string
  credit_id: string
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

export interface IEpisode {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number | null
  season_number: number
  show_id: number
  still_path: string | null
  vote_average: number
  vote_count: number
  crew: IEpisodeCrew[]
  guest_stars: IGuestStar[]
}

export interface INetwork {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

/** GET /tv/{series_id}/season/{season_number} */
export interface ISeason {
  _id: string
  air_date: string
  episodes: IEpisode[]
  name: string
  networks: INetwork[]
  overview: string
  id: number
  poster_path: string | null
  season_number: number
  vote_average: number
}

export type ISeasonApiReturn = IApiReturn<ISeason>

/** TV 상세 응답의 seasons 항목 (에피소드 미포함) */
export interface ISeasonMeta {
  name: string
  poster_path: string | null
  air_date: string
}
