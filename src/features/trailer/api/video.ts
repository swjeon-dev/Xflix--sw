import { type MediaVideoType, API_ENDPOINT } from '@/shared'

function getVideosEndpoint(id: string, mediaType: MediaVideoType) {
  return mediaType === 'movie'
    ? API_ENDPOINT.MOVIE_VIDEOS(id)
    : API_ENDPOINT.TV_VIDEOS(id)
}

export { getVideosEndpoint }
