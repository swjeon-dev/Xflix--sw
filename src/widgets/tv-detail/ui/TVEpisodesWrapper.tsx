interface TVEpisodesWrapperProps {
  title: string
  children: React.ReactNode
  sectionRef?: React.Ref<HTMLElement>
}

function TVEpisodesWrapper({
  title,
  children,
  sectionRef,
}: TVEpisodesWrapperProps) {
  return (
    <section
      ref={sectionRef}
      className='flex flex-col gap-4 py-10 text-white main-page_px'
    >
      <h2 className='text-2xl font-bold'>{title}</h2>
      {children}
    </section>
  )
}

export default TVEpisodesWrapper
