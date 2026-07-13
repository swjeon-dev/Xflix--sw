import { useEffect, useState } from 'react'
import { cn, devLog } from '../lib'

interface IImageLazyLoadUI {
  lowUrl?: string
  highUrl?: string
  style?: string
  name?: string
}

function ImageLazyLoadUI({ lowUrl, highUrl, style, name }: IImageLazyLoadUI) {
  const [isHighImgLoad, setIsHighImgLoad] = useState(false)

  useEffect(() => {
    setIsHighImgLoad(false)
  }, [highUrl])

  function handleImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (e.currentTarget.complete) {
      setIsHighImgLoad(true)
    }
  }

  if (!lowUrl && !highUrl) {
    devLog({ message: 'backdrop 이미지가 없습니다' })
    return null
  }

  const highOpacity = isHighImgLoad ? 'opacity-100' : 'opacity-0'
  const BASE_CLASS = 'transition-opacity duration-700 ease-in-out'
  const className = cn(BASE_CLASS, style, highOpacity)

  return (
    <>
      {lowUrl && (
        <img
          {...{ fetchpriority: 'high' }}
          className={style}
          src={lowUrl}
          alt=''
          aria-hidden
        />
      )}
      {highUrl && (
        <img
          {...{ fetchpriority: 'high' }}
          key={highUrl}
          className={className}
          src={highUrl}
          alt={name}
          onLoad={handleImgLoad}
          onError={() => setIsHighImgLoad(false)}
          ref={el => {
            if (el?.complete && !isHighImgLoad) {
              setIsHighImgLoad(true)
            }
          }}
        />
      )}
    </>
  )
}

export default ImageLazyLoadUI
