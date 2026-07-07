# YouTube iframe 제어

현재 `features/trailer`는 **URL 파라미터 + `<iframe src>`** 방식을 사용합니다.  
동적 제어(`playVideo`, `pauseVideo` 등)는 `enablejsapi=1`을 준비해 두었지만, 아직 적용하지 않았습니다.

## 현재 구현

### 파일 구조

```text
features/trailer/
├── lib/buildYoutubeEmbedUrl.ts   # embed URL 생성
├── ui/YoutubePlayer.tsx          # iframe 렌더
├── ui/TrailerBackground.tsx      # 배경 variant
└── ui/TrailerModalContents.tsx   # 모달 variant
```

### embed URL (`buildYoutubeEmbedUrl`)

`variant`에 따라 초기 재생 동작을 다르게 설정합니다.

| 파라미터 | background | modal | 설명 |
| -------- | ---------- | ----- | ---- |
| `autoplay=1` | O | O | 자동 재생 |
| `mute=1` | O | - | 음소거 (autoplay 정책 통과) |
| `controls=0` | O | - | 컨트롤 바 숨김 |
| `loop=1` + `playlist` | O | - | 배경 반복 재생 |
| `enablejsapi=1` | O | O | JS API / postMessage 활성화 |
| `origin` | O | O | postMessage 검증용 |

```typescript
// src/features/trailer/lib/buildYoutubeEmbedUrl.ts
const params = new URLSearchParams({
  enablejsapi: '1',
  autoplay: '1',
  controls: '1',
  playsinline: '1',
  modestbranding: '1',
  rel: '0',
  origin: window.location.origin,
})
```

### iframe 렌더 (`YoutubePlayer`)

```tsx
// src/features/trailer/ui/YoutubePlayer.tsx
<iframe
  title={`${title} 트레일러`}
  src={src}
  allow='encrypted-media; picture-in-picture; autoplay;'
  allowFullScreen
/>
```

- **background**: `pointer-events-none`, `scale-[1.35]`로 중앙 UI 크롭
- **modal**: 기본 컨트롤 표시

### URL 파라미터 방식의 한계

- 재생 중 **일시정지, 볼륨, 시크** 등 동적 제어 불가
- iframe 내부 **중앙 재생 버튼**을 URL 파라미터로 완전히 숨길 수 없음
- 로딩 직후 0.3~1초 썸네일·재생 버튼이 잠깐 보일 수 있음

> cross-origin iframe 내부 DOM/CSS 접근 불가 → 버튼 **제거**는 불가, **가리기**(backdrop 오버레이, `opacity-0` 후 fade-in)만 가능

---

## 확장 옵션 (미적용)

`enablejsapi=1`과 `origin`이 이미 설정되어 있어, 필요 시 아래 방식으로 확장할 수 있습니다.

### 1. raw postMessage

```typescript
iframe.contentWindow?.postMessage(
  JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
  'https://www.youtube.com',
)
```

| 필드 | 설명 |
| ---- | ---- |
| `event: 'command'` | 명령 실행 |
| `func` | YouTube iframe API 메서드명 |
| `args` | 메서드 인수 배열 |

> embed URL `origin`: 서비스 URL  
> postMessage `origin`: `https://www.youtube.com`

### 2. YouTube IFrame Player API (공식)

```text
React 컴포넌트
    ↓ ref / container
YT.Player
    ↓ postMessage
YouTube iframe
```

`<iframe src>` 대신 `YT.Player`가 iframe을 생성하도록 전환합니다.

```typescript
player.playVideo()
player.pauseVideo()
player.seekTo(seconds, allowSeekAhead)
player.setVolume(0 ~ 100)
player.mute() / player.unMute()
```

### 3. react-youtube

IFrame API를 React 친화적으로 감싼 래퍼 라이브러리입니다.

---

## 방식 선택 가이드

| 요구사항 | 현재 / 권장 |
| -------- | ----------- |
| autoplay, mute, loop, controls 숨김 | **URL 파라미터** (현재) |
| 모달 닫을 때 정지, 커스텀 버튼 | **IFrame Player API** |
| 빠른 프로토타입 | **react-youtube** |
