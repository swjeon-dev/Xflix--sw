# 영화 상세 Fetch 가이드 — `getMovie` · `useGetMovie`

Xflix에서 **영화 상세 1건**을 가져올 때 사용하는 API 함수(`getMovie`)와 React Hook(`useGetMovie`)의 역할·규칙·사용법을 정리한 문서입니다.

> URL 조립·HTTP 진입·패턴 A/B 전체 규칙은 [url-building-guide.md](./url-building-guide.md)를 참고하세요.

---

## 1. 한 줄 요약

```
Page → useGetMovie(id, query) → getMovie(id, query) → tmdbFetch → buildUrl → fetch
```

| 레이어 | 파일 | 책임 |
|--------|------|------|
| Page | `src/pages/MovieDetail.tsx` | 라우트 `id`, query 상수, UI 분기 |
| Hook | `src/features/movies/model/useGetMovie.ts` | 로딩·에러·데이터 state, effect 생명주기 |
| API | `src/features/movies/api/movie.ts` | TMDB path·query·에러 메시지 |
| Shared | `src/shared/api/tmdb/client.ts` | URL 조립(`buildUrl`)·HTTP(`tmdbFetch`) |
| Config | `src/shared/config/api.ts` | `API_ENDPOINT.MOVIE_DETAIL` |

---

## 2. 데이터 흐름

```
MovieDetail
  │
  ├─ const DETAIL_QUERY = { append_to_response: 'credits' }
  ├─ useGetMovie(id, DETAIL_QUERY)
  │     │
  │     └─ getMovie(id, queryParams)
  │           │
  │           └─ tmdbFetch(
  │                 API_ENDPOINT.MOVIE_DETAIL(id),  // /movie/{id}
  │                 queryParams,
  │                 '현재 영화를 찾을 수 없습니다.',
  │               )
  │                 │
  │                 └─ buildUrl → https://api.themoviedb.org/3/movie/{id}?language=ko&append_to_response=credits
  │
  └─ { error, isLoading, movie }
```

---

## 3. `getMovie` (API 레이어)

**파일:** `src/features/movies/api/movie.ts`

### 역할

- TMDB **영화 상세** endpoint를 호출하는 **유일한 feature API 진입점**
- path 문자열을 직접 만들지 않고 `API_ENDPOINT.MOVIE_DETAIL(id)` 사용
- HTTP·URL 조립은 `tmdbFetch`에 위임

### 시그니처

```typescript
export const getMovie = async (
  id: string,
  queryParams?: QueryParams,
): Promise<IApiReturn<IMovie>>
```

| 인자 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | TMDB movie id (필수). `undefined`는 호출 전에 걸러야 함 |
| `queryParams` | `QueryParams?` | `append_to_response` 등 추가 query |

### 반환

```typescript
interface IApiReturn<T> {
  data: T | null
  error: string | null
}
```

- 성공: `{ data: IMovie, error: null }`
- 실패: `{ data: null, error: '현재 영화를 찾을 수 없습니다.' }` (또는 네트워크 메시지)
- **throw하지 않음** — hook·page에서 `error` 필드로 처리

### 구현 예시

```typescript
import type { IMovie } from '@/entities/movie'
import {
  type IApiReturn,
  type QueryParams,
  tmdbFetch,
  API_ENDPOINT,
} from '@/shared'

export const getMovie = async (
  id: string,
  queryParams?: QueryParams,
): Promise<IApiReturn<IMovie>> => {
  return tmdbFetch<IMovie>(
    API_ENDPOINT.MOVIE_DETAIL(id),
    queryParams,
    '현재 영화를 찾을 수 없습니다.',
  )
}
```

### Query 규칙

| 항목 | 처리 |
|------|------|
| `language` | **넣지 않음** — `buildUrl`이 `ko` 자동 부착 |
| `append_to_response` | page·hook에서 `queryParams`로 전달 (예: `'credits'`) |

---

## 4. `useGetMovie` (Hook 레이어)

**파일:** `src/features/movies/model/useGetMovie.ts`

### 역할

- `getMovie`를 React 생명주기에 맞게 호출
- `{ error, isLoading, movie }` state 제공
- `id` 변경·언마운트 시 **stale 응답**이 state를 덮어쓰지 않도록 `cancelled` 가드

### 시그니처

```typescript
function useGetMovie(
  id: string | undefined,
  queryParams?: QueryParams,
): IUseGetMovieReturn

interface IUseGetMovieReturn {
  error: string | null
  isLoading: boolean
  movie: IMovie | null
}
```

| 인자 | 타입 | 설명 |
|------|------|------|
| `id` | `string \| undefined` | `useParams()` 결과 그대로 전달 가능 |
| `queryParams` | `QueryParams?` | 상세 조회용 query (보통 모듈 상수) |

### effect 동작

1. **`!id`** → loading false, movie/error null, fetch 안 함
2. **`id` 있음** → loading true, movie/error 초기화 후 `getMovie` 호출
3. **cleanup** → `cancelled = true` (이전 요청의 setState 차단)
4. **deps `[id]`** → `id`가 바뀔 때만 재요청

#### `queryParams`를 deps에 넣지 않는 이유

