import { useEffect, useState } from 'react'

import type { IEpisode } from '@/entities/tv'

function useEpisode({
  initialEpisode,
  episodes,
  onClose,
}: {
  initialEpisode: IEpisode | null
  episodes: IEpisode[]
  onClose: () => void
}) {
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(
    initialEpisode,
  )

  const selectedIndex = selectedEpisode
    ? episodes.findIndex(ep => ep.id === selectedEpisode.id)
    : -1

  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex >= 0 && selectedIndex < episodes.length - 1

  function goPrev() {
    if (!hasPrev) return
    setSelectedEpisode(episodes[selectedIndex - 1])
  }

  function goNext() {
    if (!hasNext) return
    setSelectedEpisode(episodes[selectedIndex + 1])
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // if (e.key === 'Escape') {
      //   onClose()
      //   return
      // }
      if (!selectedEpisode) return
      if (e.key === 'ArrowLeft' && selectedIndex > 0) {
        setSelectedEpisode(episodes[selectedIndex - 1])
      }
      if (e.key === 'ArrowRight' && selectedIndex < episodes.length - 1) {
        setSelectedEpisode(episodes[selectedIndex + 1])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedEpisode, selectedIndex, episodes, onClose])

  const subtitle = selectedEpisode
    ? `${selectedEpisode.episode_number}화`
    : undefined

  return {
    selectedEpisode,
    setSelectedEpisode,
    hasPrev,
    hasNext,
    goPrev,
    goNext,
    subtitle,
  }
}

export default useEpisode
