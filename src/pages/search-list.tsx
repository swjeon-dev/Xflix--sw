import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'
import { routes } from '@/shared'
import { SearchListSection } from '@/features/search'

// 탭 상태를 새로고침/공유 URL까지 유지하려면 mediaType을 URL 파라미터(?type=movie|tv)로 동기화할지 결정하면 좋습니다.
// (현재 구조는 FSD 위반은 아니고 UX 정책 선택 문제입니다.)
export default function SearchListView() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get(routes.SEARCH.QUERY_KEY)

  return (
    <>
      <Helmet>
        <title>{query ? `"${query}" 검색` : '검색'}</title>
      </Helmet>

      <SearchListSection query={query} />
    </>
  )
}
