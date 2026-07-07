import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'

import { routes } from '@/shared'
import {
  useSearch,
  SearchList,
  SearchTabs,
  type SearchMediaType,
} from '@/features/search'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get(routes.SEARCH.QUERY_KEY)
  const rawType = searchParams.get(routes.SEARCH.MEDIA_TYPE_KEY)
  const mediaType = rawType === 'tv' ? 'tv' : 'movie'

  const { items, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useSearch({ query, mediaType })

  function changeMediaType(type: SearchMediaType) {
    setSearchParams(
      prev => {
        prev.set(routes.SEARCH.MEDIA_TYPE_KEY, type)
        return prev
      },
      { replace: true },
    )
  }

  const tabLabel = mediaType === 'movie' ? '영화' : 'TV'
  const emptyMessage = query
    ? `"${query}"에 대한 ${tabLabel} 검색 결과가 없습니다.`
    : '검색어를 입력해 주세요.'

  return (
    <>
      <Helmet>
        <title>{query ? `"${query}" 검색` : '검색'}</title>
      </Helmet>

      <section className='min-h-screen pb-20 pt-24 text-white main-page_px'>
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

        <SearchList
          items={items}
          isLoading={isLoading}
          isFetchingMore={isFetchingMore}
          error={error}
          loaderRef={loaderRef}
          emptyMessage={emptyMessage}
          onRetry={refetch}
        />
      </section>
    </>
  )
}
