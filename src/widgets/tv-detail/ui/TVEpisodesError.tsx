interface TVEpisodesErrorProps {
  onRetry?: () => void
}

function TVEpisodesError({ onRetry }: TVEpisodesErrorProps) {
  return (
    <div className='flex flex-col gap-4 items-center py-8'>
      <p className='text-lg text-white/70'>
        에피소드 목록을 불러오지 못했습니다.
      </p>
      {onRetry && (
        <button
          type='button'
          className='px-4 py-2 rounded bg-white/10 hover:bg-white/20'
          onClick={onRetry}
        >
          다시 시도
        </button>
      )}
    </div>
  )
}

export default TVEpisodesError
