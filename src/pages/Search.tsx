import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'

import { routes } from '@/shared'
import {
  useSearch,
  SearchList,
  SearchHeader,
  type SearchMediaType,
} from '@/features/search'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get(routes.SEARCH.TERM_KEY)
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
        <SearchHeader
          query={query ?? null}
          mediaType={mediaType}
          changeMediaType={changeMediaType}
        />

        <SearchList
          mediaType={mediaType}
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
