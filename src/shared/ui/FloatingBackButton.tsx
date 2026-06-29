import { ICONS } from '@/shared/assets/icons'
import { useNavigate } from 'react-router'

function FloatingBackButton() {
  const navigate = useNavigate()

  return (
    <button
      className='fixed top-20 left-4 md:left-10 rounded-full bg-black/60 backdrop-blur-sm text-white pl-2 pr-4 py-2 flex items-center gap-2 fill-white z-20'
      onClick={() => navigate(-1)}
    >
      {ICONS.leftArrow}
      <span>뒤로 가기</span>
    </button>
  )
}

export default FloatingBackButton
