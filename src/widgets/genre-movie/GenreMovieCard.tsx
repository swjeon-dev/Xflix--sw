import { Link } from 'react-router'

import { routes, getTmdbImgPath } from '@/shared'
import type { IMovie } from '@/entities/movie'

function GenreMovieCard({ content }: { content: IMovie }) {
  const posterUrl = getTmdbImgPath({
    path: content.poster_path,
    size: 'w342',
  })

  return (
    <li>
      <Link
        to={routes.MOVIE.DETAIL(content.id)}
        className='group block'
        aria-label={`${content.title} 상세보기`}
      >
        <div className='aspect-[2/3] overflow-hidden rounded-md bg-gray-800'>
          {posterUrl ? (
            <img
              loading='lazy'
              decoding='async'
              src={posterUrl}
              alt={content.title}
              className='h-full w-full object-cover transition-opacity group-hover:opacity-70'
            />
          ) : (
            <div className='flex h-full items-center justify-center text-sm text-white/40'>
              이미지 없음
            </div>
          )}
        </div>
        <p className='mt-2 truncate text-sm text-white'>{content.title}</p>
      </Link>
    </li>
  )
}

export default GenreMovieCard
