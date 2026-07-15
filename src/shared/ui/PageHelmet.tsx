import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'XFlix'

type PageHelmetProps = {
  title: string
  description: string
  ogType?: 'website' | 'video.movie' | 'video.tv_show'
  image?: string
  robots?: 'index, follow' | 'noindex, follow'
  keywords?: string
}

function PageHelmet({
  title,
  description,
  ogType = 'website',
  image,
  robots = 'index, follow',
  keywords,
}: PageHelmetProps) {
  const ogTitle = `${title} | ${SITE_NAME}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      {keywords ? <meta name='keywords' content={keywords} /> : null}
      <meta name='robots' content={robots} />
      <meta property='og:type' content={ogType} />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={SITE_NAME} />
      <meta property='og:locale' content='ko_KR' />
      {image ? <meta property='og:image' content={image} /> : null}
      <meta
        name='twitter:card'
        content={image ? 'summary_large_image' : 'summary'}
      />
      <meta name='twitter:title' content={ogTitle} />
      <meta name='twitter:description' content={description} />
      {image ? <meta name='twitter:image' content={image} /> : null}
    </Helmet>
  )
}

export default PageHelmet
