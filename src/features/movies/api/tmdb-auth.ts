import { API_CONFIG, API_ENDPOINT } from './config'
import { devLog } from '@/shared/utils'

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
    const response = await fetch(
      API_CONFIG.BASE_URL + API_ENDPOINT.AUTH_VALID,
      API_CONFIG.OPTIONS,
    )

    if (!response.ok) {
      throw new Error('API 인증 실패로 현재 서비스를 이용할 수 없습니다')
    }

    const data: IAuthResponse = await response.json()
    devLog({ message: 'API 인증 OK' })
    return { data, error: null }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown Error'
    devLog({ message: 'tmdbAuth 오류: ' + errorMessage, type: 'error' })
    return { data: null, error: errorMessage }
  }
}
