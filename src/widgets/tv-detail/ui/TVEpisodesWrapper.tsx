interface TVEpisodesWrapperProps {
  title: string
  children: React.ReactNode
}

function TVEpisodesWrapper({ title, children }: TVEpisodesWrapperProps) {
  return (
    <section className='flex flex-col gap-4 py-10 text-white main-page_px'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {children}
    </section>
  )
}

export default TVEpisodesWrapper
