# URL · Fetch 통일 가이드

Xflix 프로젝트에서 URL을 만들고 TMDB 데이터를 fetch하는 규칙을 정리한 문서입니다.

---

## 1. 원칙

| 원칙 | 설명 |
|---|---|
| **단일 조립** | TMDB fetch URL 문자열은 `buildUrl`(`client.ts`)에서만 조립 |
| **단일 HTTP 진입** | TMDB HTTP 요청은 `tmdbFetch`만 사용 (`client.ts` 내부 `fetch` 제외) |
| **path catalog** | TMDB path는 `API_ENDPOINT`(`config/api.ts`)에만 정의 |
| **외부 URL 헬퍼** | TMDB 이미지·YouTube embed는 전용 헬퍼만 사용 |
| **패턴 유지** | 단건 상세 vs 목록 fetch는 아래 **두 패턴**으로 구분 (혼용하지 않음) |

---

## 2. URL 종류별 담당

```
┌─────────────────────────────────────────────────────────┐
│  TMDB API fetch URL    →  tmdbFetch + buildUrl          │
│  TMDB path 정의        →  API_ENDPOINT (config/api.ts)  │
│  TMDB 이미지 URL       →  getTmdbImgPath                │
│  YouTube embed URL     →  buildYoutubeEmbedUrl          │
│  앱 내부 라우트        →  routes (config/routes.ts)     │
└─────────────────────────────────────────────────────────┘
```

### 금지 사항

- `fetch(API_CONFIG.BASE_URL + ...)` 직접 호출
- `API_ENDPOINT` 밖에 path 문자열 로컬 정의
- UI에서 TMDB/YouTube URL 템플릿 직접 조립
- `tmdbFetch` query에 `language` 중복 전달
- `features/*` barrel에서 `API_ENDPOINT` re-export

### `API_ENDPOINT` import 규칙

```typescript
// ✅ 허용
import { API_ENDPOINT } from '@/shared/config/api'

// ❌ 금지 — feature가 config catalog를 대신 노출
import { API_ENDPOINT } from '@/features/tv'
import { API_ENDPOINT } from '@/features/movies'
```

---

## 3. TMDB fetch URL 조립 (공통)

```
{BASE_URL}{endpoint}?language={LANGUAGE}&{optionalQuery}
```

| 항목 | 출처 |
|---|---|
| `BASE_URL` | `API_CONFIG` |
| `endpoint` | `API_ENDPOINT` 또는 `ApiPath` |
| `language` | `buildUrl`이 항상 부착 (`ko`) |
| 추가 query | `tmdbFetch` 2번째 인자 |

구현: `src/shared/api/tmdb/client.ts`

```typescript
await tmdbFetch<ResponseType>(
  API_ENDPOINT.MOVIE_VIDEOS(id),
  { page: 1 }, // language는 넣지 않음
  '에러 메시지',
)
```

---

## 4. Fetch 패턴 (정규화)

프로젝트는 **두 가지 fetch 패턴**을 유지합니다.

### 패턴 A — 단건·도메인 API (Detail)

**용도**: 상세 1건, 인증, 장르, 영상 목록 등 **의미가 고정된** 요청

```
Page / Hook
  └─ features/*/api/*.ts  또는  shared/api/tmdb/*.ts
       └─ tmdbFetch(API_ENDPOINT.XXX, query, errorMessage)
            └─ buildUrl → fetch
```

| 예시 | api 함수 | hook |
|---|---|---|
| 영화 상세 | `getMovie` | `useGetMovie` |
| TV 상세 | `getTV` | `useGetTv` |
| TV 시즌 | `getSeason` | `useGetSeason` |
| 장르 목록 | `getGenres` | — |
| 영상 목록 | `getVideosEndpoint` + `tmdbFetch` | `useGetTmdbVideos` |
| 인증 | `apiValidCheck` | — |

**규칙**

- `movie / tv` endpoint 분기는 **api 레이어**에서 처리 (`genres.ts`, `video.ts`)
- hook은 api 함수(또는 `getVideosEndpoint`)만 호출하고 path 문자열을 직접 만들지 않음
- page는 `getMovie(id, query)` 수준의 **도메인 의미**만 앎

```typescript
// MovieDetail.tsx — 상세: [movie-fetch-guide.md](./movie-fetch-guide.md)
const DETAIL_QUERY = { append_to_response: 'credits' }
const { movie } = useGetMovie(id, DETAIL_QUERY)
```

