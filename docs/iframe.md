# iframe 제어

`enablejsapi=1`는 embeded url 파라미터 중 하나로 iframe api 혹은 postMessage 제어를 하기 위한 값

raw postMessage, iframe_api 사용하는 2가지 방식이 있습니다.

1. raw postMessage 사용

event: 'command' | 'listening'

- command: 명령 실행 요청 (+ func + args)
- listening: 이벤트 수신 대기. 가져온 iframe에 대한 이벤트를 수집하기 위함(현재 서비스에서는 불필요)

func: iframe API Functions의 메서드를 사용. 사용할 수 없는 메서드도 있음
args: 메서드의 인수를 배열 형태로 입력

```typescript
iframe.contentWindow.postMessage(
  JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
  'https://www.youtube.com', // origin
)

iframe.contentWindow.postMessage(
  JSON.stringify({ event: 'listening', id: '1' }),
  'https://www.youtube.com', // origin
)
```

> origin
> embeded url>origin: 해당 url을 사용하는 사이트(서비스 url)
> postMessage>origin: 메시지를 보낼 사이트

2. iframe youtube api 사용
