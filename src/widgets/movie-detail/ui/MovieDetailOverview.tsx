import type { IMovie } from '@/entities/movie'
import { MetaTagGroup } from '@/shared'

import type { IMovieMoreInfo } from '../model'

interface MovieDetailOverviewProps {
  movie: IMovie
  movieMoreInfo: IMovieMoreInfo
}

function MovieDetailOverview({
  movie,
  movieMoreInfo,
}: MovieDetailOverviewProps) {
  return (
    <div className='mt-10 flex flex-col gap-20 text-white md:flex-row md:gap-10'>
      {movie.overview && (
        <div className='flex w-full flex-col gap-4 md:w-3/4'>
          <h3>줄거리</h3>
          <span>{movie.overview}</span>
        </div>
      )}
      <div className='flex w-full flex-col gap-4 md:w-1/4'>
        <MetaTagGroup
          label='출연'
          tags={movieMoreInfo.actors}
          type='movie'
        />
        <MetaTagGroup
          label='장르'
          tags={movieMoreInfo.genres}
          type='movie'
        />
        <MetaTagGroup
          label='감독'
          tags={movieMoreInfo.director ? [movieMoreInfo.director] : []}
          type='movie'
        />
      </div>
    </div>
  )
}

export default MovieDetailOverview
