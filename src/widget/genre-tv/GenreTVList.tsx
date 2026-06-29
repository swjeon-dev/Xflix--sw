import {
  API_ENDPOINT,
  devLog,
  SkeletonUI,
  useGetContents,
  useListInfiniteScroll,
  type IGenre,
  getAllSearchParams,
  getSearchParams,
} from '@/shared'
import type { ITV } from '@/entities/tv'

import GenreTVCard from './GenreTVCard'

interface GenreTVListProps {
  genres: IGenre[]
  selected: number
}

function GenreTVGridSkeleton() {
  return (
    <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className='aspect-[2/3]' aria-hidden>
          <SkeletonUI />
        </li>
      ))}
    </ul>
  )
}

function GenreTVList({ genres, selected }: GenreTVListProps) {
  const selectedGenre = genres.find(genre => genre.id === selected)
  const params =
    selected === 0 ? getAllSearchParams() : getSearchParams(selected)

  const { loaderRef, contents, isLoading, isFetchingMore, error, refetch } =
    useListInfiniteScroll<ITV>({
      endPoint: API_ENDPOINT.TV_FILTERED,
      params,
      direction: 'vertical',
      useContents: useGetContents<ITV>,
    })

  const listTitle = selected === 0 ? '전체 TV' : (selectedGenre?.name ?? 'TV')

  if (isLoading) {
    return (
      <section className='main-page_px pb-20'>
        <h2 className='mb-6 text-xl font-bold text-white'>{listTitle}</h2>
        <GenreTVGridSkeleton />
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
          onClick={refetch}
        >
          다시 시도
        </button>
      </section>
    )
  }

  if (contents.length === 0) return null

  return (
    <section className='main-page_px pb-20'>
      <h2 className='mb-6 text-xl font-bold text-white'>{listTitle}</h2>
      <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {contents.map(content => (
          <GenreTVCard key={content.id} content={content} />
        ))}
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

export default GenreTVList