---

### 패턴 B — 목록·페이지네이션 (Generic List)

**용도**: 캐러셀, 장르 discover, 홈 카테고리, 추천/유사 목록 등 **endpoint가 바뀌는** 목록

```
Page / Widget / Config
  └─ endPoint: API_ENDPOINT.XXX  (+ params)
       └─ useListInfiniteScroll / ContentsCarousel
            └─ useGetContents(endPoint, query)
                 └─ tmdbFetch → buildUrl → fetch
```

| 예시 | endpoint 전달 위치 | query |
|---|---|---|
| 홈 무비 캐러셀 | `home-movie-categories.ts` | — |
| 홈 TV 캐러셀 | `home-tv-categories.ts` | — |
| 장르 영화 목록 | `genre-movies-list.tsx` | `getDiscoverSearchParams` |
| 피처드 무비 | `get-featured-movie.ts` | — |
| 상세 유사/추천 | `MovieDetail.tsx` | — |

**규칙**

- page·widget·config에서 `API_ENDPOINT`를 **직접 전달하는 것은 정식 패턴**
- `ContentsCarousel` / `useGetContents`는 `endPoint: ApiPath`를 받는 **범용 목록 컴포넌트**
- query 조합이 반복되면 widget `discover-params.ts`처럼 **params 헬퍼**로 분리 (endpoint와 별도)
- 목록 fetch는 `useGetContents` hook이 `tmdbFetch`를 직접 호출 (별도 api wrapper 없음)

```typescript
// MovieDetail.tsx — 패턴 B (의도된 사용)
<ContentsList
  title='비슷한 장르 영화'
  endPoint={API_ENDPOINT.MOVIE_SIMILAR(id!)}
/>
```

```typescript
// genre-movies-list.tsx — endpoint + params + fetch hook
useListInfiniteScroll({
  endPoint: API_ENDPOINT.MOVIE_FILTERED,
  params: getDiscoverSearchParams(genreId),
  useContents: useGetContents<IMovie>,
})
```

---

### 패턴 선택 기준

| 질문 | 선택 |
|---|---|
| 응답이 단건 리소스인가? | **패턴 A** — `getMovie`, `getTV` … |
| 페이지네이션 목록인가? | **패턴 B** — `endPoint` + `useGetContents` |
| endpoint가 화면마다 달라지는가? | **패턴 B** |
| `movie / tv` 분기가 필요한가? | **api 레이어** (`video.ts`, `genres.ts`) |

### 예외 — feature hook에서 `tmdbFetch` 직접

`use-search.ts`처럼 **feature 전용**이고 목록 인프라를 쓰지 않는 경우, hook에서 `tmdbFetch`를 직접 호출할 수 있습니다.  
이때도 endpoint는 `API_ENDPOINT`에서만 가져옵니다.

---

## 5. Query 파라미터 규칙

### 자동 (호출부에서 넣지 않음)

- `language` — `buildUrl`이 처리

### 명시 (호출부·params 헬퍼)

| API | query 예 |
|---|---|
| discover | `with_genres`, `page`, `sort_by` |
| search | `query`, `page`, `include_adult` |
| detail | `append_to_response` |
| videos | 없음 |

### hook의 `JSON.stringify` / `parse`

`useGetContents.ts`, `useGetTV` 등 목록 hook의 query 직렬화는 **effect 의존성용**이며 URL 빌더가 아닙니다.

`useGetMovie`는 `queryParams`를 `getMovie`에 직접 전달하며, effect deps는 `[id]`만 사용합니다. → [movie-fetch-guide.md](./movie-fetch-guide.md)

---

## 6. TMDB 이미지 URL

```typescript
getTmdbImgPath({ path, size })
```

구현: `src/shared/lib/helper/create-image-url.ts`

- path 없음 → `undefined`
- `image.tmdb.org` 직접 조립 금지

---

## 7. YouTube embed URL

```typescript
buildYoutubeEmbedUrl(videoKey, variant) // 'background' | 'modal'
```

구현: `src/shared/lib/helper/buildYoutubeEmbedUrl.ts`

iframe 제어 상세: [iframe.md](./iframe.md)

---

## 8. 앱 라우트 URL

```typescript
routes.MOVIE.DETAIL(id)
```

구현: `src/shared/config/routes.ts` — path 하드코딩 금지

---

## 9. 파일별 책임

