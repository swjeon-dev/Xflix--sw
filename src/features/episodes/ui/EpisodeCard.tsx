import { getTmdbImgPath } from '@/shared/lib'
import type { IEpisode } from '@/entities/tv'

function formatRuntime(minutes: number | null) {
  if (minutes == null || minutes === 0) return null
  return `${minutes}분`
}

function EpisodeStill({
  episode,
  className = 'w-full aspect-video rounded-md object-cover bg-gray-800',
}: {
  episode: IEpisode
  className?: string
}) {
  const stillUrl = getTmdbImgPath({ path: episode.still_path, size: 'w500' })

  if (!stillUrl) {
    return (
      <div
        className={`${className} flex items-center justify-center text-white/50 text-sm bg-gray-800`}
        aria-hidden
      >
        No Image
      </div>
    )
  }

  return (
    <img
      className={className}
      src={stillUrl}
      alt={episode.name}
      loading='lazy'
    />
  )
}

function EpisodeMeta({ episode }: { episode: IEpisode }) {
  const runtime = formatRuntime(episode.runtime)

  return (
    <div className='flex flex-col gap-2 min-w-0 flex-1'>
      <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
        <span className='text-lg font-semibold text-white'>
          {episode.episode_number}. {episode.name}
        </span>
        {episode.episode_type === 'finale' && (
          <span className='text-xs px-2 py-0.5 rounded bg-red-600/80 text-white'>
            시즌 피날레
          </span>
        )}
      </div>
      <div className='flex flex-wrap gap-3 text-sm text-white/60'>
        {episode.air_date && <span>{episode.air_date}</span>}
        {runtime && <span>{runtime}</span>}
        {episode.vote_average > 0 && (
          <span>★ {episode.vote_average.toFixed(1)}</span>
        )}
      </div>
      {episode.overview && (
        <p className='text-sm text-white/80'>{episode.overview}</p>
      )}
      {episode.guest_stars.length > 0 && (
        <p className='text-xs text-white/50'>
          출연:{' '}
          {episode.guest_stars
            .slice(0, 5)
            .map(star => star.name)
            .join(', ')}
          {episode.guest_stars.length > 5 ? ' 외' : ''}
        </p>
      )}
    </div>
  )
}

function EpisodeCard({ episode }: { episode: IEpisode }) {
  return (
    <article className='flex flex-col gap-4'>
      <EpisodeStill episode={episode} />
      <EpisodeMeta episode={episode} />
    </article>
  )
}

export default EpisodeCard
