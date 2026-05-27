import { useParams } from 'react-router'
import { Modal } from '@/shared'

import { TVDetailSection } from '@/widget/tv-detail'
import { FloatingBackButton } from '@/shared'
import { MovieDetailSection } from '@/widget/movie-detail'

interface DetailProps {
  type: 'movie' | 'tv'
}

function Detail({ type }: DetailProps) {
  const { id } = useParams() as { id: string }

  return (
    <>
      <article key={id}>
        {type === 'movie' ? (
          <MovieDetailSection id={id} />
        ) : (
          <TVDetailSection id={id} />
        )}
      </article>
      <Modal>
        <FloatingBackButton />
      </Modal>
    </>
  )
}

export default Detail
