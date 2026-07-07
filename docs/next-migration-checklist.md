# Next.js 마이그레이션 체크리스트

> **Legacy:** [Xflix--sw](https://github.com/swjeon-dev/Xflix--sw) — Vite SPA, GitHub Pages  
> **Next:** [xflix-next](https://github.com/swjeon-dev/xflix-next) — App Router, Vercel  
> **목적:** 영화·TV **조회 위주** 서비스 — **SSR로 페칭·초기 로딩·SEO 개선**, hook·브라우저 API는 **CSR**  
> **전환 방식:** `Xflix--sw` **클론 → remote를 xflix-next로 변경 → Vite 제거·Next 설정** (파일 복사보다 누락 적음)

---

## 아키텍처 원칙

| 구분 | 담당 | 예 |
|------|------|-----|
| **Server** | TMDB 페칭, `generateMetadata`, redirect | layout 장르, 상세 movie/tv, search 1페이지 |
| **Client** | hook, 브라우저 API, 모달, YouTube, infinite scroll 2페이지~ | Modal, Carousel hover, `useSearch` load-more |

```
app/movies/[id]/page.tsx     ← Server (fetch + metadata)
  └─ MovieDetailView         ← Client (modal, trailer, carousel load-more)
```

---

## Phase 0. 사전 결정

- [x] **Next 레포:** https://github.com/swjeon-dev/xflix-next
- [x] **Legacy 레포 유지:** https://github.com/swjeon-dev/Xflix--sw (GitHub Pages A/B)
- [ ] **배포:** Vercel (`xflix-next`)
- [x] **1차 목표:** 조회 SSR + 인터랙션 CSR (하이브리드)
- [ ] **Legacy baseline commit 기록:** `cbfeaae` (또는 `main` merge 후 최종 commit)
- [ ] **Lighthouse baseline:** [`docs/performance-baseline.md`](./performance-baseline.md) 작성
- [ ] **Node 20** (Legacy CI와 동일)

### SSR 우선순위 (페칭 전환)

1. [ ] layout — 장르 (`rootLoader` 대체)
2. [ ] `/movies/[id]`, `/tv/[id]` — 상세 + `generateMetadata`
3. [ ] `/` — featured + carousel 1페이지
4. [ ] `/movies`, `/tv`, `/search` — discover/search **1페이지** (2페이지~는 client)

### CSR 확정 (변경 없음)

- Modal, YouTube, `useBodyScrollLock`, `useGetScrollY`
- `useListInfiniteScroll`, `useSearch` (추가 페이지)
- `useEpisode`, Carousel interaction, GenreFilter UI

### Phase 6 (마이그레이션 후)

- [ ] 로그인 + 마이페이지 (`middleware.ts`, `features/auth`)
- [ ] TMDB Route Handler (토큰 서버 전용)

---

## Phase 1. 레포 준비 (클론 → xflix-next)

Legacy **baseline 고정** 후 진행.

```bash
git clone https://github.com/swjeon-dev/Xflix--sw.git xflix-next
cd xflix-next
git remote set-url origin https://github.com/swjeon-dev/xflix-next.git
git checkout -b next-migration   # 또는 main
git push -u origin next-migration
```

- [ ] Legacy `feat/fetch-normalization-get-movie` (또는 `main`) 기준 클론
- [ ] `xflix-next` remote push
- [ ] Legacy 레포는 **추가 리팩터 freeze** (A/B 왜곡 방지)

### FSD ↔ Next 네이밍 (클론 직후 rename)

| 현재 (Vite) | Next 전환 후 |
|-------------|--------------|
| `src/app/` (FSD — providers, routes) | `src/application/` 또는 `src/providers/` |
| `src/pages/` (FSD pages) | `src/views/` |
| _(신규)_ | `src/app/` — **Next App Router 전용** |

---

## Phase 2. Next 도입 & Vite 제거

`create-next-app` 빈 프로젝트 대신, **Next 패키지 추가 + Vite 잔재 제거**.

### 추가

- [ ] `next`, `react`, `react-dom` (Next 권장 버전)
- [ ] `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx` (초기 shell)
- [ ] `clsx`, `tailwind-merge`, `@types/youtube` (기존 유지)

### 제거

- [ ] `vite`, `@vitejs/plugin-react`
- [ ] `react-router`, `react-helmet-async`
- [ ] `vite.config.ts`, `index.html`, `src/main.tsx`
- [ ] `src/app/AppRouter.tsx`, `src/app/routes/router.tsx`
- [ ] `src/vite-env.d.ts`

### 설정

- [ ] `tsconfig` — `@/*` → `src/*` 유지
- [ ] Tailwind / PostCSS — Next용으로 정리
- [ ] ESLint slice deep import 규칙 유지
- [ ] `.env.local` / `.env.example` (아래 env 섹션)

---

## Phase 3. 라우팅 매핑

| React Router | Next App Router |
|--------------|-----------------|
| `/` | `app/(main)/page.tsx` |
| `/movies` | `app/(main)/movies/page.tsx` |
| `/movies/:id` | `app/(main)/movies/[id]/page.tsx` |
| `/tv` | `app/(main)/tv/page.tsx` |
| `/tv/:id` | `app/(main)/tv/[id]/page.tsx` |
| `/search?query=` | `app/(main)/search/page.tsx` |
| `errorElement` | `app/error.tsx` |
| `HydrateFallback` | `app/loading.tsx` |

### `react-router` 교체 (~20파일)

- [ ] `Link` → `next/link` (`to` → `href`)
- [ ] `useNavigate` → `useRouter`
- [ ] `useParams` / `useSearchParams` / `usePathname` → `next/navigation`
- [ ] `useRouteLoaderData` → layout server fetch + props
- [ ] `GlobalModalContainer` — `useLocation` → `usePathname`

---

## Phase 4. Layout & Provider

```
src/app/layout.tsx              ← metadata, html/body
src/app/providers.tsx           ← 'use client': ModalProvider, GenreProvider
src/app/(main)/layout.tsx         ← Header, Footer, GlobalModalContainer
```

- [ ] Helmet `titleTemplate` → `metadata.title.template`
- [ ] `rootLoader` → async layout fetch → `GenreProvider` props
- [ ] `searchListLoader` redirect → `search/page.tsx` server `redirect('/')`

---

## Phase 5. SSR 페칭 전환

### API

| Legacy | Next |
|--------|------|
| `VITE_TMDB_ACCESS_TOKEN` (client) | `TMDB_ACCESS_TOKEN` (server) |
| `tmdbFetch` from browser | Route Handler `app/api/tmdb/[...path]/route.ts` + server fetch |

- [ ] Route Handler 프록시 (SSR 전제)
- [ ] `entities/*/api` — server용 fetch 함수 분리
- [ ] client hook — **추가 로드·interaction만** (또는 점진 제거)

### 페이지별

- [ ] **layout** — `getGenres`, `apiValidCheck`
- [ ] **`/movies/[id]`** — `getMovie` + `generateMetadata`
- [ ] **`/tv/[id]`** — `getTV` + `generateMetadata`
- [ ] **`/`** — featured, carousel page 1
- [ ] **`/movies`, `/tv`** — discover page 1
- [ ] **`/search`** — search page 1 + metadata

---

## Phase 6. `'use client'` 경계

| 영역 | 파일 |
|------|------|
| Modal | `DialogWrapper`, `ModalProvider`, `GlobalModalContainer` |
| YouTube | `YoutubePlayer`, `useYoutubePlayer`, `TrailerBackground` |
| Scroll / IO | `useGetScrollY`, `useBodyScrollLock`, `useListInfiniteScroll`, `useSearch` |
| 기타 | `useEpisode`, `Carousel`, `GenreFilter`, Header/Nav |

- [ ] Server Component에서 client hook import 금지 트리 점검
- [ ] SVG (`logo.svg`) — `@svgr/webpack` 또는 static file

---

## Phase 7. 기능 parity QA

- [ ] Home, Movie/TV list, Detail, Search
- [ ] 모달 4종 + route change close
- [ ] 무한 스크롤 2페이지~
- [ ] TMDB error / Adult UI / 이미지 URL

---

## Phase 8. 배포 & 성능 A/B

- [ ] Vercel — `xflix-next` 연결
- [ ] Secrets: `TMDB_ACCESS_TOKEN` (서버), preview URL
- [ ] [`docs/performance-baseline.md`](./performance-baseline.md) Next 열 작성
- [ ] Legacy vs Next 동일 페이지 Lighthouse 비교

| URL | 용도 |
|-----|------|
| https://swjeon-dev.github.io/Xflix--sw/ | Legacy |
| _(Vercel URL)_ | Next |

---

## Phase 9. 로그인 & 마이페이지

SSR·Route Handler 안정화 **이후**.

- [ ] `middleware.ts` — protected `/mypage`
- [ ] `features/auth` — UI
- [ ] session Route Handler / Auth.js·Clerk 등
- [ ] FSD: `entities/user`

---

## env 변수

### Legacy (현재 — `.env.example`)

```env
VITE_TMDB_ACCESS_TOKEN=
```

### Next (`xflix-next`)

```env
# 서버 전용 (Route Handler + SSR)
TMDB_ACCESS_TOKEN=

# (임시 parity만 — Route Handler 도입 후 제거)
# NEXT_PUBLIC_TMDB_ACCESS_TOKEN=
```

GitHub Actions Legacy: `secrets.VITE_TMDB_ACCESS_TOKEN`  
Vercel Next: `TMDB_ACCESS_TOKEN`

---

## 권장 작업 순서

```
0. Phase 0 결정 + performance-baseline (Legacy)
1. xflix--sw 클론 → xflix-next push
2. FSD rename (app→application, pages→views)
3. Next 추가 + Vite/React Router 제거
4. shell layout + providers + file routing (client-heavy stub)
5. react-router → next/navigation 전면 교체
6. Route Handler + SSR (layout → detail → home → list/search)
7. 'use client' 경계 + QA
8. Vercel 배포 + Lighthouse A/B
9. 로그인 + 마이페이지
```

---

## Legacy 소스 맵 (baseline `cbfeaae` 기준)

| 레이어 | 경로 |
|--------|------|
| application | `src/app/` — providers, routes _(→ rename)_ |
| views | `src/pages/` — 7 pages _(→ rename)_ |
| widgets | `src/widgets/` |
| features | `trailer`, `search`, `episodes` |
| entities | `movie`, `tv`, `media`, `genre` |
| shared | `api`, `ui`, `lib`, `config`, `model` |

**관련 문서:** [`performance-baseline.md`](./performance-baseline.md), [`iframe.md`](./iframe.md), [`portfolio.md`](./portfolio.md)
