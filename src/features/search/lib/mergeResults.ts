import type { ISearchData } from '../model'

function mergeResults(
  prev: ISearchData[],
  incoming: ISearchData[],
  page: number,
) {
  if (page === 1) return incoming

  const ids = new Set(prev.map(item => `${item.media_type}-${item.id}`))
  return [
    ...prev,
    ...incoming.filter(item => !ids.has(`${item.media_type}-${item.id}`)),
  ]
}

export { mergeResults }
