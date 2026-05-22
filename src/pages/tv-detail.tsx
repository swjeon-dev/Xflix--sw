import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import Modal from '@/shared/ui/Modal'
import { FloatingBackButton } from '@/widget/movie-detail'

function TVDetail() {
  const { id } = useParams()

  return (
    <>
      <Helmet>
        <title>TV 상세</title>
      </Helmet>
      <article key={id} className='min-h-[85vh] main-page_px text-white'>
        <p>TV 상세 페이지 (준비 중)</p>
      </article>
      <Modal>
        <FloatingBackButton />
      </Modal>
    </>
  )
}

export default TVDetail
