import { Link } from 'react-router'

import { getTmdbImgPath, AdultUI } from '@/shared'
import { searchItemDetailPath, searchItemTitle, searchItemYear } from '../lib'
import type { ISearchData } from '../model'

interface SearchCardProps {
  item: ISearchData
}

function SearchCard({ item }: SearchCardProps) {
  const title = searchItemTitle(item)
  const year = searchItemYear(item)
  const detailPath = searchItemDetailPath(item)

  const posterUrl = getTmdbImgPath({
    path: item.poster_path,
    size: 'w342',
  })

  return (
    <li>
      <Link
        to={detailPath}
        className='group block'
        aria-label={`${title} 상세보기`}
      >
        <div className='aspect-[2/3] overflow-hidden rounded-md bg-gray-800'>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className='h-full w-full object-cover transition-opacity group-hover:opacity-70'
            />
          ) : (
            <div className='flex h-full items-center justify-center px-2 text-center text-sm text-white/40'>
              이미지 없음
            </div>
          )}
        </div>
        <div className='mt-2 flex items-center gap-1.5'>
          {item.adult && <AdultUI />}
          <p className='truncate text-sm font-medium text-white'>{title}</p>
        </div>
        {year && <p className='text-xs text-white/50'>{year}</p>}
      </Link>
    </li>
  )
}

export default SearchCard
