import type { SearchMediaType } from '../model'
import SearchTabs from './SearchTabs'

interface SearchHeaderProps {
  term: string | null
  type: SearchMediaType
  changeType: (type: SearchMediaType) => void
}

function SearchHeader({ term, type, changeType }: SearchHeaderProps) {
  return (
    <header className='mb-8 flex flex-col gap-4'>
      <p className='text-sm text-white/50'>검색 결과</p>
      <h1 className='text-3xl font-semibold md:text-5xl'>
        {term ? (
          <>
            <span className='text-white/70'>{` ${term} `}</span>
          </>
        ) : (
          '검색'
        )}
      </h1>
      <SearchTabs selected={type} onSelect={changeType} />
    </header>
  )
}

export default SearchHeader
