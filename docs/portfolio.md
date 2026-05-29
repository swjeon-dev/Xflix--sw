# Xflix - 상세 문서

이 문서는 GitHub 메인 `README.md`보다 조금 더 자세하게,  
프로젝트의 **목적, 사용자 흐름, 구현 포인트, FSD 설계, 회고**를 정리한 문서입니다.

## 프로젝트 요약

Xflix는 TMDB API 기반 영화·TV 탐색 서비스입니다.  
핵심은 단순한 콘텐츠 조회보다, **검색 / 무한 스크롤 / 모달 / 스크롤 잠금 / 라우팅**을 직접 구현하면서 React 기본기와 브라우저 API를 다시 익히는 데 있었습니다.

성능 최적화나 Core Web Vitals 수치 경쟁은 목표에 넣지 않았습니다. 대신 **데이터 흐름, UI 상태, 레이어 경계**를 손으로 설계·정리하는 데 집중했습니다.

## 왜 이 프로젝트를 만들었는가

이 프로젝트의 목적은 "라이브러리를 안 쓰는 것" 자체가 아니라,  
직접 구현을 통해 다음을 다시 분명하게 이해하는 것이었습니다.

- `state`, `effect`, `cleanup`, `ref`가 실제 화면 흐름에서 어떻게 동작하는지
- `IntersectionObserver`, `URLSearchParams`, `matchMedia` 같은 브라우저 API를 React 코드와 어떻게 연결하는지
- 그리고 반대로, **왜 React Query 같은 라이브러리가 실무에서 필요한지도 체감하는 것**

즉, 약간의 불편함을 감수하더라도 **기본기 회복과 설계 감각을 키우는 것**을 목표로 했습니다.

처음부터 정해진 디자인 시안이 있었던 프로젝트는 아니었습니다. 대신 초기 화면 설계 단계에서 AI를 참고해 화면 초안과 사용자 흐름을 빠르게 살펴보고, 그중 실제 서비스에 적합한 방향만 남겨 직접 수정하고 구현했습니다.

## 사용자 흐름

### 1. 홈에서 콘텐츠 탐색

- `widget/featured-movie`: 트렌딩 기반 Featured 영화
- `widget/home` + `widget/media`: 영화 / TV 추천 캐러셀(가로 무한 스크롤)

### 2. 장르 목록 탐색

- `pages/content-list.tsx` 하나로 movie / tv 목록을 `type` prop으로 분기
- `widget/genre`: 장르 탭 필터
- `widget/media` + `useListInfiniteScroll`: 세로 무한 스크롤 그리드
- `rootLoader`에서 앱 진입 시 장르 목록을 미리 로드

### 3. 상세 페이지

**영화**

- `widget/movie-detail`: 상세 정보, 예고편 모달, 유사·추천 캐러셀

**TV**

- `widget/tv-detail`: 상세 정보, 예고편 모달
- `widget/tv-detail/ui/episodes`: 시즌별 에피소드 미리보기·전체 목록 모달

### 4. 검색

1. Header 검색 모달 → `/search?query=...`
2. `searchListLoader`로 query 없는 접근 차단
3. `features/search`의 `SearchListSection`에서 탭·데이터·무한 스크롤 처리

### 5. 모바일 환경

메뉴 모달, 검색·상세·예고편 모달에서 body scroll lock과 ESC 종료를 공통 정책으로 적용했습니다.

## 핵심 구현 포인트

### 1. API 계층 분리

TMDB 요청은 `shared/api/tmdb` 아래에 모아 두고, endpoint는 `shared/config/api-config.ts`에서 관리했습니다.

도메인별 fetch 함수는 `entities/movie/api`, `entities/tv/api`에 두고, UI는 widget model 훅을 통해 데이터를 가져옵니다. `features`에는 `search`만 남깁니다.

### 2. 커스텀 훅 기반 데이터 패칭

| 훅                      | 위치                        | 역할                  |
| ----------------------- | --------------------------- | --------------------- |
| `useGetContents`        | `shared/model`              | 공통 목록 fetch       |
| `useGetMovie`           | `widget/movie-detail/model` | 영화 상세             |
| `useGetTV`              | `widget/tv-detail/model`    | TV 상세               |
| `useGetSeason`          | `widget/tv-detail/model`    | 시즌·에피소드         |
| `useGetTmdbVideos`      | `shared/model`              | 예고편                |
| `useSearch`             | `features/search/model`     | 검색·탭·페이지 병합   |
| `useListInfiniteScroll` | `shared/model`              | 가로/세로 무한 스크롤 |

각 훅이 `loading / error / data / refetch`(또는 동등한 상태)를 직접 관리합니다.

### 3. 무한 스크롤

`shared/model/infinite-scroll.ts`의 `IntersectionObserver` 기반 훅으로:

- 홈 캐러셀(가로)
- 장르 목록(세로)
- 검색 결과(세로)

를 공통 처리했습니다.

### 4. 검색 라우팅과 페이지 보호

- URL: `/search?query=...`
- `searchListLoader`: query 없으면 홈 redirect
- 페이지(`search-list`)는 얇게, 로직은 `features/search/ui/search-list-section`

### 5. 모달 UX

- `shared/ui/Modal` 포털
- `useBodyScrollLock`으로 스크롤 잠금 정책 통합

## FSD — 레이어를 어떻게 나눴는가

FSD를 **규칙 모음**이 아니라 **코드 배치 판단 기준**으로 사용했습니다.

### 1) 레이어별 역할

