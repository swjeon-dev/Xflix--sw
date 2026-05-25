import type { ISearchData } from './search.types'

export function getSearchItemTitle(item: ISearchData) {
  if (item.media_type === 'movie') {
    return item.title ?? item.original_title ?? '제목 없음'
  }

  return item.name ?? item.original_name ?? '제목 없음'
}

export function getSearchItemYear(item: ISearchData) {
  const date = item.release_date ?? item.first_air_date
  return date ? date.slice(0, 4) : null
}
