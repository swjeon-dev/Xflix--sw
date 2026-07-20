import { devLog } from '@/shared'
import {
  useTrailerPlay,
  YoutubePlayer,
  type MediaVideoType,
} from '@/features/trailer'
// import { useEffect, useState } from 'react'

interface TrailerBackgroundProps {
  contentId: number | string
  contentTitle: string
  mediaType?: MediaVideoType
  backdropUrl: string
}

function TrailerBackground({
  contentId,
  contentTitle,
  backdropUrl,
  mediaType = 'movie',
}: TrailerBackgroundProps) {
  // 플레이어 지연 마운트 (requestIdleCallback) — 지표 개선 미미하여 비활성
  // const [canMountPlayer, setCanMountPlayer] = useState(false)
  const { isError, isReady, trailerUrl, error, markUnavailable } =
    useTrailerPlay(contentId.toString(), mediaType, 'background')

  if (isError && error) {
    devLog({ message: error, type: 'error' })
  }

  // useEffect(() => {
  //   setCanMountPlayer(false)
  //   if (!isReady || !trailerUrl) return
  //
  //   let idleId: number | undefined
  //   let timeoutId: ReturnType<typeof setTimeout> | undefined
  //
  //   const mount = () => setCanMountPlayer(true)
  //
  //   if (typeof window.requestIdleCallback === 'function') {
  //     idleId = window.requestIdleCallback(mount, { timeout: 2000 })
  //   } else {
  //     timeoutId = setTimeout(mount, 1)
  //   }
  //
  //   return () => {
  //     if (
  //       idleId !== undefined &&
  //       typeof window.cancelIdleCallback === 'function'
  //     ) {
  //       window.cancelIdleCallback(idleId)
  //     }
  //     if (timeoutId !== undefined) clearTimeout(timeoutId)
  //   }
  // }, [isReady, trailerUrl])

  // if (!isReady || !trailerUrl || !canMountPlayer) {
  if (!isReady || !trailerUrl) {
    return (
      <img
        {...{ fetchpriority: 'high' }}
        src={backdropUrl}
        alt={`${contentTitle} 포스터`}
        className='w-full h-full object-cover'
      />
    )
  }

  return (
    <YoutubePlayer
      variant='background'
      title={contentTitle}
      src={trailerUrl}
      onUnavailable={markUnavailable}
    />
  )
}

export default TrailerBackground
