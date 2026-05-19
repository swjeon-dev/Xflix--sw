import { ICastItem, IContentCommon, ICrewItem } from './content.types'

interface IMovieCastItem extends ICastItem {
  cast_id: number
}

interface Credits {
  cast: IMovieCastItem[]
  crew: ICrewItem[]
}

export interface IMovie extends IContentCommon {
  imdb_id: string
  release_date: string
  runtime: number
  title: string
  credits: Credits
}

export interface IFeaturedMovie {
  id: number
  title: string
  backdropUrl: string
  overview: string
  detailUrl: string
}
