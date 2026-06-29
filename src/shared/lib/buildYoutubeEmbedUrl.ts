export type YoutubeEmbedVariant = 'background' | 'modal'

export function buildYoutubeEmbedUrl(
  paramKey: string,
  variant: YoutubeEmbedVariant,
) {
  const base = `https://www.youtube.com/embed/${paramKey}`
  const params = new URLSearchParams({
    enablejsapi: '1',
    autoplay: '1',
    controls: '0',
    rel: '0',
    playsinline: '1',
    origin: window.location.origin, // API + postMessage 검증
  })

  if (variant === 'background') {
    const extraParams = {
      mute: '1',
      loop: '1',
      playlist: paramKey,
      modestbranding: '1',
    }

    Object.entries(extraParams).forEach(([key, value]) => {
      params.set(key, value.toString())
    })

    return `${base}?${params.toString()}`
  }

  return `${base}?${params.toString()}`
}
