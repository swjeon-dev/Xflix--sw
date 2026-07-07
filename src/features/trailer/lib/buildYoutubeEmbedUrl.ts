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
    origin: window.location.origin,
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
  }

  return `${base}?${params.toString()}`
}

function getYoutubePlayerVars(
  key: string,
  variant: YoutubeEmbedVariant,
): YT.PlayerVars {
  const playerVars: YT.PlayerVars = {
    autoplay: 1,
    controls: variant === 'background' ? 0 : 1,
    playsinline: 1,
    modestbranding: 1,
    rel: 0,
    enablejsapi: 1,
    origin: window.location.origin,
  }

  if (variant === 'background') {
    playerVars.mute = 1
    playerVars.loop = 1
    playerVars.playlist = key
  }

  return playerVars
}

export {
  buildYoutubeEmbedUrl,
  getYoutubePlayerVars,
  type YoutubeEmbedVariant,
}
