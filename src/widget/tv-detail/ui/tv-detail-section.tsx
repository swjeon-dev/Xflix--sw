import { ITV } from '@/entities'
import { getTVMoreInfo } from '../model'
import TVDetailHero from './tv-detail-hero'
import TVDetailOverview from './tv-detail-overview'

interface TVDetailSectionProps {
  tv: ITV | null
  error: string | null
}

function TVDetailSection({ tv, error }: TVDetailSectionProps) {
  if (!tv && error) {
    throw new Error(error || '현재 TV 정보를 가져올 수 없습니다')
  }

  if (!tv) return null

  const tvMoreInfo = getTVMoreInfo(tv)

  return (
    <div className='pb-10 *:main-page_px'>
      <TVDetailHero tv={tv} />
      <TVDetailOverview tv={tv} tvMoreInfo={tvMoreInfo} />
    </div>
  )
}

export default TVDetailSection
