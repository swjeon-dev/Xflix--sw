import type { ITV } from '@/entities'
import type { ITVMoreInfo } from '../model'

interface TVDetailOverviewProps {
  tv: ITV
  tvMoreInfo: ITVMoreInfo
}

const META_ITEMS = [
  { label: '출연', key: 'actors' },
  { label: '장르', key: 'genres' },
  { label: '감독', key: 'director' },
] as const

function TVDetailOverview({ tv, tvMoreInfo }: TVDetailOverviewProps) {
  return (
    <div className='flex flex-col gap-20 mt-10 md:flex-row md:gap-10 text-white'>
      {tv.overview && (
        <div className='flex flex-col gap-4 w-full md:w-3/4'>
          <h3>줄거리</h3>
          <span>{tv.overview}</span>
        </div>
      )}
      <div className='flex flex-col gap-3 w-full md:w-1/4'>
        {META_ITEMS.map(item => (
          <div key={item.label} className='flex items-center gap-2'>
            <h4 className='text-sm text-gray-400/80 text-nowrap place-self-start'>
              {`${item.label}: `}
            </h4>
            <span className='text-sm place-self-start'>
              {tvMoreInfo[item.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TVDetailOverview
