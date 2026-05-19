import { useEffect, useState } from 'react'
import { MEDIA_QUERY, type Breakpoints } from '@/shared/constants/breakpoints'

export function useScrollBlock(
  isLocked: boolean,
  mediaQueryString: Breakpoints = 'md',
) {
  const [isMediaMatch, setIsMediaMatch] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(MEDIA_QUERY[mediaQueryString])

    function checkMediaMatch() {
      setIsMediaMatch(media.matches)
    }

    checkMediaMatch()
    media.addEventListener('change', checkMediaMatch)
    return () => media.removeEventListener('change', checkMediaMatch)
  }, [mediaQueryString])

  useEffect(() => {
    if (isMediaMatch && isLocked) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMediaMatch, isLocked])
}
