import { Helmet } from 'react-helmet-async'

import { FeaturedMovie, MOVIE_CATEGORIES, TV_CATEGORIES } from '@/widgets/home'
import { MovieCarousel, TVCarousel } from '@/widgets/carousel'

function Home() {
  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <FeaturedMovie />
      <article>
        {MOVIE_CATEGORIES.map((category, idx) => (
          <MovieCarousel
            key={idx}
            title={category.title}
            endPoint={category.endPoint}
            params={{ region: 'KR', page: 1 }}
          />
        ))}

        {TV_CATEGORIES.map((category, idx) => (
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
