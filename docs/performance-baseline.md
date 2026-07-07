# Performance Baseline (Legacy — Vite SPA)

> Next.js 마이그레이션 A/B 비교용 **Legacy 기준치** 기록  
> Legacy URL: https://swjeon-dev.github.io/Xflix--sw/  
> Baseline commit: `cbfeaae` (`feat/fetch-normalization-get-movie`)

측정 전 **Chrome Incognito**, 동일 네트워크 프로파일 사용.

## 측정 환경

| 항목 | 값 |
|------|-----|
| 측정일 | |
| 브라우저 | Chrome |
| Lighthouse | Mobile / Desktop |
| 네트워크 | Slow 4G / Desktop (고정) |
| Legacy commit | `cbfeaae` |

## Lighthouse

### Home (`/`)

| 지표 | Mobile | Desktop |
|------|--------|---------|
| Performance | | |
| LCP | | |
| INP | | |
| CLS | | |
| FCP | | |
| TBT | | |

### Movie Detail (`/movies/:id`)

| 지표 | Mobile | Desktop |
|------|--------|---------|
| Performance | | |
| LCP | | |
| INP | | |
| CLS | | |

### Search (`/search?query=...`)

| 지표 | Mobile | Desktop |
|------|--------|---------|
| Performance | | |
| LCP | | |
| INP | | |
| CLS | | |

## Bundle (Legacy)

| 항목 | 값 |
|------|-----|
| JS (gzip) | ~107 KB (`dist/assets/index-*.js` build 기준) |
| CSS (gzip) | ~4.8 KB |

## Next 비교 (마이그레이션 후 작성)

| 지표 | Legacy | Next (`xflix-next`) | 차이 |
|------|--------|---------------------|------|
| Lighthouse Performance (Home, Mobile) | | | |
| LCP (Detail, Mobile) | | | |
| JS initial (gzip) | | | |

Next URL: _(Vercel 배포 후 기록)_
