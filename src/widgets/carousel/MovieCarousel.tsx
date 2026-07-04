import { useRef } from 'react'

import { TrailerOpenButton } from '@/features/trailer/ui'
import type { IMovie } from '@/entities/movie'
import { MovieCard } from '@/entities/movie'
import { useGetContents } from '@/entities/media'
import { Carousel, GenreCarouselProps, useListInfiniteScroll } from '@/shared'

function MovieCarousel({ title, endPoint, params }: GenreCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null)

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useListInfiniteScroll<IMovie>({
      endPoint,
      params,
      scrollRef,
      direction: 'horizontal',
      useContents: useGetContents<IMovie>,
    })

  return (
    <Carousel<IMovie>
      title={title}
      items={contents}
      scrollRef={scrollRef}
      isLoading={isLoading}
      isFetchingMore={isFetchingMore}
      error={error}
      onRetry={refetch}
      loaderRef={loaderRef}
      renderItem={movie => (
        <MovieCard
          key={`${movie.id}-movie-carousel`}
          content={movie}
          action={
            <TrailerOpenButton
              contentId={movie.id.toString()}
              contentTitle={movie.title}
              mediaType='movie'
            />
          }
        />
      )}
    />
  )
}

export default MovieCarousel
