type SearchFilterKey = 'genre' | 'cast' | 'crew'

interface ISearchFilterTag {
  id: number
  name: string
}

export type { SearchFilterKey, ISearchFilterTag }
