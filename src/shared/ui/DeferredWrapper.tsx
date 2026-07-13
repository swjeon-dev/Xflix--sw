import { useInView } from '../model'

function DeferredWrapper({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className='min-h-[280px]'>
      {inView ? children : null}
    </div>
  )
}

export default DeferredWrapper
