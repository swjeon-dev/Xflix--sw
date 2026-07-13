import { getTmdbImgPath } from '@/shared'

interface TVEpisodesHeaderProps {
  seasonName: string | null
  posterPath: string | null
  episodeCount: number
  airDate: string
  onOpenAll: () => void
  isOpenDisabled?: boolean
}

function TVEpisodesHeader({
  seasonName,
  posterPath,
  episodeCount,
  airDate,
  onOpenAll,
  isOpenDisabled,
}: TVEpisodesHeaderProps) {
  const posterUrl = getTmdbImgPath({ path: posterPath, size: 'w154' })

  return (
    <div className='flex flex-wrap gap-4 items-center justify-between mb-2'>
      <div className='flex gap-4 items-start'>
        {posterUrl && (
          <img
            loading='lazy'
            decoding='async'
            src={posterUrl}
            alt={`${seasonName} 시즌 포스터`}
            className='w-24 md:w-32 rounded-md object-cover shrink-0'
          />
        )}
        <div className='flex flex-col gap-1'>
          <h3 className='text-xl font-semibold'>{seasonName}</h3>
          <p className='text-sm text-white/60'>
            {episodeCount}화{airDate ? ` · ${airDate.split('-')[0]}` : ''}
          </p>
        </div>
      </div>
      <button
        type='button'
        disabled={isOpenDisabled}
        className='px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm shrink-0 disabled:cursor-not-allowed disabled:opacity-50'
        onClick={onOpenAll}
      >
        에피소드 목록 ({episodeCount}화)
      </button>
    </div>
  )
}

export default TVEpisodesHeader
