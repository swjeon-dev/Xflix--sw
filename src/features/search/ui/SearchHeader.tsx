import type { SearchFilterKey } from '@/shared'

import { SEARCH_FILTER_LABELS } from '../lib/searchFilterLabels'
import type { SearchMediaType } from '@/shared'
import SearchTabs from './SearchTabs'

interface SearchHeaderProps {
  term: string | null
  filter: SearchFilterKey | null
  label: string | null
  type: SearchMediaType
  changeType: (type: SearchMediaType) => void
}

function SearchHeader({
  term,
  filter,
  label,
  type,
  changeType,
}: SearchHeaderProps) {
  const subtitle = filter ? SEARCH_FILTER_LABELS[filter] : '검색 결과'
  const title = term ?? label ?? '검색'

  return (
    <header className='mb-8 flex flex-col gap-4'>
      <p className='text-sm text-white/50'>{subtitle}</p>
      <h1 className='text-3xl font-semibold md:text-5xl'>
        <span className='text-white/70'>{title}</span>
      </h1>
      <SearchTabs selected={type} onSelect={changeType} />
    </header>
  )
}

export default SearchHeader
