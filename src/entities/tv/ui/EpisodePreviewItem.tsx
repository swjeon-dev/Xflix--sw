import { getTmdbImgPath } from '@/shared/lib'
import type { IEpisode } from '../model/season.types'

export function EpisodePreviewItem({
  episode,
  onClick,
}: {
  episode: IEpisode
  onClick: (episode: IEpisode) => void
}) {
  const thumbUrl = getTmdbImgPath({ path: episode.still_path, size: 'w154' })

  return (
    <li>
      <button
        type='button'
        className='w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left'
        onClick={() => onClick(episode)}
      >
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt=''
            className='w-16 h-10 rounded object-cover shrink-0 bg-gray-800'
          />
        ) : (
          <div className='w-16 h-10 rounded bg-gray-800 shrink-0 flex items-center justify-center text-xs text-white/40'>
            {episode.episode_number}
          </div>
        )}
        <span className='min-w-0 flex-1 truncate text-sm text-white'>
          <span className='text-white/50 mr-2'>{episode.episode_number}화</span>
          {episode.name}
        </span>
      </button>
    </li>
  )
}
