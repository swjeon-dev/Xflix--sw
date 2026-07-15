import { GenreTVSection } from '@/widgets/genre-tv'
import { useGenre } from '@/entities/genre'
import { PageHelmet } from '@/shared'

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
        <GenreTVSection genres={tvGenres} />
      </section>
    </>
  )
}

export default TV
