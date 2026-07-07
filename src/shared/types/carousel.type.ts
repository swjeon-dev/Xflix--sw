import type { BaseMedia } from './contents.types'

type ScrollDirection = 'LEFT' | 'RIGHT'

interface CarouselProps<T extends BaseMedia> {
  title: string
  items: T[]
  isLoading?: boolean
  isFetchingMore?: boolean
  error?: string | null
  onRetry?: () => void
  loaderRef?: (node: HTMLElement | null) => void
  scrollRef: React.RefObject<HTMLUListElement | null>
  renderItem: (item: T) => React.ReactNode
}

interface ScrollButtonProps {
  direction: ScrollDirection
  onClick: (direction: ScrollDirection) => void
}

interface WrapperProps {
  title: string
  children: React.ReactNode
}

interface GenreCarouselProps {
  title: string
  endPoint: string
  params?: Record<string, string | number | boolean>
}

export type {
  CarouselProps,
  ScrollDirection,
  GenreCarouselProps,
  ScrollButtonProps,
  WrapperProps,
}
