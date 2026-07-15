import { useParams } from 'react-router'

import {
  DeferredWrapper,
  FloatingBackButton,
  LoadingComponent,
  PageHelmet,
  getTmdbImgPath,
} from '@/shared'
import { API_ENDPOINT } from '@/shared/config/api'
import { useGetMovie } from '@/entities/movie'
import { MovieDetailSection } from '@/widgets/movie-detail'
import { MovieCarousel } from '@/widgets/carousel'

const DETAIL_QUERY = { append_to_response: 'credits' }

function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const { error, isLoading, movie } = useGetMovie(id, DETAIL_QUERY)

  const title = movie?.title ?? '영화 상세'
  const description =
    movie?.overview ||
    `${title}의 상세 정보, 출연진, 비슷한 영화를 XFlix에서 확인하세요.`
  const keywords = movie?.genres?.map(genre => genre.name).join(', ')
  const image = getTmdbImgPath({
    path: movie?.backdrop_path ?? movie?.poster_path,
    size: 'w1280',
  })

  return (
    <>
      <PageHelmet
        title={title}
        description={description}
        keywords={keywords}
        ogType='video.movie'
        image={image}
      />
      <article key={id}>
        {isLoading ? (
          <LoadingComponent style='relative min-h-[85vh] w-full main-page_px text-white' />
        ) : (
          <MovieDetailSection movie={movie} error={error} />
        )}
        <MovieCarousel
          title='비슷한 장르 영화'
          endPoint={API_ENDPOINT.MOVIE_SIMILAR(id ?? '')}
          params={{ region: 'KR', page: 1 }}
        />
        <DeferredWrapper>
          <MovieCarousel
            title='추천하는 영화'
            endPoint={API_ENDPOINT.MOVIE_RECOMMEND(id ?? '')}
            params={{ region: 'KR', page: 1 }}
          />
        </DeferredWrapper>
      </article>

      <FloatingBackButton />
    </>
  )
}

export default MovieDetail
