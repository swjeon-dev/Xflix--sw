import { SkeletonUI, devLog, type SearchMediaType } from '@/shared'
import type { ISearchData } from '../model'
import SearchCard from './SearchCard'

interface SearchResultsProps {
  type: SearchMediaType
  items: ISearchData[]
  isLoading: boolean
  isFetchingMore: boolean
  error: string | null
  loaderRef?: (node: HTMLElement | null) => void
  emptyMessage: string
  onRetry: () => void
}

function SearchGridSkeleton() {
  return (
    <ul className='grid grid-cols-2 gap-4 [overflow-anchor:none] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className='aspect-[2/3]' aria-hidden>
          <SkeletonUI />
        </li>
      ))}
    </ul>
  )
}

function SearchList({
  type,
  items,
  isLoading,
  isFetchingMore,
  error,
  loaderRef,
  emptyMessage,
  onRetry,
}: SearchResultsProps) {
  if (isLoading) {
    return <SearchGridSkeleton />
  }

  if (error) {
    devLog({ message: error, type: 'error' })
    return (
      <div className='flex flex-col items-center gap-4 py-16'>
        <p className='text-lg text-white/70'>
          검색 결과를 불러오지 못했습니다.
        </p>
        <button
          type='button'
          className='rounded border border-white/30 px-4 py-2 text-white hover:bg-white/10'
          onClick={onRetry}
        >
          다시 시도
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <p className='py-16 text-center text-lg text-white/60'>{emptyMessage}</p>
    )
  }

  return (
    <ul className='grid grid-cols-2 gap-4 [overflow-anchor:none] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {items.map(item => (
        <SearchCard key={`${type}-${item.id}`} type={type} item={item} />
      ))}
      {isFetchingMore &&
        Array.from({ length: 5 }).map((_, i) => (
          <li key={`loading-${i}`} className='aspect-[2/3]' aria-hidden>
            <SkeletonUI />
          </li>
        ))}
      {loaderRef && (
        <li
          ref={loaderRef}
          className='col-span-full h-4 w-full shrink-0'
          aria-hidden
        />
      )}
    </ul>
  )
}

export default SearchList
