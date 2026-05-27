import { MovieCarousel } from '@/features/movies'
import { API_ENDPOINT } from '@/shared'

interface MovieRelatedContentProps {
  id: string
}

function MovieRelatedContent({ id }: MovieRelatedContentProps) {
  return (
    <>
      <MovieCarousel
        title='비슷한 장르 영화'
        endPoint={API_ENDPOINT.MOVIE_SIMILAR(id)}
      />
      <MovieCarousel
        title='추천하는 영화'
        endPoint={API_ENDPOINT.MOVIE_RECOMMEND(id)}
      />
    </>
  )
}

export default MovieRelatedContent
