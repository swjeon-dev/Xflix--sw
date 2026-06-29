interface TrailerErrorProps {
  error: string | null
}

function TrailerError({ error }: TrailerErrorProps) {
  return (
    <div className='absolute inset-0 flex items-center justify-center p-8 text-center text-white/80'>
      {error ?? '재생할 트레일러를 찾을 수 없습니다.'}
    </div>
  )
}

export default TrailerError
