import { useEffect, useState } from 'react'

export function useGetScrollY() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScrolled = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScrolled, { passive: true })
    return () => window.removeEventListener('scroll', handleScrolled)
  }, [])

  return scrollY
}
