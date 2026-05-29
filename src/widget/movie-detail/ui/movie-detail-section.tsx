import { Helmet } from 'react-helmet-async'
import MovieDetailHero from './movie-detail-hero'
import MovieDetailOverview from './movie-detail-overview'
import { useGetMovie, getMovieMoreInfo } from '../model'
import { LoadingComponent } from '@/shared'
import MovieRelatedContent from './movie-related-content'

interface MovieDetailSectionProps {
  id: string
}

const DETAIL_QUERY = { append_to_response: 'credits' }

function MovieDetailSection({ id }: MovieDetailSectionProps) {
  const { error, isLoading, movie } = useGetMovie(id, DETAIL_QUERY)

  if (isLoading) {
    return (
      <LoadingComponent style='relative min-h-[85vh] w-full main-page_px text-white' />
    )
  }

  if (!movie && error) {
    throw new Error(error || '현재 영화 정보를 가져올 수 없습니다')
  }

  if (!movie) return null

  const movieMoreInfo = getMovieMoreInfo(movie)

  return (
    <>
      <Helmet>
        <title>{movie.title || '영화 상세'}</title>
      </Helmet>
      <div className='pb-10 *:main-page_px'>
        <MovieDetailHero movie={movie} movieMoreInfo={movieMoreInfo} />
        <MovieDetailOverview movie={movie} movieMoreInfo={movieMoreInfo} />
      </div>
      <MovieRelatedContent id={id} />
    </>
  )
}

export default MovieDetailSection
