import ContentsCarousel from '@/features/movies/ui/contents-list'
import { API_ENDPOINT } from '@/shared/config/api-config'
import type { IGenre } from '@/entities/movie/model'
import { getDiscoverSearchParams } from '../model/discover-params'

interface GenreMoviesListProps {
  lists: IGenre[]
  selected: number
}

function GenreMoviesList({ lists, selected }: GenreMoviesListProps) {
  return (
    <>
      {lists.map(genre => {
        if (selected !== 0 && selected !== genre.id) return null

        return (
          <ContentsCarousel
            key={genre.id}
            title={genre.name}
            endPoint={API_ENDPOINT.MOVIE_FILTERED}
            params={getDiscoverSearchParams(genre.id)}
          />
        )
      })}
    </>
  )
}

export default GenreMoviesList