`queryParams`는 보통 **모듈 상수**(`DETAIL_QUERY`)이며 런타임에 변하지 않습니다.  
`id` 변경 시에만 재요청하면 되므로 deps는 `[id]`만 사용합니다.

```typescript
}, [id]) // queryParams(DETAIL_QUERY)는 상수 — id 변경 시만 재요청
```

`queryParams`가 동적으로 바뀌어야 하는 경우에만 deps에 추가하거나, 호출부에서 `useMemo`로 안정화합니다.

### 구현 핵심

```typescript
useEffect(() => {
  if (!id) {
    setIsLoading(false)
    setMovie(null)
    setError(null)
    return
  }

  let cancelled = false

  async function fetchMovie(movieId: string) {
    setIsLoading(true)
    setMovie(null)
    setError(null)

    const result = await getMovie(movieId, queryParams)

    if (cancelled) return

    setMovie(result.data)
    setError(result.error)
    setIsLoading(false)
  }

  fetchMovie(id)
  return () => {
    cancelled = true
  }
}, [id])
```

---

## 5. Page 사용법 — `MovieDetail`

**파일:** `src/pages/MovieDetail.tsx`

### 권장 패턴

```typescript
const DETAIL_QUERY = { append_to_response: 'credits' }

function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const { error, isLoading, movie } = useGetMovie(id, DETAIL_QUERY)

  if (isLoading) {
    return <LoadingComponent ... />
  }

  return (
    <>
      <MovieDetailSection movie={movie} error={error} />
      {/* 유사·추천 목록은 패턴 B — 아래 6절 참고 */}
    </>
  )
}
```

### Page가 알아야 할 것 / 몰라도 되는 것

| 알아야 함 | 몰라도 됨 |
|-----------|-----------|
| `useGetMovie(id, query)` | `buildUrl` 조립 방식 |
| `DETAIL_QUERY` 상수 | `API_ENDPOINT.MOVIE_DETAIL` path |
| `{ error, isLoading, movie }` 분기 | raw `fetch`, Bearer token |

---

## 6. 같은 페이지의 목록 fetch (패턴 B)

영화 **상세 1건**은 `getMovie` / `useGetMovie`(패턴 A).  
**유사·추천 목록**은 별도 패턴 B입니다.

```typescript
<ContentsList
  title='비슷한 장르 영화'
  endPoint={API_ENDPOINT.MOVIE_SIMILAR(id ?? '')}
/>
<ContentsList
  title='추천하는 영화'
  endPoint={API_ENDPOINT.MOVIE_RECOMMEND(id ?? '')}
/>
```

| 구분 | 패턴 A (`getMovie`) | 패턴 B (`ContentsList`) |
|------|---------------------|-------------------------|
| 용도 | 상세 1건 | 페이지네이션 목록 |
| 진입 | `useGetMovie` | `endPoint` prop |
| API | `getMovie` | `useGetContents` → `tmdbFetch` |

**단건 상세를 `endPoint` prop으로 넘기지 않습니다.**

---

## 7. 금지 사항

| ❌ 금지 | ✅ 대신 |
|---------|---------|
| page/hook에서 `fetch('/movie/...')` | `useGetMovie` → `getMovie` |
| hook에서 `API_ENDPOINT.MOVIE_DETAIL` 직접 호출 | `getMovie(id, query)` |
| `queryParams`에 `language` 추가 | `buildUrl`에 맡김 |
| 상세 1건을 `ContentsList`의 `endPoint`로 | `useGetMovie` 사용 |
| `getMovie` 없이 `tmdbFetch`를 page에서 직접 | api 레이어 유지 |

---

## 8. Export · Import

```typescript
// feature barrel
import { useGetMovie, getMovie } from '@/features/movies'

// page에서 hook만 (일반적)
import useGetMovie from '@/features/movies/model/useGetMovie'

// hook 내부
import { getMovie } from '../api/movie'
```

`features/movies` barrel에서 `API_ENDPOINT`를 re-export하지 않습니다.

---

## 9. PR 체크리스트 (movie 상세)

| # | 확인 |
|---|------|
| 1 | 영화 상세 fetch가 `getMovie` → `tmdbFetch` 경로인가? |
| 2 | hook이 path 문자열을 만들지 않는가? |
| 3 | `queryParams`에 `language`가 없는가? |
| 4 | `DETAIL_QUERY` 등 query가 인라인 객체가 아닌 **상수**인가? |
| 5 | 유사·추천은 `ContentsList` + `API_ENDPOINT.MOVIE_*`인가? |
| 6 | `useGetMovie` deps가 `[id]`(의도)인가? |

---

## 10. 관련 파일

```
src/shared/config/api.ts              API_ENDPOINT.MOVIE_DETAIL
src/shared/api/tmdb/client.ts         buildUrl, tmdbFetch, QueryParams
src/features/movies/api/movie.ts      getMovie
src/features/movies/model/useGetMovie.ts  useGetMovie
src/features/movies/index.ts          export
src/pages/MovieDetail.tsx             사용 예
src/entities/movie/                   IMovie 타입
```

---

## 11. 관련 문서

- [url-building-guide.md](./url-building-guide.md) — fetch·URL 전체 규칙, 패턴 A/B
- [iframe.md](./iframe.md) — 트레일러 embed (상세 페이지 보조 기능)
