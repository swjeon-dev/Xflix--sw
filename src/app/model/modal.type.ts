import type { IEpisode } from '@/entities/tv'

type TrailerModalOpenProps = {
  contentId: number | string
  contentTitle: string
  mediaType: 'movie' | 'tv'
}

type EpisodesModalOpenProps = {
  seasonName: string
  episodes: IEpisode[]
  initialEpisode?: IEpisode | null
}

type ModalState =
  | { type: 'trailer'; props: TrailerModalOpenProps; className?: string }
  | { type: 'episodes'; props: EpisodesModalOpenProps; className?: string }
  | { type: 'search'; props?: undefined; className?: string }
  | { type: 'mobileNavigation'; props?: undefined; className?: string }

type ModalType = ModalState['type']

export type {
  ModalState,
  ModalType,
  TrailerModalOpenProps,
  EpisodesModalOpenProps,
}