```
src/shared/config/api.ts
  API_CONFIG, API_ENDPOINT, ApiPath

src/shared/api/tmdb/client.ts
  buildUrl, tmdbFetch, QueryParams        ← HTTP · URL 조립 유일

src/shared/api/tmdb/*.ts
  auth, genres, video …                  ← 패턴 A (shared 도메인)

src/features/*/api/*.ts
  getMovie, getTV, getSeason …           ← 패턴 A (feature 도메인)

src/shared/model/useGetContents.ts
  useGetContents                         ← 패턴 B hook (tmdbFetch 직접)

src/shared/model/infinite-scroll.ts
  useListInfiniteScroll                  ← 패턴 B + 페이지네이션

src/features/*/config/*-categories.ts
  endPoint catalog (홈 카테고리)

src/pages, src/widget
  패턴 A: hook 호출 / 패턴 B: API_ENDPOINT + params 전달

src/shared/lib/helper/
  buildYoutubeEmbedUrl, getTmdbImgPath
```

---

## 10. 참고 플로우

### 트레일러 (패턴 A)

```
TrailerUI / TrailerModal
  └─ useGetTmdbVideos(id, mediaType)
       └─ tmdbFetch(getVideosEndpoint(id, mediaType), …)
       └─ pickYoutubeTrailer
  └─ buildYoutubeEmbedUrl(trailer.key, variant)
```

### 영화 상세 (패턴 A + B)

```
MovieDetail
  └─ useGetMovie(id, { append_to_response: 'credits' })     // A
  └─ ContentsList endPoint={MOVIE_SIMILAR(id)}              // B
  └─ ContentsList endPoint={MOVIE_RECOMMEND(id)}            // B
```

---

## 11. PR 체크리스트

| # | 확인 항목 | 기준 |
|---|---|---|
| 1 | `fetch(`가 `client.ts` 외에 있는가? | `tmdbFetch`만 |
| 2 | path가 `API_ENDPOINT` 밖에 있는가? | catalog로 이동 |
| 3 | query에 `language`를 넣었는가? | 제거 |
| 4 | hook에 `movie/tv` endpoint 분기가 있는가? | `shared/api/tmdb` 또는 `features/api`로 |
| 5 | 목록 fetch가 hook 밖에서 `tmdbFetch`를 직접 호출하는가? | `useGetContents` 경로 |
| 6 | TMDB 이미지·YouTube URL을 UI에서 직접 조립하는가? | 헬퍼 사용 |
| 7 | `BASE_URL + endpoint` 수동 concat이 있는가? | `buildUrl` 경로 |
| 8 | 앱 path 하드코딩 | `routes` 사용 |
| 9 | `API_ENDPOINT`를 feature barrel에서 re-export하는가? | `@/shared/config/api`만 |
| 10 | 단건 fetch인데 `endPoint` prop으로 넘기는가? | 패턴 A api 함수로 |
| 11 | 목록인데 api 함수를 새로 만드는가? | 패턴 B `endPoint` + `useGetContents` |

---

## 12. 코드베이스 점검 결과

점검일: 2026-06-24 (재검토)

| # | 항목 | 상태 | 비고 |
|---|---|---|---|
| 1 | `fetch`는 `tmdbFetch`만 | ✅ | `client.ts`만 raw `fetch` |
| 2 | path는 `API_ENDPOINT`에 집중 | ✅ | `getVideosEndpoint` → `shared/api/tmdb/video.ts` |
| 3 | `language` query 중복 없음 | ✅ | |
| 4 | `movie/tv` 분기 api 레이어 | ✅ | `video.ts`, `genres.ts` |
| 5 | 목록은 `useGetContents` 경로 | ✅ | 캐러셀·장르·피처드 |
| 6 | 이미지·YouTube 헬퍼 | ✅ | |
| 7 | `BASE_URL` 수동 concat 없음 | ✅ | |
| 8 | `routes` 사용 | ✅ | |
| 9 | feature re-export 없음 | ✅ | `features/tv` re-export 제거됨 |
| 10 | 패턴 A/B 구분 | ✅ | `MovieDetail`: `useGetMovie` + `ContentsList` |
| 11 | `API_ENDPOINT` import | ✅ | `@/shared/config/api`에서 직접 import |

---

## 13. 관련 문서

- [movie-fetch-guide.md](./movie-fetch-guide.md) — `getMovie` · `useGetMovie` (영화 상세 패턴 A)
- [iframe.md](./iframe.md) — YouTube embed 제어 (URL 파라미터 vs postMessage)
