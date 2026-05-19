import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import Modal from '@/shared/components/ui/Modal'
import { LoadingComponent } from '@/shared/components/ui/LoadingScreen'
import { API_ENDPOINT } from '@/features/movies/api/config'
import ContentsList from '@/features/movies/components/contents-list'
import useGetMovie from '@/features/movies/hooks/useGetMovie'
import {
  FloatingBackButton,
  MovieDetailSection,
} from '@/widget/movie-detail'

const DETAIL_QUERY = { append_to_response: 'credits' }

function MovieDetail() {
  const { id } = useParams()
  const { error, isLoading, movie } = useGetMovie(id!, DETAIL_QUERY)

  if (isLoading) {
    return (
      <LoadingComponent style='relative min-h-[85vh] w-full main-page_px text-white' />
    )
  }

  return (
    <>
      <Helmet>
        <title>{movie?.title || 'Detail'}</title>
      </Helmet>
      <article key={id}>
        <MovieDetailSection
          movie={movie}
          error={error}
        />
        <ContentsList
          title='비슷한 장르 영화'
          endPoint={API_ENDPOINT.MOVIE_SIMILAR(id!)}
        />
        <ContentsList
          title='추천하는 영화'
          endPoint={API_ENDPOINT.MOVIE_RECOMMEND(id!)}
        />
      </article>
      <Modal>
        <FloatingBackButton />
      </Modal>
    </>
  )
}

export default MovieDetail
