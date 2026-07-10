type SearchMediaType = 'movie' | 'tv'

interface ISearchResult {
  page: number
  results: ISearchData[]
  total_pages: number
  total_results: number
}

interface IUseSearchProps {
  term: string | null | undefined
  type: SearchMediaType
}

interface ISearchData {
  adult: boolean
  backdrop_path?: string
  id: number
  name?: string
  original_name?: string
  overview?: string
  poster_path?: string
  media_type: string
  original_language?: string
  genre_ids?: number[]
  popularity: number
  first_air_date?: string
  softcore?: boolean
  vote_average?: number
  vote_count?: number
  origin_country?: string[]
  title?: string
  original_title?: string
  release_date?: string
  video?: boolean
}

export type { SearchMediaType, ISearchResult, ISearchData, IUseSearchProps }
