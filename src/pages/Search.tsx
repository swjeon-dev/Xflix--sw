import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'

import {
  useSearch,
  SearchList,
  SearchHeader,
  type SearchMediaType,
} from '@/features/search'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const term = searchParams.get('term')
  const rawType = searchParams.get('type')
  const type = rawType === 'tv' ? 'tv' : 'movie'

  const { items, isLoading, isFetchingMore, error, loaderRef, refetch } =
    useSearch({ term, type })

  function changeType(nextType: SearchMediaType) {
    setSearchParams(
      prev => {
        prev.set('type', nextType)
        return prev
      },
      { replace: true },
    )
  }

  const tabLabel = type === 'movie' ? '영화' : 'TV'
  const emptyMessage = term
    ? `"${term}"에 대한 ${tabLabel} 검색 결과가 없습니다.`
    : '검색어를 입력해 주세요.'

  return (
    <>
      <Helmet>
        <title>{term ? `"${term}" 검색` : '검색'}</title>
      </Helmet>

      <section className='min-h-screen pb-20 pt-24 text-white main-page_px'>
        <SearchHeader
          term={term ?? null}
          type={type}
          changeType={changeType}
        />

        <SearchList
          type={type}
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
