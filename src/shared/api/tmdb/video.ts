import { API_ENDPOINT, type MediaVideoType } from '@/shared'

function getVideosEndpoint(id: string, mediaType: MediaVideoType) {
  return mediaType === 'movie'
    ? API_ENDPOINT.MOVIE_VIDEOS(id)
    : API_ENDPOINT.TV_VIDEOS(id)
}

export { getVideosEndpoint }
