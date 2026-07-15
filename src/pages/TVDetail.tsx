import { useParams } from 'react-router'

import {
  DeferredWrapper,
  FloatingBackButton,
  LoadingComponent,
  PageHelmet,
  getTmdbImgPath,
} from '@/shared'
import { useGetTV } from '@/entities/tv'
import { TVDetailSection, TVEpisodes } from '@/widgets/tv-detail'

const DETAIL_QUERY = { append_to_response: 'credits' }

function TVDetail() {
  const { id } = useParams()
  const { error, isLoading, tv } = useGetTV(id, DETAIL_QUERY)

  const title = tv?.name ?? 'TV 상세'
  const description =
    tv?.overview ||
    `${title}의 상세 정보, 출연진, 에피소드를 XFlix에서 확인하세요.`
  const keywords = tv?.genres?.map(genre => genre.name).join(', ')
  const image = getTmdbImgPath({
    path: tv?.backdrop_path ?? tv?.poster_path,
    size: 'w1280',
  })

  return (
    <>
      <PageHelmet
        title={title}
        description={description}
        keywords={keywords}
        ogType='video.tv_show'
        image={image}
      />
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
