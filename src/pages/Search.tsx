import { useSearchParams } from 'react-router'

import {
  useSearch,
  useFilterGenre,
  useFilterPerson,
  SearchList,
  SearchHeader,
  getSearchPageCopy,
  resolveSearchParams,
} from '@/features/search'
import { PageHelmet, type SearchMediaType } from '@/shared'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const resolved = resolveSearchParams(searchParams)
  const { mode, type, term, filter, filterId, label } = resolved
  const { pageTitle, pageDescription, emptyMessage } =
    getSearchPageCopy(resolved)

  const searchResult = useSearch({ term, type })
  const genreFilterResult = useFilterGenre({ filter, filterId, type })
  const personFilterResult = useFilterPerson({ filter, filterId, type })

  const filterResult =
    filter === 'genre' ? genreFilterResult : personFilterResult

  const activeResult = mode === 'filter' ? filterResult : searchResult

  const { items, isLoading, isFetchingMore, error, loaderRef, refetch } =
    activeResult

  function changeType(nextType: SearchMediaType) {
    setSearchParams(
      prev => {
        prev.set('type', nextType)
        return prev
      },
      { replace: true },
    )
  }

  return (
    <>
      <PageHelmet
        title={pageTitle}
        description={pageDescription}
        robots='noindex, follow'
      />

      <section className='min-h-screen pb-20 pt-24 text-white main-page_px'>
        <SearchHeader
          term={term}
          filter={filter}
          label={label}
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
