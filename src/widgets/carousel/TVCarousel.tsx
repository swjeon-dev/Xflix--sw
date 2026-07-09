import { useRef } from 'react'

import { TrailerOpenButton } from '@/features/trailer'
import type { ITV } from '@/entities/tv'
import { TVCard } from '@/entities/tv'
import { useGenre } from '@/entities/genre'
import { Carousel, GenreCarouselProps } from '@/shared'

import { useCarouselContents } from './model'

function TVCarousel({ title, endPoint, params }: GenreCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null)

  const { tvGenres } = useGenre()
  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useCarouselContents<ITV>({
      endPoint,
      params,
      scrollRef,
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
      renderItem={tv => (
        <TVCard
          key={`${tv.id}-tv-carousel`}
          content={tv}
          genres={tvGenres}
          action={
            <TrailerOpenButton
              contentId={tv.id.toString()}
              contentTitle={tv.name}
              mediaType='tv'
            />
          }
        />
      )}
    />
  )
}

export default TVCarousel
