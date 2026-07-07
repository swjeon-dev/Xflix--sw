import { Helmet } from 'react-helmet-async'

import { GenreTVSection } from '@/widgets/genre-tv'
import { useGenre } from '@/entities/genre'

function TV() {
  const { tvGenres } = useGenre()

  return (
    <>
      <Helmet>
        <title>TV 목록</title>
      </Helmet>
      <section>
        <GenreTVSection genres={tvGenres} />
      </section>
    </>
  )
}

export default TV
