import ContentsCarousel from '@/features/movies/components/contents-list'
import { API_ENDPOINT } from '@/features/movies/api/config'
import type { IGenre } from '@/features/movies/types'
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
