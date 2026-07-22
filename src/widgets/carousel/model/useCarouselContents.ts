import { useInfiniteContents } from '@/entities/media'
import type { BaseMedia } from '@/shared'

type UseCarouselContentsParams = {
  endPoint: string
  params?: Record<string, string | number | boolean>
  scrollRef: React.RefObject<HTMLUListElement | null>
}

function useCarouselContents<T extends BaseMedia>({
  endPoint,
  params,
  scrollRef,
}: UseCarouselContentsParams) {
  return useInfiniteContents<T>({
    endPoint,
    params,
    scrollRef,
    direction: 'horizontal',
  })
}

export default useCarouselContents
