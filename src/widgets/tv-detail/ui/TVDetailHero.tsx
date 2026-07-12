import { AdultUI, ICONS } from '@/shared'
import { useModal } from '@/shared'
import type { ITV } from '@/entities/tv'
import TVBackdrop from './TVBackdrop'

interface TVDetailHeroProps {
  tv: ITV
  airingDate: string | null
}

function TVDetailHero({ tv, airingDate }: TVDetailHeroProps) {
  const { openModal } = useModal()

  return (
    <div className='relative min-h-[85vh] w-full flex gap-4'>
      <div className='text-white z-10 flex flex-col gap-6 justify-end pb-8 md:pb-16'>
        <h1 className='font-semibold text-4xl md:text-6xl text-balance'>
          {tv.name}
        </h1>
        <div className='flex gap-4 text-base md:text-lg'>
          {tv.adult && <AdultUI />}
          {airingDate && <span>{airingDate}</span>}
        </div>
        <div className='flex gap-3'>
          <button
            type='button'
            className='px-3 md:px-4 py-4 flex gap-2 items-center rounded-md bg-gray-200 text-black hover:bg-gray-200/95 text-sm'
            onClick={() =>
              openModal({
                type: 'trailer',
                props: {
                  contentId: tv.id,
                  contentTitle: tv.name,
                  mediaType: 'tv',
                },
              })
            }
          >
            {ICONS.play}
            <span className='text-lg font-semibold'>재생</span>
          </button>
        </div>
        <div className='absolute -bottom-6 left-[50%] translate-x-[-50%] animate-tongtong'>
          {ICONS.chevronDown}
        </div>
      </div>
      <TVBackdrop path={tv.backdrop_path} title={tv.name} />
    </div>
  )
}

export default TVDetailHero
