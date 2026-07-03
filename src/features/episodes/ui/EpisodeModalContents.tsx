import type { IEpisode } from '@/entities/tv'
import EpisodeCard from './EpisodeCard'

interface EpisodeModalContentsProps {
  episodes: IEpisode[]
  selectedEpisode: IEpisode | null
  onSelectEpisode: (episode: IEpisode | null) => void
}

function EpisodeModalContents({
  episodes,
  selectedEpisode,
  onSelectEpisode,
}: EpisodeModalContentsProps) {
  if (selectedEpisode) {
    return (
      <div className='overflow-y-auto flex-1 p-4'>
        <EpisodeCard episode={selectedEpisode} />
      </div>
    )
  }

  return (
    <ul className='overflow-y-auto flex-1 flex flex-col gap-2 p-4'>
      {episodes.map(episode => (
        <li key={episode.id}>
          <button
            type='button'
            className='w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors'
            onClick={() => onSelectEpisode(episode)}
          >
            <span className='font-medium'>
              {episode.episode_number}. {episode.name}
            </span>
            {episode.runtime != null && episode.runtime > 0 && (
              <span className='ml-2 text-sm text-white/50'>
                {episode.runtime}분
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default EpisodeModalContents
