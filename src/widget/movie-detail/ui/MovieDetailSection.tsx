import type { IMovie } from '@/entities/movie'
import { getMovieMoreInfo } from '../model'
import MovieDetailHero from './MovieDetailHero'
import MovieDetailOverview from './MovieDetailOverview'

interface MovieDetailSectionProps {
  movie: IMovie | null
  error: string | null
}

function MovieDetailSection({ movie, error }: MovieDetailSectionProps) {
  if (!movie && error) {
    throw new Error(error || '현재 영화 정보를 가져올 수 없습니다')
  }

  if (!movie) return null

  const movieMoreInfo = getMovieMoreInfo(movie)

  return (
    <div className='pb-10 *:main-page_px'>
      <MovieDetailHero movie={movie} movieMoreInfo={movieMoreInfo} />
      <MovieDetailOverview movie={movie} movieMoreInfo={movieMoreInfo} />
    </div>
  )
}

export default MovieDetailSection
