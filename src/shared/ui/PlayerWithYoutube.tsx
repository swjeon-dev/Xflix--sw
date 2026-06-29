import clsx from 'clsx'

interface PlayerWithYoutubeProps {
  title: string
  src: string
  className?: string
}

function PlayerWithYoutube({ title, src, className }: PlayerWithYoutubeProps) {
  const baseClassName = 'absolute inset-0 w-full h-full'

  return (
    <iframe
      title={title}
      src={src}
      className={clsx(baseClassName, className)}
      allow='encrypted-media; picture-in-picture'
      allowFullScreen
    />
  )
}

export default PlayerWithYoutube