| 레이어     | 질문                                     | 책임                          |
| ---------- | ---------------------------------------- | ----------------------------- |
| `app`      | 앱 전체에 한 번만 필요한가?              | 라우터, 전역 loader           |
| `pages`    | URL에 대응하는가?                        | 위젯·feature 조립, Helmet     |
| `entities` | 비즈니스 객체의 **타입·조회 API**인가? | `types/`, `api/`, `Media` |
| `features` | **사용자 행위**가 분명한가?              | `search` (검색·탭·결과 병합)  |
| `widget`   | **특정 화면 블록**인가?                  | home, media, genre, \*-detail |
| `shared`   | 도메인 없이 재사용되는가?                | fetch, Modal, infinite-scroll |

### 2) 의존 방향

```text
app → pages → widget / features → entities / shared
```

- `features`는 `widget`을 import하지 않음.

### 3) `entities/*/api`와 `features/search`

`getMovie`, `getTV`, `getSeason`은 **엔티티 조회 API**이므로 `entities/movie/api`, `entities/tv/api`에 둡니다.

- `entities/movie` — `getMovie`
- `entities/tv` — `getTV`, `getSeason`
- `features/search` — 검색 모달, 탭, `useSearch`, 결과 UI (**사용자 행위**)

`features` 슬라이스는 **`search`만** 유지합니다.

### 4) 기존 구조 대비 — 추적·이해도

초기에는 `components/`, `hooks/`, `pages/`처럼 **기술 종류**로 폴더가 나뉘어, 파일 이름만으로는 역할을 알기 어려웠습니다.

FSD 적용 후에는:

- `widget/tv-detail/ui/episodes` → TV 상세의 에피소드 UI
- `features/search/model/use-search` → 검색 데이터 로직
- `widget/home/config` → 홈 전용 설정

처럼 **경로가 곧 책임**이 되어, 수정 시 어디를 열어야 할지 예측하기 쉬워졌습니다.  
「이 훅은 어느 화면용인가?」를 `hooks/` 전체를 뒤지지 않고 슬라이스부터 좁힐 수 있다는 점이 체감상 가장 컸습니다.

### 5) 실제 배치 예시

**`features/search`**

- 검색 모달, 결과 목록, `useSearch`, 탭 UI
- 「검색한다」는 사용자 행위가 명확하고, 페이지와 분리해도 의미가 유지됨

**`widget/tv-detail`**

- `useGetTV`, `useGetSeason`, `ui/episodes/*`
- TV 상세 URL에서만 쓰이는 UI·데이터 → **화면 조합 단위**로 widget에 응집

**`widget/media`**

- `ContentsCarousel`, `ContentListUI`, `content-card`
- movie/tv 타입만 바꿔 재사용 → 공통 presentation widget

**`entities/movie`, `entities/tv` (API + types)**

- `getMovie`, `getTV`, `getSeason` — 타입과 함께 entity 슬라이스에서 export
- 상세 fetch 훅(`useGetMovie`, `useGetTV`)은 widget model — **화면 소비** 쪽

**`pages/content-list`**

- `type: 'movie' | 'tv'`로 목록 페이지 통합
- pages는 `GenreFilter` + `ContentListUI`만 조립

### 6) 디렉터리 구조

```text
src/
├── app/routes/
├── pages/
│   ├── home.tsx
│   ├── content-list.tsx
│   ├── detail.tsx
│   └── search-list.tsx
├── entities/
│   ├── media/
│   ├── movie/
│   │   ├── api/
│   │   └── types/
│   ├── media/
│   │   ├── lib/        # isMovie, isTV
│   │   └── types/      # Media = IMovie | ITV
│   └── tv/
│       ├── api/
│       └── types/
├── features/
│   └── search/
├── widget/
│   ├── featured-movie/
│   ├── genre/
│   ├── home/
│   ├── media/
│   ├── movie-detail/
│   └── tv-detail/
│       ├── model/
│       └── ui/episodes/
└── shared/
```

### 7) 리팩토링으로 다듬은 경계

초기에는 movie/tv feature에 목록 UI·홈 설정·상세 훅이 섞여 있었습니다. 이후 기준에 맞춰 정리했습니다.

- `features/movie`, `features/tv` API → `entities/*/api`
- `features`에는 `search`만 유지
- `widget/media-list` → `widget/media` (공통 캐러셀·목록)
- 홈 카테고리 → `widget/home/config`
- TV 에피소드 → `widget/tv-detail` (상세 전용 UI)

## 기술 스택

### Frontend

- React 18
- TypeScript
- Vite
- React Router 7
- React Helmet Async

### Styling

- Tailwind CSS

### Tooling

- GitHub Actions
- ESLint

## 현재 제공하는 라우트

- `/`
- `/movies`
- `/movies/:id`
- `/tv`
- `/tv/:id`
- `/search?query=...`

배포 환경(GitHub Pages)에서는 `basename: /Xflix--sw`를 사용합니다.

## 실행 방법

### 환경 변수

```bash
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

### 로컬 실행

```bash
npm install
npm run dev
```

### 빌드 / 검사

```bash
npm run lint
npm run build
```

## 회고

직접 구현은 분명 불편했지만, React 기본기와 브라우저 API를 다시 익히는 데 도움이 되었습니다.  
FSD를 적용하면서 **「기능인가, 화면 블록인가, 공통인가」**를 매번 질문하게 된 점이 가장 큰 구조적 수확이었습니다.

이 프로젝트는 "라이브러리를 배제한 프로젝트"라기보다,  
**라이브러리와 구조를 더 잘 이해하기 위해 한 번 돌아가 본 프로젝트**에 가깝습니다.
