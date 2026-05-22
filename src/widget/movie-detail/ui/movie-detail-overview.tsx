import type { IMovie } from '@/entities/movie'
import type { IMovieMoreInfo } from '../model/model'

interface MovieDetailOverviewProps {
  movie: IMovie
  movieMoreInfo: IMovieMoreInfo
}

const META_ITEMS = [
  { label: '출연', key: 'actors' },
  { label: '장르', key: 'genres' },
  { label: '감독', key: 'director' },
] as const

function MovieDetailOverview({
  movie,
  movieMoreInfo,
}: MovieDetailOverviewProps) {
  return (
    <div className='flex flex-col gap-20 mt-10 md:flex-row md:gap-10 text-white'>
      {movie.overview && (
        <div className='flex flex-col gap-4 w-full md:w-3/4'>
          <h3>줄거리</h3>
          <span>{movie.overview}</span>
        </div>
      )}
      <div className='flex flex-col gap-3 w-full md:w-1/4'>
        {META_ITEMS.map(item => (
          <div key={item.label} className='flex items-center gap-2'>
            <h4 className='text-sm text-gray-400/80 text-nowrap place-self-start'>
              {`${item.label}: `}
            </h4>
            <span className='text-sm place-self-start'>
              {movieMoreInfo[item.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieDetailOverview
