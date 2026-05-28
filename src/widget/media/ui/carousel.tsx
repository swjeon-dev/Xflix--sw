import { useEffect, useRef, useState } from 'react'
import { ICONS, devLog, SkeletonUI, useListInfiniteScroll } from '@/shared'
import type { ApiPath } from '@/shared'
import ContentCol from './carousel-col'
import type { Media } from '@/entities'
import { isMovie } from '../model'

interface IContentsCarousel {
  title: string
  endPoint: ApiPath
  params?: Record<string, string | number | boolean>
}

type ScrollDirection = 'LEFT' | 'RIGHT'

function ContentColSkeleton() {
  return (
    <li
      className='relative aspect-video min-w-[300px] md:min-w-[380px] shrink-0'
      aria-hidden
    >
      <SkeletonUI />
    </li>
  )
}

function ScrollButton({
  direction,
  onClick,
}: {
  direction: ScrollDirection
  onClick: (direction: ScrollDirection) => void
}) {
  return (
    <button
      className={`absolute top-0 bottom-0 ${direction === 'LEFT' ? 'left-0' : 'right-0'} w-10 bg-gray-400/60 justify-center items-center z-[11] hidden group-hover:flex`}
      onClick={() => onClick(direction)}
    >
      <span>{direction === 'LEFT' ? ICONS.leftArrow : ICONS.rightArrow}</span>
    </button>
  )
}

function Wrapper({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col gap-4 p-4 text-white overflow-hidden my-10 main-page_px'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {children}
    </div>
  )
}

function ContentsCarousel({ title, endPoint, params }: IContentsCarousel) {
  const [isStart, setIsStart] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const scrollRef = useRef<HTMLUListElement>(null)

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useListInfiniteScroll<Media>({
      endPoint,
      params,
      scrollRef,
      direction: 'horizontal',
    })

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

  // 새 아이템이 붙은 뒤에도 스크롤 위치·끝 여부를 맞춤 (scrollLeft는 유지, scrollWidth만 늘어남)
  useEffect(() => {
    updateScrollEdges()
  }, [contents.length, isFetchingMore])

  if (isLoading) {
    return (
      <Wrapper title={title}>
        <ul className='flex overflow-x-scroll scrollbar-hide gap-2'>
          {Array.from({ length: 6 }).map((_, i) => (
            <ContentColSkeleton key={i} />
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
        <button type='button' onClick={refetch}>
          다시 시도
        </button>
      </div>
    )
  }

  if (contents.length === 0) return null

  return (
    <Wrapper title={title}>
      <div className='relative group'>
        {!isStart && <ScrollButton direction='LEFT' onClick={moveScroll} />}
        {!isEnd && <ScrollButton direction='RIGHT' onClick={moveScroll} />}
        <ul
          className='flex overflow-x-scroll scrollbar-hide gap-2'
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {contents.map((content: Media) => (
            <ContentCol
              key={content.id}
              type={isMovie(content) ? 'movie' : 'tv'}
              content={content}
            />
          ))}
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
            className='shrink-0 basis-4 self-stretch'
            aria-hidden
          />
        </ul>
      </div>
    </Wrapper>
  )
}

export default ContentsCarousel
