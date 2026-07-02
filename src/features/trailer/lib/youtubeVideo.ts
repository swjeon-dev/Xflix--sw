import { IVideo } from '@/shared'

import { buildYoutubeEmbedUrl, type YoutubeEmbedVariant } from './buildYoutubeEmbedUrl'

function getYoutubeVideoCandidates(videos: IVideo[]): IVideo[] {
  const youtube = videos.filter(video => video.site === 'YouTube')

  const ordered = [
    ...youtube.filter(video => video.type === 'Trailer' && video.official),
    ...youtube.filter(video => video.type === 'Trailer' && !video.official),
    ...youtube.filter(video => video.type === 'Teaser' && video.official),
    ...youtube.filter(video => video.type === 'Teaser' && !video.official),
  ]

  const seen = new Set<string>()

  return ordered.filter(video => {
    if (seen.has(video.key)) return false
    seen.add(video.key)
    return true
  })
}

async function isYoutubeVideoPlayable(key: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://i.ytimg.com/vi/${key}/hqdefault.jpg`,
      { method: 'HEAD' },
    )

    return response.ok
  } catch {
    return false
  }
}

async function findPlayableYoutubeUrl(
  videos: IVideo[],
  variant: YoutubeEmbedVariant,
): Promise<string | null> {
  for (const video of getYoutubeVideoCandidates(videos)) {
    if (await isYoutubeVideoPlayable(video.key)) {
      return buildYoutubeEmbedUrl(video.key, variant)
    }
  }

  return null
}

function extractYoutubeVideoKey(src: string): string | null {
  const match = src.match(/\/embed\/([^?&/]+)/)

  return match?.[1] ?? null
}

export {
  extractYoutubeVideoKey,
  findPlayableYoutubeUrl,
  getYoutubeVideoCandidates,
  isYoutubeVideoPlayable,
}
