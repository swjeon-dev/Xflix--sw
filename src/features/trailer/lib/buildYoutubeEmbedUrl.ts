import { IVideo } from '@/shared'

type YoutubeEmbedVariant = 'background' | 'modal'

function buildYoutubeEmbedUrl(paramKey: string, variant: YoutubeEmbedVariant) {
  const base = `https://www.youtube.com/embed/${paramKey}`
  const params = new URLSearchParams({
    enablejsapi: '1',
    autoplay: '1',
    controls: '1',
    playsinline: '1',
    modestbranding: '1',
    rel: '0',
    origin: window.location.origin, // API + postMessage 검증
  })

  if (variant === 'background') {
    const extraParams = {
      mute: '1',
      controls: '0',
      loop: '1',
      playlist: paramKey,
    }

    Object.entries(extraParams).forEach(([key, value]) => {
      params.set(key, value.toString())
    })

    return `${base}?${params.toString()}`
  }

  return `${base}?${params.toString()}`
}

function pickYoutubeTrailerUrl(
  videos: IVideo[],
  variant: YoutubeEmbedVariant,
): string | null {
  const youtube = videos.filter(video => video.site === 'YouTube')

  const trailer =
    youtube.find(video => video.type === 'Trailer' && video.official) ??
    youtube.find(video => video.type === 'Trailer') ??
    youtube[0] ??
    null

  const trailerUrl = trailer ? buildYoutubeEmbedUrl(trailer.key, variant) : null

  return trailerUrl
}

export { type YoutubeEmbedVariant, pickYoutubeTrailerUrl }
