import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'

import { Modal, FloatingBackButton, LoadingComponent } from '@/shared'
import { EpisodesList, useGetTv } from '@/features/tv'
import { TVDetailSection } from '@/widget/tv-detail'
import { ISeason } from '@/entities/tv'

const DETAIL_QUERY = { append_to_response: 'credits' }

function TVDetail() {
  const { id } = useParams()
  const { error, isLoading, tv } = useGetTv(id!, DETAIL_QUERY)

  if (isLoading) {
    return (
      <LoadingComponent style='relative min-h-[85vh] w-full main-page_px text-white' />
    )
  }

  return (
    <>
      <Helmet>
        <title>{tv?.name || 'Detail'}</title>
      </Helmet>
      <article key={id}>
        <TVDetailSection tv={tv} error={error} />

        {tv?.seasons?.map((season: ISeason) => (
          <EpisodesList
            key={season.id}
            tvId={id!}
            seasonNumber={season.season_number}
            title={season.name}
          />
        ))}
      </article>
      <Modal>
        <FloatingBackButton />
      </Modal>
    </>
  )
}

export default TVDetail
