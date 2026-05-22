import { Link } from 'react-router'
import { getTmdbImgPath } from '@/shared/lib'
import { routes } from '@/shared/config/routes'
import type { ITV } from '@/entities/tv'

function GenreTVCard({ content }: { content: ITV }) {
  const posterUrl = getTmdbImgPath({
    path: content.poster_path,
    size: 'w342',
  })

  return (
    <li>
      <Link
        to={routes.TV.DETAIL(content.id)}
        className='group block'
        aria-label={`${content.name} 상세보기`}
      >
        <div className='aspect-[2/3] overflow-hidden rounded-md bg-gray-800'>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={content.name}
              className='h-full w-full object-cover transition-opacity group-hover:opacity-70'
            />
          ) : (
            <div className='flex h-full items-center justify-center text-sm text-white/40'>
              이미지 없음
            </div>
          )}
        </div>
        <p className='mt-2 truncate text-sm text-white'>{content.name}</p>
      </Link>
    </li>
  )
}

export default GenreTVCard
