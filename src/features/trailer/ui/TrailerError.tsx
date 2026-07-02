type TrailerFeedbackVariant = 'empty' | 'error'

interface TrailerErrorProps {
  variant: TrailerFeedbackVariant
  message?: string | null
}

const DEFAULT_MESSAGES: Record<TrailerFeedbackVariant, string> = {
  empty: '등록된 영상이 없습니다.',
  error: '영상 정보를 불러오지 못했습니다.',
}

function TrailerError({ variant, message }: TrailerErrorProps) {
  return (
    <div className='absolute inset-0 flex items-center justify-center p-8 text-center text-white/80'>
      {message ?? DEFAULT_MESSAGES[variant]}
    </div>
  )
}

export default TrailerError
