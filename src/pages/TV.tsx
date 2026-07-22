import { useGenre } from '@/entities/genre'
import type { ITV } from '@/entities/tv'
import { API_ENDPOINT, PageHelmet } from '@/shared'
import { GenreSection } from '@/widgets/genre-section'
import { GenreTVCard } from '@/widgets/genre-tv'

function TV() {
  const { tvGenres } = useGenre()

  return (
    <>
      <PageHelmet
        title='TV 목록'
        description='장르별 TV 프로그램을 XFlix에서 탐색하세요. 인기작부터 다양한 장르의 드라마를 한눈에 확인하세요.'
        keywords='TV, 목록, 장르, 드라마, XFlix'
      />
      <section>
        <GenreSection<ITV>
          label='TV'
          genres={tvGenres}
          endPoint={API_ENDPOINT.TV_FILTERED}
          allTitle='전체 TV'
          fallbackTitle='TV'
          renderItem={tv => <GenreTVCard key={tv.id} content={tv} />}
        />
      </section>
    </>
  )
}

export default TV
