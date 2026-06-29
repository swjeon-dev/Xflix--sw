import { useRef } from 'react'

import type { ITV } from '@/entities/tv'
import { TVCard } from '@/features/tv'
import { Carousel, useGetContents, useListInfiniteScroll } from '@/shared'

function TVCarousel({
  title,
  endPoint,
  params,
}: {
  title: string
  endPoint: string
  params?: Record<string, string | number | boolean>
}) {
  const scrollRef = useRef<HTMLUListElement>(null)

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useListInfiniteScroll<ITV>({
      endPoint,
      params,
      scrollRef,
      direction: 'horizontal',
      useContents: useGetContents<ITV>,
    })

  return (
    <Carousel<ITV>
      title={title}
      items={contents}
      scrollRef={scrollRef}
      isLoading={isLoading}
      isFetchingMore={isFetchingMore}
      error={error}
      onRetry={refetch}
      loaderRef={loaderRef}
      renderItem={tv => <TVCard key={tv.id} content={tv} />}
    />
  )
}

export default TVCarousel
