import type { SearchMediaType } from '@/shared'

const SEARCH_TABS: { id: SearchMediaType; label: string }[] = [
  { id: 'movie', label: '영화' },
  { id: 'tv', label: 'TV' },
]

interface SearchTabsProps {
  selected: SearchMediaType
  onSelect: (type: SearchMediaType) => void
}

function SearchTabs({ selected, onSelect }: SearchTabsProps) {
  return (
    <div
      className='flex flex-wrap gap-2'
      role='tablist'
      aria-label='검색 결과 유형'
    >
      {SEARCH_TABS.map(tab => (
        <button
          key={tab.id}
          type='button'
          role='tab'
          aria-selected={selected === tab.id}
          className='rounded-full border border-white/50 bg-gray-500/40 px-4 py-1.5 text-sm font-bold text-white transition-colors aria-selected:border-white aria-selected:bg-white aria-selected:text-gray-900'
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default SearchTabs
