function Spinner() {
  return (
    <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-white mb-8' />
  )
}

export function SkeletonUI() {
  return <div className='w-full h-full rounded-sm bg-gray-800 animate-pulse' />
}

export function LoadingComponent({ style = '' }: { style?: string }) {
  return (
    <div className={`flex flex-col justify-center items-center ${style}`}>
      <Spinner />
      <p className='text-xl font-bold'>Loading...</p>
    </div>
  )
}

export function LoadingScreen() {
  return (
    <div className='fixed inset-0 flex flex-col justify-center items-center bg-black text-white z-50'>
      <Spinner />
      <p className='text-xl font-bold'>Loading...</p>
    </div>
  )
}

export function ListGridSkeleton() {
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
