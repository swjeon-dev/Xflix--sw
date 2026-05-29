import { Helmet } from 'react-helmet-async'
import { getTVMoreInfo } from '@/widget/tv-detail'
import TVDetailHero from './tv-detail-hero'
import TVDetailOverview from './tv-detail-overview'
import { LoadingComponent } from '@/shared'
import type { ISeason } from '@/entities/tv'
import { useGetTV } from '@/widget/tv-detail'
import { EpisodesList } from './episodes'

interface TVDetailSectionProps {
  id: string
}

const DETAIL_QUERY = { append_to_response: 'credits' }

function TVDetailSection({ id }: TVDetailSectionProps) {
  const { error, isLoading, tv } = useGetTV(id, DETAIL_QUERY)
  if (isLoading) {
    return (
      <LoadingComponent style='relative min-h-[85vh] w-full main-page_px text-white' />
    )
  }
  if (!tv && error)
    throw new Error(error || '현재 TV 정보를 가져올 수 없습니다')
  if (!tv) return null
  const tvMoreInfo = getTVMoreInfo(tv)
  return (
    <>
      <Helmet>
        <title>{tv?.name || 'Detail'}</title>
      </Helmet>
      <div className='pb-10 *:main-page_px'>
        <TVDetailHero tv={tv} />
        <TVDetailOverview tv={tv} tvMoreInfo={tvMoreInfo} />
      </div>
      {tv?.seasons?.map((season: ISeason) => (
        <EpisodesList
          key={season.id}
          tvId={id!}
          seasonNumber={season.season_number}
          title={season.name}
        />
      ))}
    </>
  )
}

export default TVDetailSection
