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

## 포트폴리오 포인트

- **커스텀 훅 중심 데이터 흐름**으로 요청 상태를 직접 설계했습니다.
- **`IntersectionObserver` 기반 무한 스크롤**을 가로 / 세로 리스트에 공통 적용했습니다.
- **검색 모달 + `/search?query=` 라우팅**으로 검색 상태를 URL과 연결했습니다.
- **Portal 모달 + body scroll lock + ESC 종료**까지 모달 UX를 직접 구성했습니다.
- **FSD 리팩토링**으로 `app / pages / entities / features / widget / shared` 책임과 의존 방향을 정리했습니다.

## FSD 리팩토링 요약 (GitHub)

- `features/movies`를 `features/movie`로 단수화해 도메인 네이밍을 통일했습니다.
- TV 상세 전용 로직(`useGetTV`, `useGetSeason`, episodes UI)을 `widget/tv-detail`로 이관해 위젯 응집도를 높였습니다.
- `widget/media-list`를 `widget/media`로 통합해 목록/캐러셀 공통 컴포넌트 경로를 일원화했습니다.
- 홈 카테고리 설정을 `widget/home/config`로 이동해 홈 화면의 책임을 명확히 했습니다.
- `features/tv`는 API 중심 진입점으로 축소해 레이어 역할을 분리했습니다.

## 주요 기능

- 홈에서 영화 / TV 콘텐츠 탐색
- 영화 / TV 목록 및 상세 페이지
- 예고편 모달 재생
- 검색 모달 및 `/search?query=` 기반 검색 결과 페이지
- 영화 / TV 탭 분리 검색
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

<!-- ## 더 보기

- 상세 설명: `docs/portfolio.md`
- GitHub 상세 문서: `docs/README.readme.md`
- 포트폴리오/블로그용 문서: `docs/README.blog.md`
- 이전 상세 README 보관본: `README.archive.md` -->
