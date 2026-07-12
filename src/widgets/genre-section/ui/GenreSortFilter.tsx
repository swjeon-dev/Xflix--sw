import type { IGenreTab } from '@/shared'

import { SORT_OPTIONS, type SortOption } from '../lib'

const selectClassName =
  'pl-4 pr-8 py-2 border border-white/30 bg-black text-white w-fit appearance-none rounded'

interface GenreSortFilterProps {
  tabs: IGenreTab[]
  selected: number
  onSelect: (genreId: number) => void
  sortOption: SortOption
  onSortChange: (option: SortOption) => void
}

function GenreSortFilter({
  tabs,
  selected,
  onSelect,
  sortOption,
  onSortChange,
}: GenreSortFilterProps) {
  return (
    <div className='main-page_px mt-4 mb-10 flex justify-between gap-2'>
      <select
        aria-label='장르'
        className={selectClassName}
        value={selected}
        onChange={e => onSelect(Number(e.target.value))}
      >
        {tabs.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <select
        aria-label='정렬'
        className={selectClassName}
        value={sortOption}
        onChange={e => onSortChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default GenreSortFilter
