import { Helmet } from 'react-helmet-async'
import { FeaturedMovie } from '@/widget/featured-movie'
import { HOME_CATEGORIES } from '../features/movies/constants/home-categories'
import ContentsCarousel from '@/features/movies/components/contents-list'

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
            params={{ region: 'KR' }}
          />
        ))}
      </article>
    </section>
  )
}

export default Home
