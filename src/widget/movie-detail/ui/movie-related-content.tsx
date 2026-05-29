import { ContentsCarousel } from '@/widget/media'
import { API_ENDPOINT } from '@/shared'

interface MovieRelatedContentProps {
  id: string
}

const MOVIE_RELATED_CONTENT_CATEGORIES = [
  {
    title: '비슷한 장르 영화',
    endPoint: (id: string) => API_ENDPOINT.MOVIE_SIMILAR(id),
  },
  {
    title: '추천하는 영화',
    endPoint: (id: string) => API_ENDPOINT.MOVIE_RECOMMEND(id),
  },
]

function MovieRelatedContent({ id }: MovieRelatedContentProps) {
  return MOVIE_RELATED_CONTENT_CATEGORIES.map((content, idx) => (
    <ContentsCarousel
      key={idx}
      title={content.title}
      endPoint={content.endPoint(id)}
    />
  ))
}

export default MovieRelatedContent
