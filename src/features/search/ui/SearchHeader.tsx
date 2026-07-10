import type { SearchMediaType } from '../model'
import SearchTabs from './SearchTabs'

interface SearchHeaderProps {
  query: string | null
  mediaType: SearchMediaType
  changeMediaType: (type: SearchMediaType) => void
}

function SearchHeader({
  query,
  mediaType,
  changeMediaType,
}: SearchHeaderProps) {
  return (
    <header className='mb-8 flex flex-col gap-4'>
      <p className='text-sm text-white/50'>검색 결과</p>
      <h1 className='text-3xl font-semibold md:text-5xl'>
        {query ? (
          <>
            <span className='text-white/70'>{` ${query} `}</span>
          </>
        ) : (
          '검색'
        )}
      </h1>
      <SearchTabs selected={mediaType} onSelect={changeMediaType} />
    </header>
  )
}

export default SearchHeader
