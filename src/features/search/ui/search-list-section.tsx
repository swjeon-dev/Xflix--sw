import { useState } from 'react'
import { useSearch, type SearchMediaType } from '../model'
import SearchResults from './search-results'
import SearchTabs from './search-tabs'

interface SearchListSectionProps {
  query: string | null
}

function SearchListSection({ query }: SearchListSectionProps) {
  const [mediaType, setMediaType] = useState<SearchMediaType>('movie')

  const { items, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useSearch({ query, mediaType })

  const tabLabel = mediaType === 'movie' ? '영화' : 'TV'
  const emptyMessage = query
    ? `"${query}"에 대한 ${tabLabel} 검색 결과가 없습니다.`
    : '검색어를 입력해 주세요.'

  return (
    <section className='min-h-screen pb-20 pt-24 text-white main-page_px'>
      <div className='mb-8 flex flex-col gap-4'>
        <p className='text-sm text-white/50'>검색 결과</p>
        <h1 className='text-3xl font-semibold md:text-5xl'>
          {query ? (
            <span className='text-white/70'>{` ${query} `}</span>
          ) : (
            '검색'
          )}
        </h1>
        <SearchTabs selected={mediaType} onSelect={setMediaType} />
      </div>

      <SearchResults
        items={items}
        isLoading={isLoading}
        isFetchingMore={isFetchingMore}
        error={error}
        loaderRef={loaderRef}
        emptyMessage={emptyMessage}
        onRetry={refetch}
      />
    </section>
  )
}

export default SearchListSection
