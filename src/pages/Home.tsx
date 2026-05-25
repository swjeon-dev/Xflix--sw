import { Helmet } from 'react-helmet-async'
import { FeaturedMovie } from '@/widget/featured-movie'
import { HOME_MOVIE_CATEGORIES } from '@/features/movies/config/home-movie-categories'
import { HOME_TV_CATEGORIES } from '@/features/tv/config/home-tv-categories'
import MovieCarousel from '@/features/movies/ui/contents-list'
import TVCarousel from '@/features/tv/ui/contents-list'

function Home() {
  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <FeaturedMovie />
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
    </section>
  )
}

export default Home
