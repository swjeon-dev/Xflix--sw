import { useModal } from '@/shared'
import type { ISeason, IEpisode } from '@/entities/tv'

function openEpisodesModal(
  openModal: ReturnType<typeof useModal>['openModal'],
  season: ISeason,
  episode: IEpisode | null = null,
) {
  openModal({
    type: 'episodes',
    props: {
      seasonName: season.name,
      episodes: season.episodes,
      initialEpisode: episode,
    },
  })
}

export default openEpisodesModal
