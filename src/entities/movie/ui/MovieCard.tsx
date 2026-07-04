import { Link } from 'react-router'
import { useMemo } from 'react'

import { useGenre } from '@/entities/genre'
import { routes, getTmdbImgPath, AdultUI, type IGenre } from '@/shared'
import type { IMovie } from '../model/movie.types'

interface MovieCardProps {
  content: IMovie
  action: React.ReactNode
}

function MovieCard({ content, action }: MovieCardProps) {
  const { movieGenres } = useGenre()

  const contentMoreInfo = useMemo(() => {
    const myGenres =
      content.genre_ids
        ?.map(id => movieGenres.find(g => g.id === id))
        .filter((genre): genre is IGenre => !!genre) ?? []

    return {
      title: content.title,
      overview: content.overview,
      adult: content.adult,
      year: content.release_date ?? null,
      genres: myGenres,
    }
  }, [content, movieGenres])

  const lowImageUrl = getTmdbImgPath({
    size: 'w300',
    path: content.backdrop_path,
  })

  return (
    <li className='relative aspect-video min-w-[300px] md:min-w-[380px] transition-colors ease-in delay-150 duration-150 z-10 group/button-hover'>
      <Link
        to={routes.MOVIE.DETAIL(content.id)}
        className='absolute inset-0 hover:opacity-60'
        aria-label={`${contentMoreInfo.title} 상세보기`}
      >
        {content.backdrop_path && (
          <img
            className='w-full h-full object-cover bg-gray-800'
            src={lowImageUrl}
            alt={contentMoreInfo.title}
          />
        )}
      </Link>

      <div className='absolute inset-0 p-4 flex flex-col justify-end gap-2 opacity-0 group-hover/button-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent'>
        <div className='flex gap-2 items-center'>
          {contentMoreInfo.adult && <AdultUI />}
          <h3 className='text-white text-lg font-bold truncate'>
            {contentMoreInfo.title}
          </h3>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <span className='text-xs text-white'>{contentMoreInfo.year}</span>
            {contentMoreInfo.genres.map(genre => (
              <span key={genre.id} className='text-xs text-white'>
                {genre.name}
              </span>
            ))}
          </div>
          <span className='text-xs line-clamp-2'>
            {contentMoreInfo.overview}
          </span>
        </div>
        <div className='flex gap-2'>{action}</div>
      </div>
    </li>
  )
}

export default MovieCard
