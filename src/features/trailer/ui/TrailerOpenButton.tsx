import { ICONS, useModal } from '@/shared'

interface TrailerOpenButtonProps {
  contentId: string
  contentTitle: string
  mediaType: 'movie' | 'tv'
}

function TrailerOpenButton({
  contentId,
  contentTitle,
  mediaType,
}: TrailerOpenButtonProps) {
  const { openModal } = useModal()

  return (
    <button
      type='button'
      aria-label='재생'
      className='p-2 bg-white/20 hover:bg-red-600 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center pointer-events-auto'
      onClick={() => {
        openModal({
          type: 'trailer',
          props: {
            contentId,
            contentTitle,
            mediaType,
          },
        })
      }}
    >
      <span className='w-5 h-5 fill-white flex items-center justify-center'>
        {ICONS.play}
      </span>
    </button>
  )
}

export default TrailerOpenButton
