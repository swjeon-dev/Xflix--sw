import { API_ENDPOINT } from '@/shared/config/api'
import type { ITV } from '@/entities/tv'
import type { IGenre } from '@/shared'
import { GenreSection } from '@/widgets/genre'

import GenreTVCard from './GenreTVCard'

function GenreTVSection({ genres }: { genres: IGenre[] }) {
  return (
    <GenreSection<ITV>
      label='TV'
      genres={genres}
      endPoint={API_ENDPOINT.TV_FILTERED}
      allTitle='전체 TV'
      fallbackTitle='TV'
      renderItem={tv => <GenreTVCard key={tv.id} content={tv} />}
    />
  )
}

export default GenreTVSection
