import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'

import { DeferredWrapper, FloatingBackButton, LoadingComponent } from '@/shared'
import { useGetTV } from '@/entities/tv'
import { TVDetailSection, TVEpisodes } from '@/widgets/tv-detail'

const DETAIL_QUERY = { append_to_response: 'credits' }

function TVDetail() {
  const { id } = useParams()
  const { error, isLoading, tv } = useGetTV(id, DETAIL_QUERY)

  return (
    <>
      <Helmet>
        <title>{tv?.name || 'Detail'}</title>
      </Helmet>
      <article key={id}>
        {isLoading ? (
          <LoadingComponent style='relative min-h-[85vh] w-full main-page_px text-white' />
        ) : (
          <TVDetailSection tv={tv} error={error} />
        )}

        {tv?.seasons?.map(season => (
          <DeferredWrapper key={season.id}>
            <TVEpisodes
              tvId={id}
              seasonNumber={season.season_number}
              title={season.name}
              seasonMeta={{
                name: season.name,
                poster_path: season.poster_path,
                air_date: season.air_date,
              }}
            />
          </DeferredWrapper>
        ))}
      </article>

      <FloatingBackButton />
    </>
  )
}

export default TVDetail
