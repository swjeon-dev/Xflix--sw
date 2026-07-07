# 🎬 Xflix

[![Deploy](https://github.com/software92/Xflix--sw/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/swjeon-dev/Xflix--sw/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://swjeon-dev.github.io/Xflix--sw/)
[![Figma](https://img.shields.io/badge/Figma-Design-orange)](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)

TMDB API 기반 영화·TV 탐색 서비스입니다.  
홈, 목록, 상세, 검색, 예고편 모달까지 이어지는 탐색 흐름을 구현하면서, React의 기본기와 브라우저 API를 다시 익히는 데 초점을 맞춘 프로젝트입니다.

## 이 프로젝트를 시작한 이유

최근 프론트엔드 개발을 하면서 편리한 라이브러리에 익숙해졌다는 생각이 들었습니다.  
React Query, 모달 유틸리티, 무한 스크롤 라이브러리 같은 도구는 분명 생산성을 높여주지만, 어느 순간부터 "왜 이 라이브러리가 필요한지"보다 "그냥 익숙하니까 쓴다"에 가까워졌습니다.

그래서 Xflix는 의도적으로 다음 방향을 잡았습니다.

- 상태 관리 흐름은 최대한 React 기본 훅으로 풀어보기
- 무한 스크롤, 검색 상태, body scroll lock을 직접 구현해보기
- 불편하더라도 직접 부딪혀 보면서 설계 포인트를 다시 정리하기

목표는 "라이브러리를 쓰지 않겠다"가 아니라,  
**직접 구현한 뒤에야 라이브러리의 필요성을 더 정확히 설명할 수 있는 상태가 되자**는 것이었습니다.

## 프로젝트에서 구현한 사용자 흐름

### 1. 홈에서 콘텐츠 탐색

홈에서는 영화 / TV 콘텐츠를 섹션 단위로 보여줍니다.  
단순 정적 목록이 아니라, 스크롤 방향에 따라 다른 무한 스크롤 동작을 적용했습니다.

- 홈 캐러셀: 가로 방향 무한 스크롤
- 목록 페이지: 세로 방향 무한 스크롤

하나의 공통 훅으로 두 방향을 모두 처리하도록 설계했습니다.

### 2. 상세 페이지에서 예고편 보기

영화와 TV 상세 페이지에서는 예고편 모달을 띄울 수 있습니다.  
이 과정에서 포털 렌더링, ESC 종료, body scroll lock, 로딩 상태 처리까지 한 흐름으로 묶어 구현했습니다.

### 3. 검색 모달에서 결과 페이지로 이동

검색은 Header의 검색 버튼에서 시작합니다.

1. 검색 버튼 클릭
2. 검색 모달 오픈
3. 검색어 입력 후 submit
4. `/search?query=...`로 이동
5. 검색 결과 페이지에서 영화 / TV 탭 전환
6. 스크롤에 따라 다음 페이지 자동 요청

검색 결과는 `SEARCH_MULTI` endpoint를 사용했고, 페이지 내부에서 `movie` / `tv` 결과를 분리했습니다.

## 기술적으로 중요하게 본 포인트

### 1. API 호출 로직을 UI에서 분리하기

TMDB 요청은 `shared/api/tmdb` 아래에 모아 두고, endpoint는 `shared/config/api-config.ts`에서 관리했습니다.

이렇게 분리한 이유는 두 가지입니다.

- UI 컴포넌트가 요청 URL과 fetch 옵션 세부사항을 모르도록 하기 위해
- 재사용 가능한 요청 흐름을 만들기 위해

결과적으로 컴포넌트는 "어떤 데이터를 가져올지"만 알고,  
"어떻게 요청하는지"는 shared 레이어가 담당하게 만들었습니다.

### 2. 커스텀 훅으로 서버 상태를 직접 관리하기

이 프로젝트에서 사용한 대표 훅은 다음과 같습니다.

- `useGetContents`
- `useGetMovie`
- `useGetTmdbVideos`
- `useSearch`
- `useListInfiniteScroll`

특히 `useSearch`는 생각보다 구현 포인트가 많았습니다.

- query가 없을 때는 동작하지 않아야 함
- 탭(`movie` / `tv`)이 바뀌면 목록과 페이지를 초기화해야 함
- 다음 페이지를 가져올 때 기존 결과와 병합해야 함
- 중복 결과는 제거해야 함
- 초기 로딩과 추가 로딩 상태를 분리해야 함

이런 문제를 직접 다뤄보면서,  
React Query가 제공하는 캐싱·동기화·재시도·중복 요청 방지 기능이 왜 중요한지 더 실감할 수 있었습니다.

### 3. 무한 스크롤을 직접 구현하며 배운 점

`IntersectionObserver`를 사용한 무한 스크롤은 생각보다 단순하지 않았습니다.

- observer를 언제 연결하고 언제 해제할지
- 요청 중복을 어떻게 막을지
- 페이지가 바뀌었을 때 리스트를 어떻게 초기화할지
- 가로 스크롤과 세로 스크롤을 어떻게 공통화할지

이 프로젝트에서는 `shared/model/infinite-scroll.ts`에서 이 흐름을 하나의 훅으로 추상화했습니다.

직접 구현하면서 느낀 점은 명확했습니다.

- 학습 목적에는 좋다
- 하지만 실무에서는 검증된 라이브러리가 유지보수 비용을 많이 줄여준다

### 4. body scroll lock도 단순해 보이지만 정책이 필요하다

모달을 열면 뒤 배경이 스크롤되지 않아야 합니다.  
처음에는 각 모달에서 `document.body.style.overflow = 'hidden'`을 직접 처리했지만, 점점 중복이 생겼습니다.

그래서 `useBodyScrollLock` 훅으로 모았습니다.

- 검색 모달은 항상 잠금
- 모바일 메뉴는 특정 breakpoint 이하에서만 잠금

이 과정에서 "작아 보이는 UI 정책도 shared 레이어에서 관리할 필요가 있다"는 점을 다시 확인했습니다.

## 라이브러리를 최소화한 이유

이 README에서 가장 강조하고 싶은 부분입니다.

저는 이 프로젝트에서 라이브러리 사용을 줄인 이유를 단순히 "가볍게 만들기 위해서"라고 말하고 싶지 않습니다.  
오히려 더 중요한 이유는 **다시 직접 써보기 위해서**였습니다.

### 직접 써보니 다시 보였던 것

- `useEffect` cleanup이 왜 중요한지
- `ref`가 stale closure를 막는 데 왜 필요한지
- 브라우저 이벤트를 등록 / 해제하는 타이밍
- URL과 상태를 동기화할 때 생기는 비용
- 모달이나 검색처럼 "작아 보이는 기능"도 실제로는 상태 전이가 꽤 복잡하다는 점

### 직접 써보니 더 강하게 느껴진 것

- 서버 상태 캐싱은 직접 관리하기보다 라이브러리 도입이 더 낫다
- 검색 / 무한 스크롤은 중복 요청 제어가 중요하다
- 모달이 늘어날수록 전역 UX 정책 관리가 필요하다
- 라우팅과 데이터 흐름은 초기에 구조를 잘 잡아야 한다

결국 이 프로젝트는 "라이브러리를 배제한 프로젝트"라기보다,  
**라이브러리를 더 잘 이해하기 위해 한 번 돌아가 본 프로젝트**에 가깝습니다.

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
├── app/
│   └── routes/
├── pages/
├── entities/
│   ├── media/
│   ├── movie/
│   └── tv/
├── features/
│   ├── movies/
│   ├── search/
│   └── tv/
├── widget/
│   ├── featured-movie/
│   ├── genre-movies/
│   ├── genre-tv/
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

FSD를 엄격하게 전부 적용했다기보다,  
프로젝트 규모에 맞게 `app / pages / entities / features / widget / shared`의 책임을 명확히 나누는 방향으로 사용했습니다.

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

Xflix는 기능 수가 아주 많은 프로젝트는 아닙니다.  
대신 프론트엔드에서 자주 만나는 문제를 작게라도 직접 풀어본 프로젝트입니다.

이 프로젝트를 통해 얻은 가장 큰 수확은 두 가지입니다.

1. React 기본 훅과 브라우저 API를 연결하는 감각을 다시 익혔습니다.
2. 직접 구현의 한계를 경험하면서, 실무에서 왜 적절한 라이브러리 선택이 중요한지 더 설득력 있게 설명할 수 있게 됐습니다.

다음 단계에서는:

- React Query 도입
- 검색 endpoint 세분화
- 모달 정책 통합
- API 키 노출 구조 개선

같은 방향으로 확장해볼 계획입니다.
