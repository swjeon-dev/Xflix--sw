import { Link } from 'react-router'
import { getTmdbImgPath, routes } from '@/shared'
import type { Media } from '@/entities/media'
import { isMovie } from '@/entities/media'

function ContentCard({ content }: { content: Media }) {
  const posterUrl = getTmdbImgPath({
    path: content.poster_path,
    size: 'w342',
  })

  const title = isMovie(content) ? content.title : content.name
  const navPath = isMovie(content)
    ? routes.MOVIE.DETAIL(content.id)
    : routes.TV.DETAIL(content.id)

  return (
    <li>
      <Link to={navPath} className='group block'>
        <div className='aspect-[2/3] overflow-hidden rounded-md bg-gray-800'>
          {content.poster_path ? (
            <img
              src={posterUrl}
              alt={`${title} poster`}
              className='h-full w-full object-cover transition-opacity group-hover:opacity-70'
            />
          ) : (
            <div className='flex h-full items-center justify-center text-sm text-white/40'>
              이미지 없음
            </div>
          )}
        </div>
        <p className='mt-2 truncate text-sm text-white'>{title}</p>
      </Link>
    </li>
  )
}

export default ContentCard
