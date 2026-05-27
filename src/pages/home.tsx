import { Helmet } from 'react-helmet-async'
import { FeaturedMovie } from '@/widget/featured-movie'
import { HomeUI } from '@/widget/home'

function Home() {
  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <FeaturedMovie />
      <HomeUI />
    </section>
  )
}

export default Home
