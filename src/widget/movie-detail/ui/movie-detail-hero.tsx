import { ICONS } from '@/shared/assets/icons'
import { AdultUI } from '@/shared/components/ui'
import type { IMovie } from '@/features/movies/types'
import type { IMovieMoreInfo } from '../model/model'
import MovieBackdrop from './movie-backdrop'

interface MovieDetailHeroProps {
  movie: IMovie
  movieMoreInfo: IMovieMoreInfo
}

function MovieDetailHero({ movie, movieMoreInfo }: MovieDetailHeroProps) {
  return (
    <div className='relative min-h-[85vh] w-full flex gap-4'>
      <div className='text-white z-10 flex flex-col gap-6 justify-end pb-8 md:pb-16'>
        <h1 className='font-semibold text-4xl md:text-6xl text-balance'>
          {movie.title}
        </h1>
        <div className='flex gap-4 text-base md:text-lg'>
          {movie.adult && <AdultUI />}
          <span>{movie.release_date}</span>
          <span>{movieMoreInfo.runtime}</span>
        </div>
        <p className='line-clamp-2 text-base md:text-lg'>{movie.tagline}</p>
        <div className='flex gap-3'>
          <button className='px-3 md:px-4 py-4 flex gap-2 items-center rounded-md bg-gray-200 text-black hover:bg-gray-200/95 text-sm'>
            {ICONS.play}
            <span className='text-lg font-semibold'>재생</span>
          </button>
          <button className='px-3 md:px-5 py-4 flex gap-2 items-center rounded-md hover:bg-white/30 bg-gray-300/25 text-white backdrop-blur-md text-sm'>
            {ICONS.plus}
            <span className='text-lg font-semibold'>상세 정보 버튼</span>
          </button>
        </div>
        <div className='absolute -bottom-6 left-[50%] translate-x-[-50%] animate-tongtong'>
          {ICONS.chevronDown}
        </div>
      </div>
      <MovieBackdrop path={movie.backdrop_path} title={movie.title} />
    </div>
  )
}

export default MovieDetailHero
