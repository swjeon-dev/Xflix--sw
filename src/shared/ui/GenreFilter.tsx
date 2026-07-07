import type { IGenreTab } from '@/shared'

interface GenreFilterProps {
  label: '영화' | 'TV'
  tabs: IGenreTab[]
  selected: number
  onSelect: (genreId: number) => void
}

function GenreFilter({ label, tabs, selected, onSelect }: GenreFilterProps) {
  return (
    <div className='w-full pt-24 text-white main-page_px'>
      <div className='flex flex-col'>
        <label
          className='text-3xl md:text-5xl font-semibold'
          htmlFor='genre-filter'
        >
          {label}
        </label>
        <select
          id='genre-filter'
          className='pl-4 pr-8 py-2 mt-4 mb-10 border border-white/30 bg-black w-fit appearance-none rounded md:hidden'
          onChange={e => onSelect(Number(e.target.value))}
          value={selected}
        >
          {tabs.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-4 mb-10 hidden md:flex md:flex-wrap md:gap-2'>
        {tabs.map(genre => (
          <button
            key={genre.id}
            className='px-3 py-1 border border-white/50 bg-gray-500/40 rounded-full aria-pressed:bg-white aria-pressed:text-gray-500'
            role='tab'
            aria-pressed={genre.id === selected}
            onClick={() => onSelect(genre.id)}
          >
            <span className='text-sm font-bold'>{genre.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GenreFilter
