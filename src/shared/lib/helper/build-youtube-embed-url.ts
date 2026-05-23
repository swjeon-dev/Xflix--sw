export type YoutubeEmbedVariant = 'background' | 'modal'

export function buildYoutubeEmbedUrl(
  key: string,
  variant: YoutubeEmbedVariant,
) {
  const base = `https://www.youtube.com/embed/${key}`

  if (variant === 'background') {
    return `${base}?autoplay=1&controls=0&mute=1&loop=1&playlist=${key}&rel=0&playsinline=1&modestbranding=1`
  }

  return `${base}?autoplay=1&controls=0&rel=0&playsinline=1`
}
