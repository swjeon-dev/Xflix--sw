import { useRef } from 'react'

import { Carousel, useListInfiniteScroll } from '@/shared'
import type { IMovie } from '@/entities/movie'
import { MovieCard } from '@/entities/movie'
import { useGetContents } from '@/entities/media'

function MovieCarousel({
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
        <MovieCard key={`${movie.id}-movie-carousel`} content={movie} />
      )}
    />
  )
}

export default MovieCarousel
