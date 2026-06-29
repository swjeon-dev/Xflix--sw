import { Helmet } from 'react-helmet-async'
import { useRouteLoaderData } from 'react-router'

import { GenreTVSection } from '@/widget/genre-tv'
import { type IGenre } from '@/shared'

const LOADER_ID = 'root'

function TV() {
  const {
    genres: { tvGenres },
  } = useRouteLoaderData(LOADER_ID) as { genres: { tvGenres: IGenre[] } }

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
