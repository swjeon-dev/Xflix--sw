import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'

import { FloatingBackButton, LoadingComponent } from '@/shared'
import { API_ENDPOINT } from '@/shared/config/api'
import { useGetMovie } from '@/entities/movie'
import { MovieDetailSection } from '@/widgets/movie-detail'
import { MovieCarousel } from '@/widgets/carousel'

const DETAIL_QUERY = { append_to_response: 'credits' }

function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const { error, isLoading, movie } = useGetMovie(id, DETAIL_QUERY)

  if (isLoading) {
    return (
      <LoadingComponent style='relative min-h-[85vh] w-full main-page_px text-white' />
    )
  }

  return (
    <>
      <Helmet>
        <title>{movie?.title ?? 'Detail'}</title>
      </Helmet>
      <article key={id}>
        <MovieDetailSection movie={movie} error={error} />
        <MovieCarousel
          title='비슷한 장르 영화'
          endPoint={API_ENDPOINT.MOVIE_SIMILAR(id ?? '')}
          params={{ region: 'KR', page: 1 }}
        />
        <MovieCarousel
          title='추천하는 영화'
          endPoint={API_ENDPOINT.MOVIE_RECOMMEND(id ?? '')}
          params={{ region: 'KR', page: 1 }}
        />
      </article>

      <FloatingBackButton />
    </>
  )
}

export default MovieDetail
