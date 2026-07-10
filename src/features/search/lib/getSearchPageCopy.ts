import { SEARCH_FILTER_LABELS } from './searchFilterLabels'
import type { ResolvedSearchParams } from './resolveSearchParams'

type SearchPageCopy = {
  pageTitle: string
  emptyMessage: string
}

function getTabLabel(type: ResolvedSearchParams['type']) {
  return type === 'movie' ? '영화' : 'TV'
}

function getSearchPageCopy({
  mode,
  type,
  term,
  filter,
  label,
}: ResolvedSearchParams): SearchPageCopy {
  const tabLabel = getTabLabel(type)
  const filterTypeLabel = filter ? SEARCH_FILTER_LABELS[filter] : null

  if (mode === 'term' && term) {
    return {
      pageTitle: `"${term}" 검색`,
      emptyMessage: `"${term}"에 대한 ${tabLabel} 검색 결과가 없습니다.`,
    }
  }

  if (mode === 'filter' && label && filterTypeLabel) {
    return {
      pageTitle: `${label} · ${filterTypeLabel}`,
      emptyMessage: `"${label}" ${filterTypeLabel} ${tabLabel} 결과가 없습니다.`,
    }
  }

  return {
    pageTitle: '검색',
    emptyMessage: '검색 결과가 없습니다.',
  }
}

export type { SearchPageCopy }
export { getSearchPageCopy }
