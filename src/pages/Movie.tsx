import { GenreMovieSection } from '@/widgets/genre-movie'
import { useGenre } from '@/entities/genre'
import { PageHelmet } from '@/shared'

function Movie() {
  const { movieGenres } = useGenre()

  return (
    <>
      <PageHelmet
        title='영화 목록'
        description='장르별 영화를 XFlix에서 탐색하세요. 인기작부터 다양한 장르의 영화를 한눈에 확인하세요.'
        keywords='영화, 목록, 장르, XFlix'
      />
      <section>
        <GenreMovieSection genres={movieGenres} />
      </section>
    </>
  )
}

export default Movie
