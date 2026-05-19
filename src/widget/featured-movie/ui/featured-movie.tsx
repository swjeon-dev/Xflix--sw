// featuredMovie 책임 분리를 위한 컴포넌트
import { Link, useNavigate } from 'react-router'
import { ICONS } from '@/shared/assets/icons'
import { devLog } from '@/shared/utils'
import { LoadingComponent } from '@/shared/components/ui/LoadingScreen'
import useGetFeaturedMovie from '@/widget/featured-movie/model/get-featured-movie'

function FeaturedMovie() {
  const navigate = useNavigate()

  const { isLoading, error, featuredContent } = useGetFeaturedMovie()

  if (isLoading) {
    return (
      <LoadingComponent style='flex justify-center items-center h-[80vh] w-full overflow-hidden bg-black text-white' />
    )
  }

  if (error) {
    devLog({ message: error, type: 'error' })
    return null
  }

  if (!featuredContent?.backdropUrl) return null

  return (
    <article className='relative h-[80vh] w-full'>
      <Link
        to={featuredContent.detailUrl}
        className='absolute inset-0 z-0'
        aria-label={`${featuredContent.title} 상세 페이지로 이동`}
      >
        <div className='absolute inset-0'>
          <img
            src={featuredContent.backdropUrl}
            alt={`${featuredContent.title} 포스터`}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent' />
        </div>
        <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent' />
      </Link>

      <div className='pointer-events-none relative w-full lg:w-1/2 h-full flex flex-col justify-end pb-8 md:pb-16 main-page_px'>
        <h1 className='text-4xl md:text-6xl mb-4 text-white drop-shadow-lg'>
          {featuredContent.title}
        </h1>
        <p className='text-base md:text-lg text-white/90 mb-8 line-clamp-3 drop-shadow-md'>
          {featuredContent.overview}
        </p>
        <div className='flex gap-4 hover:*:opacity-80'>
          <button className='pointer-events-auto flex items-center gap-2 px-3 md:px-5 py-3 rounded-md font-bold bg-white hover:bg-white/90 whitespace-nowrap'>
            {ICONS.play} <span>재생</span>
          </button>
          <button
            className='pointer-events-auto flex gap-2 px-3 md:px-4 py-3 rounded bg-gray-400 text-white font-bold'
            onClick={() => navigate(featuredContent.detailUrl)}
          >
            {ICONS.info} <span>상세 정보</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default FeaturedMovie
