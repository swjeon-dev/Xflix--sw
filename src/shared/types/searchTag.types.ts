type SearchMediaType = 'movie' | 'tv'

type SearchFilterKey = 'genre' | 'cast' | 'crew'

interface ISearchFilterTag {
  id: number
  name: string
}

export type { SearchMediaType, SearchFilterKey, ISearchFilterTag }
