# 🎬 Xflix

[![Deploy](https://github.com/software92/Xflix--sw/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/software92/Xflix--sw/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://software92.github.io/Xflix--sw/)
[![Figma](https://img.shields.io/badge/Figma-Design-orange)](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)

## 서비스 화면

### PC

|                                                                Home                                                                 |                                                               Detail                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| <img width="1548" height="983" alt="Image" src="https://github.com/user-attachments/assets/c7c26b7d-86ab-4482-b9a2-84dd5a815f55" /> | <img width="1548" height="983" alt="Image" src="https://github.com/user-attachments/assets/298ed612-984f-458c-ad05-305d79443281" /> |
|                                                             메인 페이지                                                             |                                                          영화 상세 페이지                                                           |

|                                                               Movies                                                                |                                                               Movies                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| <img width="1548" height="983" alt="Image" src="https://github.com/user-attachments/assets/298ed612-984f-458c-ad05-305d79443281" /> | <img width="1548" height="983" alt="Image" src="https://github.com/user-attachments/assets/6b1ed2fe-5548-421d-80fa-6b3da50923fa" /> |
|                                                          영화 목록 페이지                                                           |                                                       필터링한 영화 목록 출력                                                       |

### Mobile

|                                                                Home                                                                |                                                               Detail                                                               |                                                               Movies                                                               |                                                               Movies                                                               |
| :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
| <img width="285" height="642" alt="Image" src="https://github.com/user-attachments/assets/b86fb995-1f6f-482a-9148-fc12d891a471" /> | <img width="285" height="642" alt="Image" src="https://github.com/user-attachments/assets/c5056c44-f491-4f6a-acf0-2554d7a507fb" /> | <img width="285" height="642" alt="Image" src="https://github.com/user-attachments/assets/accc87bf-a956-4ee1-b522-c7c1c7c791f4" /> | <img width="285" height="642" alt="Image" src="https://github.com/user-attachments/assets/c1f1afb5-0ae5-437c-8591-3ad3f62760ab" /> |
|                                                            메인 페이지                                                             |                                                          영화 상세 페이지                                                          |                                                          영화 목록 페이지                                                          |                                                         Mobile menu modal                                                          |

## 1. 프로젝트 소개

Xflix는 TMDB API를 활용한 영화 정보 제공 웹 애플리케이션입니다.

단순한 영화 목록 조회를 넘어,
사용자가 원하는 콘텐츠를 빠르게 탐색할 수 있도록
장르 기반 필터링과 직관적인 UI 구조 설계에 초점을 맞춰 개발했습니다.

프로젝트 규모에 맞게 외부 라이브러리 사용을 최소화하고,
데이터 요청 및 상태 관리를 직접 구현하여 React의 기본 원리를 깊이 이해하는 데 집중했습니다.

## 2. 주요 기능

- 영화 목록 및 상세 페이지 조회
- 장르 기반 영화 필터링
- 반응형 UI (PC / Mobile 지원)
- GitHub Actions 기반 CI/CD 자동 배포

## 3. 기술 스택

- React
- TypeScript
- Vite
- TailwindCSS
- GitHub Actions

## 4. 기술 개선 및 설계

### 4.1 프로젝트 환경 구성 (Vite + TypeScript)

React + Vite 기반으로 개발 환경을 구성하고
TypeScript를 도입하여 API 응답 데이터의 타입 안정성을 확보했습니다.

- 빠른 빌드 속도 및 개발 생산성 향상
- 정적 타입 기반 안정적인 데이터 처리

### 4.2 API 모듈 분리 및 데이터 관리 구조 설계

TMDB API 호출 로직을 별도의 모듈로 분리하여
데이터 처리 로직과 UI를 분리했습니다.

- API 로직 재사용성 향상
- 유지보수 용이성 확보
- 환경 변수를 통한 API 키 관리

### 4.3 반응형 UI 및 컴포넌트 구조 설계

디바이스 크기에 따라 레이아웃이 자연스럽게 변경되도록 설계하고 공통 컴포넌트를 분리해서 UI 일관성을 유지했습니다.

- 다양한 디바이스 환경 대응
- 재사용 가능한 컴포넌트 구조 설계

### 4.4 배포 자동화 (GitHub Actions)

GitHub Actions를 활용하여
main 브랜치 push 시 자동으로 빌드 및 배포가 이루어지도록 구성했습니다.
(README.md만 변경한 경우 제외)

- 배포 자동화
- 개발 → 배포 프로세스 간소화

## 5. 기술 선택 이유

**TypeScript**

API 응답 데이터의 타입을 명확히 정의하여
런타임 오류를 줄이고 안정적인 데이터 처리를 위해 사용했습니다.

**Vite**

빠른 개발 서버와 빌드 속도를 통해
개발 생산성을 높이기 위해 선택했습니다.

**TailwindCSS**

유틸리티 기반 스타일링으로
일관된 UI를 빠르게 구성하기 위해 사용했습니다.

**GitHub Actions**

반복적인 배포 작업을 자동화하여
개발 효율성을 높이기 위해 도입했습니다.

## 6. 사용자 경험 개선 포인트

### 6.1 장르 기반 탐색 UX 개선

사용자가 원하는 영화를 빠르게 찾을 수 있도록
장르 필터링 기능을 제공했습니다.

- 콘텐츠 탐색 시간 감소
- 사용자 중심 UI 개선

### 6.2 반응형 UI 설계

PC와 모바일 환경에서 모두 자연스럽게 동작하도록
레이아웃을 설계했습니다.

- 다양한 디바이스 환경 대응
- 일관된 사용자 경험 제공

### 6.3 직관적인 상세 페이지 구성

영화 정보를 한눈에 확인할 수 있도록
상세 페이지 UI를 구성했습니다.

- 정보 전달력 강화
- 사용자 이해도 향상

## 7. 내가 담당한 역할

- 전체 프론트엔드 개발 (단독 프로젝트)
- UI 설계 및 사용자 인터랙션 구현
- API 연동 및 데이터 처리 구조 설계
- 반응형 UI 구현
- 배포 자동화 구성 (GitHub Actions)

## 8. 핵심 구현 - 커스텀 훅 기반 데이터 관리

```typescript
// hooks/useMovies.ts
import { useEffect, useState } from 'react'
import { IMovie } from '../../types/movie'
import { getMovie } from '../../api/tmDBService'

interface IFetchingDataReturn {
  error: string | null
  isLoading: boolean
  movie: IMovie | null
}

function useGetMovie(
  id: number | string,
  queryParams: { [key: string]: string },
): IFetchingDataReturn {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [movie, setMovie] = useState<IMovie | null>(null)

  useEffect(() => {
    if (!id) return setIsLoading(false)

    async function fetchMovie(id: string | number) {
      const result = await getMovie(id, queryParams)

      setMovie(result.data)
      setIsLoading(false)
      setError(result.error)
    }
    fetchMovie(id)
  }, [id])

  return { error, isLoading, movie }
}

export default useGetMovie
```

- API 호출 로직을 커스텀 훅으로 분리해서 **UI와 비즈니스 로직을 분리**했습니다.
- loading / error 상태를 함께 관리해서 **사용자 경험을 고려한 상태 처리**를 구현했습니다.
- 다양한 query parameter를 기반으로 재사용 가능하도록 설계해서 **확장성과 유지보수성을 고려**했습니다.

## 9. 아쉬운 점 및 개선 방향

- 서버 프록시 도입을 통한 API 키 보안 강화
- React Query 도입을 통한 서버 상태 캐싱 및 데이터 관리 개선
- Skeleton UI 적용을 통한 로딩 UX 개선
- 무한 스크롤 또는 페이지네이션 도입으로 탐색 경험 향상

## 10. 실행 방법

```bash
npm install
npm run dev
```

## 11. 프로젝트 구조 (FSD Lite)

[Feature-Sliced Design](https://feature-sliced.design/)을 참고해, 서비스 규모에 맞게 **app · pages · features · widget · shared** 레이어를 사용합니다.

### 디렉터리 구조

```text
src/
├── app/                      # 앱 셸: 라우터, Provider, 전역 loader
│   ├── AppRouter.tsx
│   └── routes/
├── pages/                    # 라우트 페이지 (조립·데이터 연결)
│   ├── home.tsx
│   ├── genre-movies.tsx
│   ├── movie-detail.tsx
│   └── error-page.tsx
├── widget/                   # 화면 단위 UI 블록 (model + ui)
│   ├── featured-movie/
│   ├── genre-movies/         # 장르 필터 + 목록 캐러셀
│   └── movie-detail/
│       ├── model/            # 상세 표시용 데이터 가공
│       └── ui/               # hero, overview, backdrop …
├── features/
│   └── movies/               # 영화 도메인 (API, hooks, 공용 컴포넌트)
│       ├── api/
│       ├── components/       # contents-list, content-row
│       ├── constants/
│       ├── hooks/
│       ├── types/
│       └── utils/            # getTmdbImgPath
└── shared/                   # 도메인 무관 공용 모듈
    ├── assets/
    ├── components/{layout,ui}/
    ├── constants/
    ├── hooks/
    └── utils/
```

### 레이어 역할

| 레이어 | 역할 | 예시 |
|--------|------|------|
| **app** | 라우팅·전역 설정 | `router.tsx`, `rootLoader.ts` |
| **pages** | URL ↔ 화면 조립, Helmet, 데이터 훅 연결 | `movie-detail.tsx` |
| **widget** | 큰 UI 블록 + 표시용 model | `movie-detail-hero`, `get-featured-movie` |
| **features** | 도메인 API·타입·재사용 컴포넌트 | `useGetMovie`, `contents-list` |
| **shared** | 앱 전역 UI·유틸 | `Header`, `Modal`, `AdultUI`, `ImageLazyLoadUI` |

### import 규칙

```text
app, pages   →  widget, features, shared  ✅
widget       →  features, shared         ✅
features     →  shared                    ✅
shared       →  features, widget          ❌
widget A     →  widget B                  ❌
```

### import 예시

```ts
// pages
import { MovieDetailSection } from '@/widget/movie-detail'
import { FeaturedMovie } from '@/widget/featured-movie'
import { GenreFilter, GenreMoviesList } from '@/widget/genre-movies'
import useGetMovie from '@/features/movies/hooks/useGetMovie'

// widget
import type { IMovie } from '@/features/movies/types'
import ImageLazyLoadUI from '@/shared/components/ui/ImageLazyLoadUI'
```

### Path alias

`@/` → `src/` (`vite.config.ts`, `tsconfig.app.json`)
