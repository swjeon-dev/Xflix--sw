import { FeaturedMovie, MOVIE_CATEGORIES, TV_CATEGORIES } from '@/widgets/home'
import { MovieCarousel, TVCarousel } from '@/widgets/carousel'
import { DeferredWrapper, PageHelmet } from '@/shared'

function Home() {
  return (
    <section>
      <PageHelmet
        title='홈'
        description='인기 영화와 TV 프로그램, 개봉 예정작, 평점 높은 콘텐츠를 XFlix에서 한눈에 확인하세요.'
        keywords='영화, TV, 스트리밍, 인기 영화, 드라마, XFlix'
      />
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
