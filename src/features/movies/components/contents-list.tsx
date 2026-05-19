import { useRef, useState } from 'react'
import { ICONS } from '@/shared/assets/icons'
import { devLog } from '@/shared/utils'
import type { ApiPath } from '../api/config'
import useGetContents from '../hooks/useGetContents'
import ContentRow from './content-row'
import { SkeletonUI } from '@/shared/components/ui'

interface IContentsCarousel {
  title: string
  endPoint: ApiPath
  params?: Record<string, string>
}

type ScrollDirection = 'LEFT' | 'RIGHT'

function ContentRowSkeleton() {
  return (
    <li
      className='relative aspect-video min-w-[300px] md:min-w-[380px] shrink-0'
      aria-hidden
    >
      <SkeletonUI />
    </li>
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
  const { isLoading, error, contents } = useGetContents(endPoint, params)
  const [isStart, setIsStart] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const scrollRef = useRef<HTMLUListElement>(null)
  const someOfContents = contents?.slice(0, 6)

  function moveScroll(direction: ScrollDirection) {
    if (!scrollRef.current) return
    const moveAmount = scrollRef.current.clientWidth / 2
    scrollRef.current.scrollBy({
      left: direction === 'LEFT' ? -moveAmount : moveAmount,
      behavior: 'smooth',
    })
  }

  function handleScroll() {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

    setIsStart(scrollLeft <= 10)
    setIsEnd(scrollLeft + clientWidth >= scrollWidth - 10)
  }

  if (isLoading) {
    return (
      <Wrapper title={title}>
        <ul className='flex overflow-x-scroll scrollbar-hide gap-2'>
          {Array.from({ length: 6 }).map((_, i) => (
            <ContentRowSkeleton key={i} />
          ))}
        </ul>
      </Wrapper>
    )
  }

  if (contents?.length === 0) return null

  if (!someOfContents || error) {
    if (error) devLog({ message: error, type: 'error' })
    return null
  }

  return (
    <Wrapper title={title}>
      <div className='relative group'>
        {!isStart && (
          <button
            className='absolute top-0 bottom-0 left-0 w-10 bg-gray-400/60 justify-center items-center z-[11] hidden group-hover:flex'
            onClick={() => moveScroll('LEFT')}
          >
            <span>{ICONS.leftArrow}</span>
          </button>
        )}
        {!isEnd && (
          <button
            className='absolute top-0 bottom-0 right-0 w-10 bg-gray-400/60 justify-center items-center z-[11] hidden group-hover:flex'
            onClick={() => moveScroll('RIGHT')}
          >
            <span>{ICONS.rightArrow}</span>
          </button>
        )}
        <ul
          className='flex overflow-x-scroll scrollbar-hide gap-2'
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {someOfContents.map(content => (
            <ContentRow key={content.id} content={content} />
          ))}
        </ul>
      </div>
    </Wrapper>
  )
}

export default ContentsCarousel
