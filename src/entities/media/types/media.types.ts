import type { IMovie } from '@/entities/movie'
import type { ITV } from '@/entities/tv'

/** movie / tv 공통 UI·목록에서 쓰는 합성 타입 */
export type Media = IMovie | ITV
