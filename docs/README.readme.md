# 🎬 Xflix

[![Deploy](https://github.com/software92/Xflix--sw/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/software92/Xflix--sw/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://swjeon-dev.github.io/Xflix--sw/)
[![Figma](https://img.shields.io/badge/Figma-Design-orange)](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)

TMDB API 기반 영화·TV 탐색 서비스입니다.  
단순 조회 앱이 아니라, **검색, 무한 스크롤, 모달, 스크롤 잠금, 라우트 보호, 데이터 패칭 흐름**을 라이브러리에 기대지 않고 직접 설계해보는 데 목적을 둔 프론트엔드 포트폴리오 프로젝트입니다.

## 프로젝트 개요

- **개발 형태**: 단독 프론트엔드 프로젝트
- **핵심 목표**: React의 기본기만으로도 어디까지 안정적으로 기능을 구축할 수 있는지 검증
- **서비스 범위**: 홈, 영화/TV 목록, 상세 페이지, 예고편 모달, 검색 모달, 검색 결과 페이지

Xflix는 "라이브러리를 안 쓰는 것이 정답"이라는 관점보다,  
**직접 만들어보며 왜 라이브러리가 필요한지도 체감해보자**는 방향으로 진행했습니다.

무한 스크롤, 서버 상태, body scroll lock, 검색 상태 동기화 같은 기능을 직접 구현하면서:

- React의 `state`, `effect`, `cleanup`, `ref` 흐름을 다시 익히고
- 브라우저 API(`IntersectionObserver`, `URLSearchParams`, `matchMedia`)를 직접 다뤄보고
- 동시에 React Query 같은 도구가 왜 필요한지도 더 구체적으로 이해하는 경험을 목표로 했습니다.

즉, 다소 불편한 구현을 감수하더라도 **기본기 회복과 설계 감각**을 우선한 프로젝트입니다.

## 포트폴리오 관점 어필 포인트

- 외부 상태 관리 라이브러리 없이 **커스텀 훅 중심 데이터 흐름**을 설계했습니다.
- `SEARCH_MULTI` 기반 검색 화면을 만들고, **쿼리 스트링 기반 라우팅**과 **loader 보호 로직**을 적용했습니다.
- `IntersectionObserver`를 활용해 **가로/세로 무한 스크롤**을 직접 구현했습니다.
- `Modal` 포털, `useBodyScrollLock`, ESC 종료 등 **모달 UX를 직접 구성**했습니다.
- FSD Lite 구조를 적용해 **레이어별 책임 분리**를 명확하게 유지했습니다.

## 주요 기능

### 콘텐츠 탐색

- 홈에서 영화/TV 추천 섹션 탐색
- 장르 기반 영화/TV 목록 필터링
- 영화 상세 / TV 상세 페이지 제공
- 비슷한 콘텐츠 / 추천 콘텐츠 탐색

### 검색

- Header 검색 모달에서 검색어 입력 후 `/search?query=...` 페이지 이동
- 검색 결과 페이지에서 **영화 / TV 탭 분리**
- 검색 결과 **무한 스크롤**
- query가 없는 `/search` 직접 접근은 `loader`에서 차단

### 상세 인터랙션

- 영화 / TV 상세에서 예고편 모달 재생
- TV 시즌 에피소드 모달 탐색
- 모바일 메뉴 모달 및 body scroll lock 적용

### 운영

- GitHub Actions 기반 빌드 / 배포 자동화
- TypeScript 기반 API 응답 타입 관리

## 직접 구현한 핵심 요소

### 1. API 계층 분리

- `shared/api/tmdb/client.ts`
- `shared/api/tmdb/contents.ts`
- `shared/config/api-config.ts`

TMDB 요청 로직을 공통 클라이언트와 endpoint 상수로 분리해,  
UI에서 fetch 세부 구현을 모르더라도 재사용할 수 있게 구성했습니다.

### 2. 커스텀 훅 기반 데이터 패칭

- `shared/model/get-tmdb-contents.ts`
- `entities/movie/api/movie.ts`
- `entities/tv/api/tv.ts`
- `widget/tv-detail/model/useGetTV.ts`
- `features/search/model/use-search.ts`
- `shared/model/use-get-tmdb-videos.ts`

각 훅이 `loading / error / data / refetch`를 관리하도록 구성해,
UI와 데이터 처리 로직을 분리했습니다.

특히 `useSearch`는:

- `query`가 있을 때만 동작
- `movie` / `tv` 탭 변경 시 목록 초기화
- 페이지 단위 병합 및 중복 제거
- 추가 로딩 상태 분리

까지 직접 처리합니다.

### 3. 라이브러리 없이 구현한 무한 스크롤

- `shared/model/infinite-scroll.ts`

`IntersectionObserver`를 이용해:

- 홈 캐러셀의 가로 스크롤
- 장르 목록의 세로 스크롤
- 검색 결과 페이지 스크롤

을 공통 훅으로 처리했습니다.

### 4. 모달 UX와 스크롤 잠금

- `shared/ui/Modal.tsx`
- `shared/model/scroll-disable.ts`

Portal 기반 모달을 구현하고,  
모바일 메뉴 / 검색 모달에서 `useBodyScrollLock`으로 body 스크롤을 제어합니다.

### 5. 라우트 단위 데이터 제어

- `app/routes/rootLoader.ts`
- `app/routes/searchListLoader.ts`

앱 진입 시 영화/TV 장르를 미리 불러오고,  
검색 페이지는 `query`가 없으면 홈으로 redirect 되도록 구성했습니다.

## 기술 스택

### Frontend

- React 18
- TypeScript
- Vite
- React Router 7
- React Helmet Async

### Styling

- Tailwind CSS

### Deploy / Tooling

- GitHub Actions
- ESLint

## 왜 라이브러리 사용을 최소화했는가

이 프로젝트에서는 의도적으로 다음 계열의 라이브러리를 바로 도입하지 않았습니다.

- 서버 상태 관리 라이브러리
- 무한 스크롤 전용 라이브러리
- 모달 / body scroll lock 유틸리티
- 전역 상태 관리 라이브러리

이유는 두 가지입니다.

### 1. React 코드를 다시 "직접" 써보기 위해서

프로젝트를 진행하면서 가장 중요하게 둔 것은  
`상태가 언제 바뀌고`, `effect가 언제 실행되며`, `cleanup이 왜 필요한지`를 다시 몸으로 익히는 것이었습니다.

직접 구현해보니:

- 비동기 요청 취소 처리
- 페이지 병합
- observer 연결 / 해제
- query 변경 시 상태 초기화
- body scroll lock 복구

같은 세부 포인트를 더 분명하게 이해할 수 있었습니다.

### 2. 라이브러리의 필요성을 더 선명하게 느끼기 위해서

직접 구현은 학습에는 좋았지만, 불편한 점도 분명했습니다.

- 캐싱 부재
- 중복 요청 제어 부담
- 모달이 늘어날수록 스크롤 잠금 정책 관리 필요
- 검색 결과 탭과 페이지 상태 동기화 비용 증가

이 과정을 통해 "왜 React Query 같은 도구가 널리 쓰이는지"를 단순히 아는 수준이 아니라,  
**직접 부딪혀 보고 필요성을 체감한 상태로 이해**할 수 있었습니다.

## 디렉터리 구조

현재 프로젝트는 FSD를 가볍게 적용한 **FSD Lite** 구조를 사용합니다.

```text
src/
├── app/
│   ├── AppRouter.tsx
│   └── routes/
│       ├── router.tsx
│       ├── rootLoader.ts
│       └── searchListLoader.ts
├── pages/
│   ├── home.tsx
│   ├── movie-list.tsx
│   ├── movie-detail.tsx
│   ├── tv-list.tsx
│   ├── tv-detail.tsx
│   ├── search-list.tsx
│   └── error-page.tsx
├── entities/
│   ├── media/
│   ├── movie/
│   └── tv/
├── features/
│   ├── movie/
│   │   └── api/
│   ├── search/
│   │   ├── model/
│   │   └── ui/
│   └── tv/
│       └── api/
├── widget/
│   ├── featured-movie/
│   ├── genre/
│   ├── home/
│   ├── media/
│   ├── movie-detail/
│   └── tv-detail/
└── shared/
    ├── api/
    ├── assets/
    ├── config/
    ├── lib/
    ├── model/
    ├── types/
    └── ui/
```

## 레이어 역할

| 레이어     | 역할                           | 예시                                      |
| ---------- | ------------------------------ | ----------------------------------------- |
| `app`      | 앱 진입점, 라우터, 전역 loader | `router.tsx`, `rootLoader.ts`             |
| `pages`    | URL 기준 페이지 조립           | `movie-detail.tsx`, `search-list.tsx`     |
| `entities` | 도메인 핵심 타입               | `movie.types.ts`, `tv.types.ts`           |
| `features` | 유저 액션 / 도메인 기능        | 검색, 영화 fetch, TV 시즌 조회            |
| `widget`   | 화면 단위 조합 블록            | `movie-detail`, `genre-movies`            |
| `shared`   | 공통 UI / 훅 / 유틸 / API      | `Modal`, `useBodyScrollLock`, `tmdbFetch` |

## 최근 FSD 리팩토링

- movie/tv API를 `entities/*/api`로 이동하고 `features`에는 `search`만 유지했습니다.
- TV 상세 전용 로직(`useGetTV`, `useGetSeason`, episodes UI)을 `widget/tv-detail`로 이동했습니다.
- `widget/media-list`를 `widget/media`로 통합해 목록/캐러셀 공통 경로를 정리했습니다.
- 홈 카테고리 상수를 `widget/home/config`로 이동해 홈 위젯의 책임을 명확히 했습니다.

## 현재 라우트

- `/` : 홈
- `/movies` : 영화 목록
- `/movies/:id` : 영화 상세
- `/tv` : TV 목록
- `/tv/:id` : TV 상세
- `/search?query=...` : 검색 결과

## 실행 방법

### 1. 환경 변수

`.env` 파일에 TMDB Access Token을 설정합니다.

```bash
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

### 2. 로컬 실행

```bash
npm install
npm run dev
```

### 3. 검사 / 빌드

```bash
npm run lint
npm run build
```

## 회고

이 프로젝트는 "빠르게 기능을 붙이는 프로젝트"라기보다,  
**React를 다시 손으로 익히고 설계를 스스로 정리하는 프로젝트**에 가깝습니다.

라이브러리를 최소화한 덕분에:

- 상태와 effect의 흐름을 더 정확히 이해할 수 있었고
- UI와 데이터 로직을 분리하는 기준을 다시 정리할 수 있었으며
- 동시에 실무에서 왜 검증된 라이브러리를 적절히 도입해야 하는지도 더 분명히 느낄 수 있었습니다.

다음 단계에서는:

- React Query 도입을 통한 캐싱 / 서버 상태 단순화
- 검색을 `multi` 대신 전용 endpoint로 세분화하는 방향 검토
- 모달 스크롤 잠금 정책을 모든 모달에 일관되게 통합
- 서버 프록시 도입으로 API 키 노출 구조 개선

을 진행해볼 계획입니다.
