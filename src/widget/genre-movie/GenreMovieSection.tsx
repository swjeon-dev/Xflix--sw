import { API_ENDPOINT } from '@/shared/config/api'
import type { IGenre } from '@/shared'
import type { IMovie } from '@/entities/movie'
import { GenreSection } from '@/widget/genre'

import GenreMovieCard from './GenreMovieCard'

function GenreMovieSection({ genres }: { genres: IGenre[] }) {
  return (
    <GenreSection<IMovie>
      label='영화'
      genres={genres}
      endPoint={API_ENDPOINT.MOVIE_FILTERED}
      allTitle='전체 영화'
      fallbackTitle='영화'
      renderItem={movie => <GenreMovieCard key={movie.id} content={movie} />}
    />
  )
}

export default GenreMovieSection
