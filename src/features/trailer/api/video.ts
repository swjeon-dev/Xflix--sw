import {
  tmdbFetch,
  type IApiReturn,
  type QueryParams,
  API_ENDPOINT,
} from '@/shared'

import type { IVideoReturn, MediaVideoType } from '../model/video.types'

function getVideosEndpoint(id: string, mediaType: MediaVideoType) {
  return mediaType === 'movie'
    ? API_ENDPOINT.MOVIE_VIDEOS(id)
    : API_ENDPOINT.TV_VIDEOS(id)
}

function getVideosErrorMessage(mediaType: MediaVideoType) {
  return mediaType === 'movie'
    ? '영화 영상 정보를 불러오지 못했습니다.'
    : 'TV 프로그램 영상 정보를 불러오지 못했습니다.'
}

const getVideos = async (
  id: string,
  mediaType: MediaVideoType,
  queryParams?: QueryParams,
): Promise<IApiReturn<IVideoReturn>> => {
  return tmdbFetch<IVideoReturn>(
    getVideosEndpoint(id, mediaType),
    queryParams,
    getVideosErrorMessage(mediaType),
  )
}

export { getVideosEndpoint, getVideos }
