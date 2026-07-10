import { routes } from '@/shared'
import type { ISearchData, SearchMediaType } from '../model'

function searchItemTitle(item: ISearchData) {
  if (item.media_type === 'movie') {
    return item.title ?? item.original_title ?? '제목 없음'
  }

  return item.name ?? item.original_name ?? '제목 없음'
}

function searchItemYear(item: ISearchData) {
  const date = item.release_date ?? item.first_air_date
  return date ? date.slice(0, 4) : null
}

function searchItemDetailPath(type: SearchMediaType, item: ISearchData) {
  return type === 'movie'
    ? routes.MOVIE.DETAIL(item.id)
    : routes.TV.DETAIL(item.id)
}

export { searchItemTitle, searchItemYear, searchItemDetailPath }
