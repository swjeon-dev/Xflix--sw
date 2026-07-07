interface IVideo {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  id: string
  type: string
  official: boolean
  published_at: string
}

interface IVideoReturn {
  id: number
  results: IVideo[]
}

type MediaVideoType = 'movie' | 'tv'

export type { IVideo, IVideoReturn, MediaVideoType }
