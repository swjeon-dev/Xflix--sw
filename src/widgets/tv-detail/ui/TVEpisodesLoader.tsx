import { SkeletonUI } from '@/shared'

function TVEpisodesSkeleton() {
  return (
    <li className='p-3 rounded-lg bg-white/5' aria-hidden>
      <SkeletonUI />
    </li>
  )
}

function TVEpisodesLoader({ length }: { length: number }) {
  return (
    <ul className='flex flex-col gap-2'>
      {Array.from({ length }).map((_, i) => (
        <TVEpisodesSkeleton key={i} />
      ))}
    </ul>
  )
}

export default TVEpisodesLoader
