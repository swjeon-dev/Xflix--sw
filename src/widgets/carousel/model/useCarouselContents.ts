import { useInfiniteContents } from '@/entities/media'
import type { Media } from '@/entities'

type UseCarouselContentsParams = {
  endPoint: string
  params?: Record<string, string | number | boolean>
  scrollRef: React.RefObject<HTMLUListElement | null>
}

function useCarouselContents<T extends Media>({
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
