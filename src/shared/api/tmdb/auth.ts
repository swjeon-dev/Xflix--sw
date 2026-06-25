import { API_ENDPOINT } from '@/shared/config/api'
import { devLog } from '@/shared'
import { tmdbFetch } from './client'

interface IAuthResponse {
  status_code?: number
  status_message?: string
  success: boolean
}

export async function apiValidCheck(): Promise<{
  data: IAuthResponse | null
  error: string | null
}> {
  try {
    const result = await tmdbFetch<IAuthResponse>(
      API_ENDPOINT.AUTH_VALID,
      undefined,
      'API 인증 실패로 현재 서비스를 이용할 수 없습니다',
    )

    devLog({ message: 'API 인증 OK' })
    return { data: result.data, error: result.error }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown Error'
    devLog({ message: 'tmdbAuth 오류: ' + errorMessage, type: 'error' })
    return { data: null, error: errorMessage }
  }
}
