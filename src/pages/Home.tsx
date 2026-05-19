import { Helmet } from 'react-helmet-async'
import { FeaturedMovie } from '@/widget/featured-movie'
import { HOME_CATEGORIES } from '../features/movies/config/home-categories'
import ContentsCarousel from '@/features/movies/ui/contents-list'

function Home() {
  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <FeaturedMovie />
      <article>
        {HOME_CATEGORIES.map(category => (
          <ContentsCarousel
            key={category.id}
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
