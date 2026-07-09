import { useRef } from 'react'

import { TrailerOpenButton } from '@/features/trailer'
import type { IMovie } from '@/entities/movie'
import { MovieCard } from '@/entities/movie'
import { useInfiniteContents } from '@/entities/media'
import { useGenre } from '@/entities/genre'
import { Carousel, GenreCarouselProps } from '@/shared'

function MovieCarousel({ title, endPoint, params }: GenreCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null)

  const { movieGenres } = useGenre()
  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useInfiniteContents<IMovie>({
      endPoint,
      params,
      scrollRef,
      direction: 'horizontal',
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
          genres={movieGenres}
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
