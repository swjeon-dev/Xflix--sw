import { getTmdbImgPath } from '@/features/movies/utils/image'
import ImageLazyLoadUI from '@/shared/components/ui/ImageLazyLoadUI'

function MovieBackdrop({ path, title }: { path?: string; title: string }) {
  if (!path) return null

  return (
    <div className='absolute inset-0'>
      <ImageLazyLoadUI
        lowUrl={getTmdbImgPath({ path, size: 'w300' })}
        highUrl={getTmdbImgPath({ path, size: 'original' })}
        style='absolute inset-0 w-full h-full object-cover'
        name={title}
      />
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/0' />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent' />
    </div>
  )
}

export default MovieBackdrop
