import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from 'react'

const ROOT_MARGIN = {
  horizontal: '0px 320px 0px 0px',
  vertical: '0px 0px 320px 0px',
} as const

type InfiniteScrollDirection = 'horizontal' | 'vertical'

type UseInfiniteScrollOptions = {
  enabled?: boolean
  hasMore: boolean
  isFetching: boolean
  onLoadMore: () => void
  onBeforeLoadMore?: () => void
  scrollRootRef?: RefObject<Element | null>
  direction?: InfiniteScrollDirection
  threshold?: number
  rootMargin?: string
  pause?: boolean
  watchKey?: number
}

function useInfiniteScroll({
  enabled = true,
  hasMore,
  isFetching,
  onLoadMore,
  onBeforeLoadMore,
  scrollRootRef,
  direction = 'vertical',
  threshold = 0,
  rootMargin,
  pause = false,
  watchKey = 0,
}: UseInfiniteScrollOptions) {
  const canLoadMoreRef = useRef(true)
  const loaderNodeRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const gateRef = useRef({ hasMore, isFetching, enabled })

  gateRef.current = { hasMore, isFetching, enabled }

  const resolvedRootMargin = rootMargin ?? ROOT_MARGIN[direction]

  const disconnect = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [])

  const tryLoadMore = useCallback(() => {
    const gate = gateRef.current

    if (
      !gate.enabled ||
      !gate.hasMore ||
      gate.isFetching ||
      !canLoadMoreRef.current
    ) {
      return
    }

    canLoadMoreRef.current = false
    onBeforeLoadMore?.()
    onLoadMore()
  }, [onBeforeLoadMore, onLoadMore])

  const observe = useCallback(() => {
    const target = loaderNodeRef.current
    if (!target || pause || !gateRef.current.hasMore) return

    const root = scrollRootRef?.current ?? null
    if (direction === 'horizontal' && !root) return

    disconnect()

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return

        if (!entry.isIntersecting) {
          canLoadMoreRef.current = true
          return
        }

        tryLoadMore()
      },
      {
        root,
        threshold,
        rootMargin: resolvedRootMargin,
      },
    )

    observerRef.current.observe(target)
  }, [
    direction,
    disconnect,
    pause,
    resolvedRootMargin,
    scrollRootRef,
    threshold,
    tryLoadMore,
  ])

  const loaderRef = useCallback(
    (node: HTMLElement | null) => {
      loaderNodeRef.current = node

      if (!node) {
        disconnect()
      }
    },
    [disconnect],
  )

  const reset = useCallback(() => {
    canLoadMoreRef.current = true
  }, [])

  useLayoutEffect(() => {
    if (pause || !hasMore || !enabled) {
      disconnect()
      return
    }

    observe()
  }, [disconnect, enabled, hasMore, observe, pause, watchKey])

  useEffect(() => {
    return () => disconnect()
  }, [disconnect])

  return {
    loaderRef,
    reset,
  }
}

export { ROOT_MARGIN, useInfiniteScroll }
export type { InfiniteScrollDirection, UseInfiniteScrollOptions }
