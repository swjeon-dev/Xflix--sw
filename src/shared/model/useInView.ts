import { useCallback, useEffect, useState } from 'react'

const DEFAULT_ROOT_MARGIN = '0px 0px 320px 0px'

function useInView(options?: IntersectionObserverInit) {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  const ref = useCallback((element: HTMLElement | null) => {
    setNode(element)
  }, [])

  useEffect(() => {
    if (!node || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        setInView(true)
        observer.disconnect()
      },
      { rootMargin: DEFAULT_ROOT_MARGIN, threshold: 0, ...options },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [node, inView])

  return { ref, inView }
}

export default useInView
