import { API_ENDPOINT } from '../../config/api'
import type { MediaVideoType } from '../../model/video.types'

function getVideosEndpoint(id: string, mediaType: MediaVideoType) {
  return mediaType === 'movie'
    ? API_ENDPOINT.MOVIE_VIDEOS(id)
    : API_ENDPOINT.TV_VIDEOS(id)
}

export { getVideosEndpoint }
