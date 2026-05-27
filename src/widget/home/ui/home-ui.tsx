import { HOME_MOVIE_CATEGORIES } from '@/features/movies/config'
import { HOME_TV_CATEGORIES } from '@/features/tv/config'
import { MovieCarousel } from '@/features/movies/ui'
import { TVCarousel } from '@/features/tv/ui'

function HomeUI() {
  return (
    <article>
      {HOME_MOVIE_CATEGORIES.map((category, idx) => (
        <MovieCarousel
          key={idx}
          title={category.title}
          endPoint={category.endPoint}
          params={{ region: 'KR', page: 1 }}
        />
      ))}
      {HOME_TV_CATEGORIES.map((category, idx) => (
        <TVCarousel
          key={idx}
          title={category.title}
          endPoint={category.endPoint}
          params={{ region: 'KR', page: 1 }}
        />
      ))}
    </article>
  )
}

export default HomeUI
