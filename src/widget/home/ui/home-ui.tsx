import { HOME_MOVIE_CATEGORIES, HOME_TV_CATEGORIES } from '../config'
import { ContentsCarousel } from '@/widget/media'

function HomeUI() {
  return (
    <article>
      {HOME_MOVIE_CATEGORIES.map((category, idx) => (
        <ContentsCarousel
          key={idx}
          title={category.title}
          endPoint={category.endPoint}
          params={{ region: 'KR', page: 1 }}
        />
      ))}
      {HOME_TV_CATEGORIES.map((category, idx) => (
        <ContentsCarousel
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
