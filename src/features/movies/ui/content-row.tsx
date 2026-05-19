import { Link, useRouteLoaderData } from 'react-router'
import { useMemo } from 'react'
import { ICONS } from '@/shared/assets/icons'
import { routes } from '@/shared/config/routes'
import { getTmdbImgPath } from '../lib/helper'
import { AdultUI } from '@/shared/ui'
import type { IGenre, IMovie } from '@/entities/movie/model'

function ContentRow({ content }: { content: IMovie }) {
  const { genres } = useRouteLoaderData('root') as { genres: IGenre[] }
  const navPath = (id: string | number) => routes.MOVIE.DETAIL(id)

  const contentMoreInfo = useMemo(() => {
    const myGenres =
      content.genre_ids
        ?.map(id => genres.find(g => g.id === id))
        .filter((genre): genre is IGenre => !!genre) ?? []

    return {
      title: content.title,
      overview: content.overview,
      adult: content.adult,
      year: content.release_date?.split('-')[0],
      genres: myGenres,
      release_date: content.release_date,
    }
  }, [content, genres])

  const lowImageUrl = getTmdbImgPath({
    size: 'w300',
    path: content.backdrop_path,
  })

  return (
    <li className='relative aspect-video min-w-[300px] md:min-w-[380px] transition-colors ease-in delay-150 duration-150 z-10 group/button-hover'>
      <Link
        to={navPath(content.id)}
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
          <h2 className='text-white text-lg font-bold truncate'>
            {contentMoreInfo.title}
          </h2>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <span className='text-xs text-white'>
              {contentMoreInfo.release_date?.split('-')[0]} -
            </span>
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
        <div className='flex gap-2'>
          {[
            { icon: ICONS.play, label: '재생' },
            { icon: ICONS.plus, label: '목록 추가' },
          ].map((item, idx) => (
            <button
              key={idx}
              type='button'
              aria-label={item.label}
              className='p-2 bg-white/20 hover:bg-red-600 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center pointer-events-auto'
              onClick={e => e.stopPropagation()}
            >
              <span className='w-5 h-5 fill-white flex items-center justify-center'>
                {item.icon}
              </span>
            </button>
          ))}
        </div>
      </div>
    </li>
  )
}

export default ContentRow
