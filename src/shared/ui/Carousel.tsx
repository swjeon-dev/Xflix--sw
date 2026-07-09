import { useEffect, useState } from 'react'

import type {
  BaseMedia,
  CarouselProps,
  ScrollButtonProps,
  ScrollDirection,
  WrapperProps,
} from '../types'
import { SkeletonUI } from './LoadingScreen'
import { ICONS } from '../assets'
import { devLog } from '../lib'

function CardSkeleton() {
  return (
    <li
      className='relative aspect-video min-w-[300px] md:min-w-[380px] shrink-0'
      aria-hidden
    >
      <SkeletonUI />
    </li>
  )
}

function ScrollButton({ direction, onClick }: ScrollButtonProps) {
  return (
    <button
      className={`absolute top-0 bottom-0 ${direction === 'LEFT' ? 'left-0' : 'right-0'} w-10 bg-gray-400/60 justify-center items-center z-[11] hidden group-hover:flex`}
      onClick={() => onClick(direction)}
    >
      <span>{direction === 'LEFT' ? ICONS.leftArrow : ICONS.rightArrow}</span>
    </button>
  )
}

function Wrapper({ title, children }: WrapperProps) {
  return (
    <div className='flex flex-col gap-4 p-4 text-white overflow-hidden my-10 main-page_px'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {children}
    </div>
  )
}

function Carousel<T extends BaseMedia>({
  title,
  items,
  isLoading = false,
  isFetchingMore = false,
  error,
  onRetry,
  loaderRef,
  scrollRef,
  renderItem,
}: CarouselProps<T>) {
  const [isStart, setIsStart] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  function updateScrollEdges() {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

    setIsStart(scrollLeft <= 10)
    setIsEnd(scrollLeft + clientWidth >= scrollWidth - 10)
  }

  function moveScroll(direction: ScrollDirection) {
    if (!scrollRef.current) return
    const moveAmount = scrollRef.current.clientWidth / 2
    scrollRef.current.scrollBy({
      left: direction === 'LEFT' ? -moveAmount : moveAmount,
      behavior: 'smooth',
    })
  }

  function handleScroll() {
    updateScrollEdges()
  }

  useEffect(() => {
    updateScrollEdges()
  }, [items.length, isFetchingMore])

  if (isLoading) {
    return (
      <Wrapper title={title}>
        <ul className='flex overflow-x-scroll scrollbar-hide gap-2'>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </ul>
      </Wrapper>
    )
  }

  if (error) {
    devLog({ message: error || '목록을 불러오지 못했습니다.', type: 'error' })
    return (
      <div className='flex flex-col gap-4 p-4 items-center text-white overflow-hidden my-10 main-page_px'>
        <p className='text-lg text-white/70'>
          {title} 목록을 불러오지 못했습니다.
        </p>
        {onRetry && (
          <button type='button' onClick={onRetry}>
            다시 시도
          </button>
        )}
      </div>
    )
  }

  if (items.length === 0) return null

  return (
    <Wrapper title={title}>
      <div className='relative group'>
        {!isStart && <ScrollButton direction='LEFT' onClick={moveScroll} />}
        {!isEnd && <ScrollButton direction='RIGHT' onClick={moveScroll} />}
        <ul
          className='flex overflow-x-scroll scrollbar-hide gap-2'
          ref={scrollRef as React.Ref<HTMLUListElement>}
          onScroll={handleScroll}
        >
          {items.map(item => renderItem(item))}
          {isFetchingMore && (
            <li
              className='relative aspect-video min-w-[300px] md:min-w-[380px] shrink-0'
              aria-hidden
            >
              <SkeletonUI />
            </li>
          )}
          <li
            ref={loaderRef}
            className='shrink-0 w-px min-w-px self-stretch'
            aria-hidden
          />
        </ul>
      </div>
    </Wrapper>
  )
}

export default Carousel
