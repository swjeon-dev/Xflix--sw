# 🎬 Xflix

[![Deploy](https://github.com/swjeon-dev/Xflix--sw/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/swjeon-dev/Xflix--sw/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://swjeon-dev.github.io/Xflix--sw/)
[![Figma](https://img.shields.io/badge/Figma-Design-orange)](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)

TMDB API 기반 영화·TV 탐색 서비스입니다.  
홈, 목록, 상세, 검색, 예고편 모달까지 이어지는 탐색 흐름을 구현하면서, React의 기본기와 브라우저 API를 다시 익히는 데 초점을 맞춘 프로젝트입니다.

## 이 프로젝트를 시작한 이유

최근 프론트엔드 개발을 하면서 편리한 라이브러리에 익숙해졌다는 생각이 들었습니다.  
React Query, 모달 유틸리티, 무한 스크롤 라이브러리는 분명 생산성을 높여주지만, 어느 순간 "왜 이 라이브러리가 필요한지"보다 "그냥 익숙하니까 쓴다"에 가까워졌습니다.

그래서 Xflix는 의도적으로 다음 방향을 잡았습니다.

- 상태 관리 흐름은 최대한 React 기본 훅으로 풀어보기
- 무한 스크롤, 검색 상태, body scroll lock을 직접 구현해보기
- 구조가 커질수록 **어디에 코드를 둘지** 기준을 스스로 정하기

목표는 "라이브러리를 쓰지 않겠다"가 아니라,  
**직접 구현한 뒤에야 라이브러리와 아키텍처 선택을 더 정확히 설명할 수 있는 상태**가 되자는 것이었습니다.

## 프로젝트에서 구현한 사용자 흐름

### 1. 홈에서 콘텐츠 탐색

Featured 영화 한 편과, 영화 / TV 추천 캐러셀을 섹션 단위로 보여줍니다.  
홈 캐러셀은 가로 무한 스크롤, 목록 페이지는 세로 무한 스크롤로 동작이 다르지만, `useListInfiniteScroll` 하나로 공통화했습니다.

### 2. 장르 목록 탐색

처음에는 movie 목록 / tv 목록 페이지와 feature가 나뉘어 있었습니다.  
지금은 `content-list` 페이지 하나에 `type`만 넘기고, `widget/genre`로 장르 탭을 붙이는 형태로 통합했습니다.  
앱 진입 시 `rootLoader`가 장르를 미리 불러와 목록 첫 화면에서의 대기 시간을 줄였습니다.

### 3. 상세 페이지 — 영화와 TV의 차이

**영화 상세**는 정보 + 예고편 + 유사·추천 캐러셀이 중심입니다.

**TV 상세**는 여기에 **시즌·에피소드**가 더해집니다.  
에피소드 목록은 TV 상세에서만 쓰이므로, 별도 feature로 두기보다 `widget/tv-detail` 안에 모았습니다.  
「재사용 가능한 사용자 행위」가 아니라 「상세 화면의 한 섹션」에 가깝다고 판단했기 때문입니다.

### 4. 검색

검색 모달 → `/search?query=...` → 결과 탭(movie / tv) → 무한 스크롤.  
`searchListLoader`로 query 없는 URL 접근은 막았고, 페이지는 얇게 두고 `SearchListSection`이 검색 로직을 담당합니다.

### 5. 모바일

메뉴·검색·예고편·에피소드 모달에서 스크롤 잠금과 ESC 종료를 같은 패턴으로 맞췄습니다.

## 기술적으로 중요하게 본 포인트

### 1. API 호출 로직을 UI에서 분리하기

TMDB 요청은 `shared/api/tmdb`, endpoint는 `shared/config/api-config.ts`에서 관리합니다.  
도메인별 `getMovie` / `getTV` / `getSeason`은 `entities/*/api`에 두고, 화면은 widget model 훅을 통해 소비합니다.

### 2. 커스텀 훅으로 서버 상태를 직접 관리하기

- `useGetContents`, `useListInfiniteScroll` — 공통
- `useGetMovie`, `useGetTV`, `useGetSeason` — 상세 widget
- `useSearch` — 검색 feature

`useSearch`는 query 유무, 탭 전환 시 초기화, 페이지 병합·중복 제거, 초기/추가 로딩 분리까지 직접 다뤄야 해서, React Query가 왜 필요한지 체감하기 좋은 구간이었습니다.

### 3. 무한 스크롤

`IntersectionObserver`의 연결/해제 타이밍, 중복 요청 방지, 가로·세로 공통화를 `shared/model/infinite-scroll.ts`에 모았습니다.

### 4. body scroll lock

모달마다 `overflow: hidden`을 반복하다가 `useBodyScrollLock`으로 정책을 shared에 올렸습니다.

## FSD를 어떻게 적용했는가

FSD를 처음부터 완벽하게 맞추기보다, **코드를 둘 때마다 같은 질문을 반복**하는 방식으로 썼습니다.

1. 이건 **URL 화면**인가? → `pages`
2. 이건 **비즈니스 객체의 모양**인가? → `entities`
3. 이건 **사용자가 하는 일**인가, **특정 화면 블록**인가? → `features` vs `widget`
4. 이건 **어디서나 쓰는 공통**인가? → `shared`

### features에 둔 것

- **검색 (`features/search`)**: 모달, 결과, 탭, `useSearch` — 「검색한다」는 **행위**가 분명함

### entity API는 `entities`에

`getMovie`, `getTV`, `getSeason`은 **엔티티를 읽는 API**라 `entities/movie/api`, `entities/tv/api`로 옮겼습니다.  
`features`에는 **`search`만** 남겨, feature = 사용자 행위라는 기준과 맞췄습니다.

### widget에 둔 것

- **home, featured-movie**: 홈 화면 블록
- **media**: movie/tv 공통 캐러셀·목록
- **genre**: 장르 탭·discover 파라미터
- **movie-detail / tv-detail**: 상세 화면 전체(훅 + UI). TV는 `ui/episodes` 포함

### pages는 얇게

`home`, `content-list`, `detail`, `search-list`는 위젯·feature를 **조립만** 합니다.  
비즈니스 로직이 pages에 쌓이지 않도록 의도했습니다.

### widget끼리 import — home이 carousel을 쓰는 것

문서에 「widget 가로 import 지양」이라고만 쓰면, `home-ui`가 `@/widget/media`의 `ContentsCarousel`을 쓰는 것과 모순처럼 보일 수 있습니다.

구분은 이렇게 잡았습니다.

- **지양**: 다른 widget의 **설정·비즈니스 로직** (예: 홈이 `movie-detail` config를 가져오기)
- **허용**: **공통 UI 블록** 조합 (홈·상세가 `media` 캐러셀 재사용)

홈 카테고리는 `widget/home/config`에 두고, 캐러셀 UI는 `widget/media`에 두는 식으로 **설정 소유권**과 **presentation 공유**를 나눴습니다.

### 예전 `components` / `hooks` / `pages` 구조와 비교

예전처럼 기술 종류별 폴더만 있으면, `hooks/useSomething.ts`만 보고는 **어느 화면 훅인지** 바로 안 들어왔습니다.

지금은 `widget/tv-detail/ui/episodes`, `features/search/model`처럼 **경로가 역할을 말해 주어**, 파일을 열기 전에도 대략적인 목적을 예측할 수 있습니다.  
유지보수할 때 「검색 로직은 search 슬라이스」「TV 에피소드는 tv-detail」처럼 범위를 좁히기 쉬웠습니다.

### 리팩토링하며 바뀐 생각

초기에는 movie/tv feature 안에 목록 UI, 홈 설정, 상세 훅이 함께 있었습니다.  
기능이 늘수록 import 방향이 꼬이고, 「이건 feature가 맞나?」가 불명확해졌습니다.

그래서 다음처럼 옮겼습니다.

- 목록·캐러셀 → `widget/media`
- 홈 카테고리 상수 → `widget/home/config`
- TV 에피소드 → `widget/tv-detail`
- movie/tv API → `entities/*/api`, `features`에는 `search`만

**「행위(feature)」와 「화면 조각(widget)」을 구분하는 기준**이 문서로 남을 수 있게 된 계기입니다.

## 라이브러리를 최소화한 이유

가볍게 만들기 위해서가 아니라, **다시 직접 써보기 위해서**였습니다.

직접 써 보니 `useEffect` cleanup, `ref`, URL 동기화 비용, 작아 보이는 모달의 상태 전이가 다시 보였습니다.  
동시에 캐싱·중복 요청 제어·모달 정책 통합은 라이브러리가 더 낫다는 것도 분명해졌습니다.

성능 벤치마크는 넣지 않았습니다. 이 프로젝트의 목표가 **체감 속도 경쟁**이 아니라 **구현과 구조 이해**였기 때문입니다.

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

- ESLint
- GitHub Actions

## 디렉터리 구조

```text
src/
├── app/routes/
├── pages/
├── entities/
│   ├── movie/{api,types}/
│   ├── tv/{api,types}/
│   └── media/{types,lib}/
├── features/
│   └── search/
├── widget/
│   ├── featured-movie/
│   ├── genre/
│   ├── home/
│   ├── media/
│   ├── movie-detail/
│   └── tv-detail/
└── shared/
```

## 현재 제공하는 라우트

- `/`
- `/movies`
- `/movies/:id`
- `/tv`
- `/tv/:id`
- `/search?query=...`

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

Xflix는 기능 수가 많은 프로젝트는 아닙니다.  
대신 검색, 무한 스크롤, 모달, FSD 경계 정리를 **직접 손으로** 다뤄본 프로젝트입니다.

가장 큰 수확은 두 가지였습니다.

1. React·브라우저 API를 다시 연결하는 감각
2. **코드를 어디에 둘지**에 대한 나만의 기준 (feature vs widget vs shared)

다음 단계에서는 React Query 도입, 검색 endpoint 세분화, 모달 정책 통합, API 키 노출 구조 개선을 검토할 계획입니다.
