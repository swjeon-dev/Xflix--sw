import { Link, useRouteLoaderData } from 'react-router'
import { useMemo } from 'react'
import { ICONS } from '@/shared/assets/icons'
import { routes } from '@/shared/config/routes'
import { getTmdbImgPath } from '@/shared/lib'
import { AdultUI } from '@/shared/ui'
import type { ITV } from '@/entities/tv'
import type { IGenre } from '@/shared/types'

const LOADER_ID = 'root'

function ContentRow({ content }: { content: ITV }) {
  const {
    genres: { tvGenres },
  } = useRouteLoaderData(LOADER_ID) as { genres: { tvGenres: IGenre[] } }
  const navPath = (id: string | number) => routes.TV.DETAIL(id)

  const contentMoreInfo = useMemo(() => {
    const myGenres =
      content.genre_ids
        ?.map(id => tvGenres.find(g => g.id === id))
        .filter((genre): genre is IGenre => !!genre) ?? []

    return {
      title: content.name,
      overview: content.overview,
      adult: content.adult,
      year: content.first_air_date,
      genres: myGenres.length > 2 ? myGenres.slice(0, 2) : myGenres,
      first_air_date: content.first_air_date,
    }
  }, [content, tvGenres])

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
        <div className='flex gap-2'>
          {[
            { icon: ICONS.play, label: '재생' },
            // { icon: ICONS.plus, label: '목록 추가' },
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
