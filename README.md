# 🎬 Xflix

[![Deploy](https://github.com/swjeon-dev/Xflix--sw/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/swjeon-dev/Xflix--sw/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live_Demo-main-brightgreen)](https://swjeon-dev.github.io/Xflix--sw/)
[![Figma](https://img.shields.io/badge/Figma-Design-orange)](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)
[![Feature-Sliced Design](https://img.shields.io/badge/style-feature--sliced-blue)](https://feature-sliced.design/)

TMDB API 기반 영화·TV 탐색 서비스입니다.  
단순 조회를 넘어서, **검색 / 무한 스크롤 / 모달 / 라우팅 / 스크롤 잠금** 같은 프론트엔드 핵심 기능을 라이브러리에 크게 의존하지 않고 직접 구현한 포트폴리오 프로젝트입니다.

## 한 줄 소개

**React 기본기와 브라우저 API를 다시 익히기 위해, 자주 쓰는 편의 라이브러리를 최소화하고 기능을 직접 설계한 영화 탐색 서비스**입니다.

완성된 디자인 시안 없이 시작한 프로젝트로, 초기 화면 설계와 사용자 흐름을 잡는 단계에서 AI를 보조적으로 활용했습니다. 이후 실제 서비스에 맞는 정보 구조, 인터랙션, 컴포넌트 설계와 구현은 직접 정리했습니다.

## 브랜치 · 배포

| 브랜치   | 역할                                | 배포                                                    |
| -------- | ----------------------------------- | ------------------------------------------------------- |
| `legacy` | Vite SPA 완성본 (동결)              | [GitHub Pages](https://swjeon-dev.github.io/Xflix--sw/) |
| `main`   | Next.js 마이그레이션 · cutover 작업 | Vercel 예정                                             |

Live Demo는 **Legacy(`legacy`)** 기준입니다. Next 배포 URL은 마이그레이션 후 추가합니다. Legacy vs Next 성능 비교는 `docs/performance-baseline.md`를 참고하세요.

## Demo

- [Live Demo](https://swjeon-dev.github.io/Xflix--sw/)
- [Figma](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)

### Home

영화 / TV 추천 섹션을 홈 화면에서 탐색할 수 있습니다.

[![Home](https://img.youtube.com/vi/n_8vgYt2KdM/maxresdefault.jpg)](https://youtu.be/n_8vgYt2KdM)

### Search Results

검색 결과 페이지에서 영화 / TV 탭을 나누어 확인하고, 스크롤에 따라 다음 페이지를 불러옵니다.

[![Search Result](https://img.youtube.com/vi/RFjKMFadLKE/maxresdefault.jpg)](https://youtu.be/RFjKMFadLKE)

### Detail Page

상세 페이지에서 콘텐츠 정보와 추천 콘텐츠를 함께 탐색할 수 있습니다.

[![Movie Detail Page](https://img.youtube.com/vi/9oWzFkbKLP0/maxresdefault.jpg)](https://youtu.be/9oWzFkbKLP0)

### Mobile UX

모바일 환경에서도 메뉴 및 모달 흐름이 자연스럽게 동작하도록 구성했습니다.

[![Mobile UX](https://img.youtube.com/vi/iF6piaEjP5o/maxresdefault.jpg)](https://youtu.be/iF6piaEjP5o)

---

## 프로젝트 개요

- **개발 형태**: 단독 프론트엔드 프로젝트
- **아키텍처**: Feature-Sliced Design (FSD Lite)
- **핵심 목표**: React 기본기만으로도 어디까지 안정적으로 기능을 구축할 수 있는지 검증
- **서비스 범위**: 홈, 영화/TV 목록·상세, 예고편 모달, 검색 모달, 검색 결과, 모바일 메뉴

Xflix는 "라이브러리를 안 쓰는 것이 정답"이라는 관점보다,  
**직접 만들어보며 왜 라이브러리가 필요한지도 체감해보자**는 방향으로 진행했습니다.

무한 스크롤, 서버 상태, body scroll lock, 검색 상태 동기화 같은 기능을 직접 구현하면서:

- React의 `state`, `effect`, `cleanup`, `ref` 흐름을 다시 익히고
- 브라우저 API(`IntersectionObserver`, `URLSearchParams`, `matchMedia`)를 직접 다뤄보고
- 동시에 React Query 같은 도구가 왜 필요한지도 더 구체적으로 이해하는 경험을 목표로 했습니다.

## 포트폴리오 포인트

- 외부 상태 관리 라이브러리 없이 **커스텀 훅 중심 데이터 흐름**을 설계했습니다.
- `IntersectionObserver` 기반 **가로 / 세로 무한 스크롤**을 공통 훅으로 구현했습니다.
- **검색 모달 + `/search?query=` 라우팅**으로 검색 상태를 URL과 연결했습니다.
- **Portal 모달 + body scroll lock + ESC 종료**까지 모달 UX를 직접 구성했습니다.
- **FSD Lite**로 `app / pages / widgets / features / entities / shared` 책임을 분리했습니다.

## 주요 기능

### 콘텐츠 탐색

- 홈에서 영화 / TV 추천 섹션 탐색
- 장르 기반 영화 / TV 목록 필터링
- 영화 상세 / TV 상세 페이지
- 비슷한 콘텐츠 · 추천 콘텐츠 탐색

### 검색

- Header 검색 모달 → `/search?query=...` 이동
- 검색 결과 페이지에서 **영화 / TV 탭** 분리
- 검색 결과 **무한 스크롤**

### 상세 인터랙션

- 영화 / TV 상세에서 예고편 모달 재생
- TV 시즌 에피소드 모달 탐색
- 모바일 메뉴 모달 및 body scroll lock

## Architecture — Feature-Sliced Design

프로젝트는 FSD를 규모에 맞게 적용한 **FSD Lite** 구조를 사용합니다.  
레이어는 위에서 아래로만 의존하며, 같은 레이어의 슬라이스끼리는 직접 import하지 않는 방향을 기준으로 잡았습니다.

```text
app → pages → widgets → features → entities → shared
```

| 레이어     | 역할                              | 이 프로젝트에서의 예시                                      |
| ---------- | --------------------------------- | ----------------------------------------------------------- |
| `app`      | 앱 진입, 라우터, Provider, loader | `AppRouter`, `RootLayout`, `GenreProvider`, `ModalProvider` |
| `pages`    | URL 단위 화면 조립                | `Home`, `MovieDetail`, `Search`                             |
| `widgets`  | 화면을 구성하는 큰 UI 블록        | `header`, `home`, `movie-detail`, `carousel`                |
| `features` | 사용자 액션 · 기능 단위           | `search`, `trailer`, `episodes`                             |
| `entities` | 비즈니스 도메인 모델              | `movie`, `tv`, `genre`, `media`                             |
| `shared`   | 공통 UI · API · 훅 · 유틸         | `Modal`, `useInfiniteScroll`, `tmdb` client                 |

### 디렉터리 구조

```text
src/
├── app/
│   ├── AppRouter.tsx
│   ├── providers/          # GenreProvider, ModalProvider
│   └── routes/             # RootLayout, rootLoader, router
├── pages/                  # Home, Movie, MovieDetail, TV, TVDetail, Search
├── widgets/
│   ├── header/             # AppHeader, 네비게이션
│   ├── home/               # 홈 히어로 · 섹션
│   ├── carousel/           # 영화 / TV 캐러셀
│   ├── genre-section/      # 장르 목록 · 필터
│   ├── movie-detail/
│   ├── tv-detail/
│   ├── mobile-nav/
│   └── footer/
├── features/
│   ├── search/             # api · model · ui (검색 모달 · 결과)
│   ├── trailer/            # 예고편 모달
│   └── episodes/           # TV 에피소드 카드 · 상태
├── entities/
│   ├── movie/              # api · model · ui (MovieCard)
│   ├── tv/
│   ├── genre/
│   └── media/              # 공통 infinite contents
└── shared/
    ├── api/tmdb/           # 공통 fetch · auth
    ├── config/
    ├── model/              # useInfiniteScroll, ModalContext …
    ├── ui/                 # Modal, Carousel, Dialog …
    ├── lib/
    └── types/
```

### 레이어별 책임 예시

- **`app`**: 앱 진입 시 장르를 `rootLoader`로 미리 불러오고, Provider로 전역 모달·장르 컨텍스트를 제공합니다.
- **`pages`**: 라우트에 맞는 widget / feature만 조합합니다. 데이터 fetch 세부사항은 알지 않습니다.
- **`widgets`**: 상세 히어로, 캐러셀, 장르 섹션처럼 화면 단위 블록을 담당합니다.
- **`features`**: 검색 submit → URL 동기화, 예고편 재생, 에피소드 선택처럼 **유저가 하는 일**을 묶습니다.
- **`entities`**: Movie / TV 타입, API, 카드 UI 등 도메인 단위 재사용 조각을 둡니다.
- **`shared`**: TMDB 클라이언트, 무한 스크롤 훅, Portal 모달처럼 도메인에 묶이지 않는 인프라를 둡니다.

## 직접 구현한 핵심 요소

### 1. API 계층 분리

TMDB 요청은 `shared/api/tmdb`에 모으고, endpoint·설정은 `shared/config`에서 관리합니다.  
UI는 "무엇을 가져올지"만 알고, "어떻게 요청할지"는 shared / entity API가 담당합니다.

### 2. 커스텀 훅 기반 데이터 패칭

대표 훅 예:

- `entities/media` — 목록 infinite fetch
- `entities/movie`, `entities/tv` — 상세 · 시즌
- `features/search` — `useSearch`, `useSearchQuery`
- `features/trailer` — `useGetVideo`

각 훅이 `loading / error / data` 흐름을 직접 관리하도록 구성했습니다.  
특히 `useSearch`는 query 유무, 탭 전환 시 초기화, 페이지 병합·중복 제거, 초기/추가 로딩 분리를 직접 처리합니다.

### 3. IntersectionObserver 무한 스크롤

`shared/model`의 공통 훅으로:

- 홈 캐러셀 **가로** 스크롤
- 목록 · 검색 결과 **세로** 스크롤

을 함께 처리합니다.

### 4. 모달 UX · 스크롤 잠금

Portal 기반 모달과 body scroll lock, ESC 종료를 검색 / 예고편 / 모바일 메뉴에 공통 정책으로 적용했습니다.

### 5. 라우트 단위 데이터 제어

- `rootLoader` — 앱 진입 시 장르 preload (`shouldRevalidate`로 재요청 최소화)
- 검색은 `/search?query=...`로 상태를 URL에 두고, 결과 페이지에서 movie / tv 탭을 분리합니다.

## 기술 스택

**Legacy (`legacy` 브랜치 · 현재 Live Demo)**

| 구분             | 스택                                                           |
| ---------------- | -------------------------------------------------------------- |
| Frontend         | React 18, TypeScript, Vite, React Router 7, React Helmet Async |
| Styling          | Tailwind CSS                                                   |
| Deploy / Tooling | GitHub Actions, GitHub Pages, ESLint, Husky                    |

Next.js · Vercel · (예정) Auth는 `main` 마이그레이션에서 도입합니다.

## 현재 라우트

| 경로                | 설명      |
| ------------------- | --------- |
| `/`                 | 홈        |
| `/movies`           | 영화 목록 |
| `/movies/:id`       | 영화 상세 |
| `/tv`               | TV 목록   |
| `/tv/:id`           | TV 상세   |
| `/search?query=...` | 검색 결과 |

## 실행 방법

```bash
cp .env.example .env
# .env에 VITE_TMDB_ACCESS_TOKEN 설정
npm install
npm run dev
```

```bash
npm run lint
npm run build
```

## 왜 라이브러리 사용을 최소화했는가

의도적으로 서버 상태 관리, 무한 스크롤, 모달/scroll-lock 유틸, 전역 상태 관리 라이브러리를 바로 도입하지 않았습니다.

1. **React를 다시 직접 써보기 위해** — 비동기 취소, observer 연결/해제, query 변경 시 초기화, scroll lock 복구 같은 세부 흐름을 몸으로 익히기 위함입니다.
2. **라이브러리의 필요성을 체감하기 위해** — 캐싱 부재, 중복 요청, 모달 정책 증가 비용을 직접 겪으며 React Query 등의 가치를 설득력 있게 이해할 수 있었습니다.

즉, "라이브러리를 배제한 프로젝트"라기보다 **라이브러리를 더 잘 이해하기 위해 한 번 돌아가 본 프로젝트**에 가깝습니다.

<!-- ## 더 보기

- 상세 설명 · 회고: `docs/portfolio.md`
- Next.js 마이그레이션: `docs/next-migration-checklist.md`
- Legacy 성능 baseline: `docs/performance-baseline.md`
- 이전 상세 README 보관본: `README.archive.md` -->
