import { useGenre } from '@/entities/genre'
import type { IMovie } from '@/entities/movie'
import { API_ENDPOINT, PageHelmet } from '@/shared'
import { GenreMovieCard } from '@/widgets/genre-movie'
import { GenreSection } from '@/widgets/genre-section'

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
        <GenreSection<IMovie>
          label='영화'
          genres={movieGenres}
          endPoint={API_ENDPOINT.MOVIE_FILTERED}
          allTitle='전체 영화'
          fallbackTitle='영화'
          renderItem={movie => (
            <GenreMovieCard key={movie.id} content={movie} />
          )}
        />
      </section>
    </>
  )
}

export default Movie
