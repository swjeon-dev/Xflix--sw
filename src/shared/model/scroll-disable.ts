import { useEffect, useState } from 'react'
import { MEDIA_QUERY } from '@/shared/config/breakpoints'
import type { Breakpoints } from '@/shared/config/breakpoints'

interface UseBodyScrollLockOptions {
  /** 이 breakpoint(max-width)에 맞을 때만 잠금. 생략 시 항상 잠금 */
  below?: Breakpoints
}

export function useBodyScrollLock(
  isLocked: boolean,
  options: UseBodyScrollLockOptions = {},
) {
  const { below } = options
  const [matchesBreakpoint, setMatchesBreakpoint] = useState(() => {
    if (!below) return true
    if (typeof window === 'undefined') return false
    return window.matchMedia(MEDIA_QUERY[below]).matches
  })

  useEffect(() => {
    if (!below) return

    const media = window.matchMedia(MEDIA_QUERY[below])

    function handleChange() {
      setMatchesBreakpoint(media.matches)
    }

    handleChange()
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [below])

  const shouldLock = isLocked && matchesBreakpoint

  useEffect(() => {
    if (!shouldLock) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [shouldLock])
}
