# 🎬 Xflix

[![Deploy](https://github.com/swjeon-dev/Xflix--sw/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/swjeon-dev/Xflix--sw/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://swjeon-dev.github.io/Xflix--sw/)
[![Figma](https://img.shields.io/badge/Figma-Design-orange)](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)

TMDB API 기반 영화·TV 탐색 서비스입니다.  
단순 조회를 넘어서, **검색 / 무한 스크롤 / 모달 / 라우팅 / 스크롤 잠금** 같은 프론트엔드 핵심 기능을 라이브러리에 크게 의존하지 않고 직접 구현한 포트폴리오 프로젝트입니다.

## 한 줄 소개

**React 기본기와 브라우저 API를 다시 익히기 위해, 자주 쓰는 편의 라이브러리를 최소화하고 기능을 직접 설계한 영화 탐색 서비스**입니다.

완성된 디자인 시안 없이 시작한 프로젝트로, 초기 화면 설계와 사용자 흐름을 잡는 과정에서 AI를 보조적으로 활용했습니다. 이후 실제 서비스에 맞는 정보 구조, 인터랙션, 컴포넌트 설계와 구현은 직접 정리했습니다.

## Demo

- [Live Demo](https://swjeon-dev.github.io/Xflix--sw/)
- [Figma](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)

### Home

Featured 영화와 영화 / TV 추천 캐러셀을 홈에서 탐색할 수 있습니다.

[![Home](https://img.youtube.com/vi/n_8vgYt2KdM/maxresdefault.jpg)](https://youtu.be/n_8vgYt2KdM)

### Search Results

검색 결과 페이지에서 영화 / TV 탭을 나누어 확인하고, 스크롤에 따라 다음 페이지를 불러옵니다.

[![Search Result](https://img.youtube.com/vi/RFjKMFadLKE/maxresdefault.jpg)](https://youtu.be/RFjKMFadLKE)

### Detail Page

상세 페이지에서 콘텐츠 정보, 추천 콘텐츠, TV 시즌·에피소드를 탐색할 수 있습니다.

[![Movie Detail Page](https://img.youtube.com/vi/9oWzFkbKLP0/maxresdefault.jpg)](https://youtu.be/9oWzFkbKLP0)

[![TV Detail Page](https://img.youtube.com/vi/10UZRu43_Fc/maxresdefault.jpg)](https://youtu.be/10UZRu43_Fc)

### Mobile UX

모바일 환경에서도 메뉴 및 모달 흐름이 자연스럽게 동작하도록 구성했습니다.

[![Mobile UX](https://img.youtube.com/vi/iF6piaEjP5o/maxresdefault.jpg)](https://youtu.be/iF6piaEjP5o)

## 포트폴리오 포인트

- **커스텀 훅 중심 데이터 흐름**으로 요청 상태를 직접 설계했습니다.
- **`IntersectionObserver` 기반 무한 스크롤**을 가로 / 세로 리스트에 공통 적용했습니다.
- **검색 모달 + `/search?query=` 라우팅**과 `searchListLoader`로 검색 상태를 URL과 연결했습니다.
- **Portal 모달 + body scroll lock + ESC 종료**까지 모달 UX를 직접 구성했습니다.
- **FSD Lite**로 레이어별 책임을 나누고, 화면·기능·도메인 경계를 정리했습니다.

## FSD 구조 — 레이어를 나눈 기준

FSD를 교과서 그대로 적용하기보다, **「이 코드가 어디에 속하는지」를 판단하는 기준**을 먼저 정했습니다.

| 레이어 | 넣는 기준 | 이 프로젝트 예시 |
|--------|-----------|------------------|
| `app` | 라우터·전역 loader 등 앱 진입 | `router.tsx`, `rootLoader`, `searchListLoader` |
| `pages` | URL 단위 화면 조립만 | `home`, `content-list`, `detail`, `search-list` |
| `entities` | 도메인 타입·엔티티 API | `IMovie`, `getMovie`, `getTV`, `getSeason` |
| `features` | **사용자 행위**가 분명한 흐름 | `search`만 (검색·탭·무한 스크롤) |
| `widget` | 특정 화면을 구성하는 **UI 블록** | `home`, `media`, `genre`, `movie-detail`, `tv-detail` |
| `shared` | 도메인과 무관한 공통 모듈 | `tmdbFetch`, `Modal`, `useListInfiniteScroll` |

**의존 방향**: `pages → widget / features → entities / shared` (상위가 하위를 import).

**entity API**  
`getMovie`, `getTV`, `getSeason`은 `entities/movie/api`, `entities/tv/api`에 두었습니다.  
**`features`에는 `search`만** — 사용자 행위가 드러나는 슬라이스만 feature로 유지합니다.

**widget 간 import**  
다른 widget의 **설정·비즈니스 로직**을 가져오는 것은 지양했습니다(예: 홈 카테고리를 `widget/home/config`에 소유).  
반면 `home` → `widget/media`의 `ContentsCarousel`처럼 **공통 UI 조합**은 허용했습니다. presentation 공유와 설정 공유를 구분한 선택입니다.

**기존 `components` / `hooks` / `pages` 구조 대비**  
역할이 경로에 드러나 `widget/tv-detail/ui/episodes`처럼 **파일 위치만으로 목적을 예측**하기 쉬워졌고, 수정 시 추적 범위를 좁히기 좋았습니다.

**판단 예시**

- 검색은 `features/search` — **「검색한다」**는 행위 자체가 기능.
- TV 에피소드 목록·모달은 `widget/tv-detail` — TV 상세 **화면 전용** UI.
- 영화·TV 목록/캐러셀은 `widget/media` — movie/tv 공통 presentation.
- `useGetMovie`, `useGetTV`는 `widget/*-detail/model` — 해당 상세 화면 전용 로딩.

## 리팩토링으로 정리한 점

- `features/movie`, `features/tv` API → `entities/*/api`로 이동
- `features`에는 `search`만 유지
- `widget/media-list` → `widget/media` 통합
- 홈 카테고리 → `widget/home/config`
- TV 상세·에피소드 → `widget/tv-detail`

## 주요 기능

- 홈 Featured 영화 및 영화 / TV 캐러셀
- 장르 필터가 있는 영화 / TV 목록 (`content-list` 단일 페이지)
- 영화 / TV 상세, 예고편 모달, TV 시즌·에피소드 탐색
- 검색 모달 및 `/search?query=` 기반 검색 결과 페이지
- React Router loader (`rootLoader` 장르 preload, `searchListLoader` query 보호)
- `IntersectionObserver` 기반 무한 스크롤
- 모바일 메뉴 모달 및 body scroll lock

## 기술 스택

- React
- TypeScript
- Vite
- React Router 7
- React Helmet Async
- Tailwind CSS
- GitHub Actions
- ESLint

## 실행 방법

```bash
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token
npm install
npm run dev
```

## 더 보기

- 포트폴리오 상세: [`docs/portfolio.md`](docs/portfolio.md)
