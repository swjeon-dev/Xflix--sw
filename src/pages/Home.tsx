import { Helmet } from 'react-helmet-async'

import { FeaturedMovie, MOVIE_CATEGORIES, TV_CATEGORIES } from '@/widgets/home'
import { MovieCarousel, TVCarousel } from '@/widgets/carousel'
import { DeferredWrapper } from '@/shared'

function Home() {
  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <FeaturedMovie />
      <article>
        {MOVIE_CATEGORIES.map((category, idx) =>
          idx === 0 ? (
            <MovieCarousel
              key={category.endPoint}
              title={category.title}
              endPoint={category.endPoint}
              params={{ region: 'KR', page: 1 }}
            />
          ) : (
            <DeferredWrapper key={category.endPoint}>
              <MovieCarousel
                title={category.title}
                endPoint={category.endPoint}
                params={{ region: 'KR', page: 1 }}
              />
            </DeferredWrapper>
          ),
        )}

        {TV_CATEGORIES.map(category => (
          <DeferredWrapper key={category.endPoint}>
            <TVCarousel
              title={category.title}
              endPoint={category.endPoint}
              params={{ region: 'KR', page: 1 }}
            />
          </DeferredWrapper>
        ))}
      </article>
    </section>
  )
}

export default Home
