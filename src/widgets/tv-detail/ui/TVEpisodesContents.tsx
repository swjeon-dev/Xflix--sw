import { useModal } from '@/shared'
import { EpisodePreviewItem, type ISeason, type IEpisode } from '@/entities/tv'
import { openEpisodesModal } from '../lib'

interface TVEpisodesContentsProps {
  season: ISeason
  previewCount?: number
}

function TVEpisodesContents({
  season,
  previewCount = 5,
}: TVEpisodesContentsProps) {
  const { openModal } = useModal()
  const previewEpisodes = season.episodes.slice(0, previewCount)
  const remainingCount = season.episodes.length - previewEpisodes.length

  return (
    <ul className='flex flex-col gap-2'>
      {previewEpisodes.map((episode: IEpisode) => (
        <EpisodePreviewItem
          key={episode.id}
          episode={episode}
          onClick={ep => openEpisodesModal(openModal, season, ep)}
        />
      ))}
      {remainingCount > 0 && (
        <li>
          <button
            type='button'
            className='w-full py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors'
            onClick={() => openEpisodesModal(openModal, season)}
          >
            + {remainingCount}화 더 보기
          </button>
        </li>
      )}
    </ul>
  )
}

export default TVEpisodesContents
