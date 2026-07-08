import type { ISearchData, SearchMediaType } from '../model'

function filterByMediaType(results: ISearchData[], mediaType: SearchMediaType) {
  return results.filter(item => item.media_type === mediaType)
}

export { filterByMediaType }
