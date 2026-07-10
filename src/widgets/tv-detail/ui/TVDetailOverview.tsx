import type { ITV } from '@/entities'
import { MetaTagGroup } from '@/shared'

import type { ITVMoreInfo } from '../model'

interface TVDetailOverviewProps {
  tv: ITV
  tvMoreInfo: ITVMoreInfo
}

function TVDetailOverview({ tv, tvMoreInfo }: TVDetailOverviewProps) {
  return (
    <div className='mt-10 flex flex-col gap-20 text-white md:flex-row md:gap-10'>
      {tv.overview && (
        <div className='flex w-full flex-col gap-4 md:w-3/4'>
          <h3>줄거리</h3>
          <span>{tv.overview}</span>
        </div>
      )}
      <div className='flex w-full flex-col gap-4 md:w-1/4'>
        <MetaTagGroup
          label='출연'
          filter='cast'
          tags={tvMoreInfo.actors}
          type='tv'
        />
        <MetaTagGroup
          label='장르'
          filter='genre'
          tags={tvMoreInfo.genres}
          type='tv'
        />
        <MetaTagGroup
          label='감독'
          filter='crew'
          tags={tvMoreInfo.director ? [tvMoreInfo.director] : []}
          type='tv'
        />
      </div>
    </div>
  )
}

export default TVDetailOverview
