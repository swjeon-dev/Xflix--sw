import { devLog, SkeletonUI } from '@/shared'

const GRID_CLASS =
  'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'

function GenreGridSkeleton() {
  return (
    <ul className={GRID_CLASS}>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className='aspect-[2/3]' aria-hidden>
          <SkeletonUI />
        </li>
      ))}
    </ul>
  )
}

interface GenreGridListProps<T> {
  listTitle: string
  items: T[]
  isLoading: boolean
  isFetchingMore: boolean
  error: string | null
  loaderRef: (node: HTMLElement | null) => void
  onRetry: () => void
  renderItem: (item: T) => React.ReactNode
}

function GenreGridList<T>({
  listTitle,
  items,
  isLoading,
  isFetchingMore,
  error,
  loaderRef,
  onRetry,
  renderItem,
}: GenreGridListProps<T>) {
  if (isLoading) {
    return (
      <section className='main-page_px pb-20'>
        <h2 className='mb-6 text-xl font-bold text-white'>{listTitle}</h2>
        <GenreGridSkeleton />
      </section>
    )
  }

  if (error) {
    devLog({ message: error, type: 'error' })
    return (
      <section className='main-page_px flex flex-col items-center gap-4 pb-20'>
        <p className='text-lg text-white/70'>
          {listTitle} 목록을 불러오지 못했습니다.
        </p>
        <button
          type='button'
          className='rounded border border-white/30 px-4 py-2 text-white'
          onClick={onRetry}
        >
          다시 시도
        </button>
      </section>
    )
  }

  if (items.length === 0) return null

  return (
    <section className='main-page_px pb-20'>
      <h2 className='mb-6 text-xl font-bold text-white'>{listTitle}</h2>
      <ul className={GRID_CLASS}>
        {items.map(item => renderItem(item))}
        {isFetchingMore &&
          Array.from({ length: 5 }).map((_, i) => (
            <li key={`loading-${i}`} className='aspect-[2/3]' aria-hidden>
              <SkeletonUI />
            </li>
          ))}
        <li
          ref={loaderRef}
          className='col-span-full h-4 w-full shrink-0'
          aria-hidden
        />
      </ul>
    </section>
  )
}

export default GenreGridList
