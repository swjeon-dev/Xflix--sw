import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

import { PageHelmet } from '@/shared'

function ErrorPage() {
  const error = useRouteError()

  let errorMessage = '알 수 없는 에러가 발생했습니다.'

  if (isRouteErrorResponse(error)) {
    errorMessage =
      error.statusText || '알 수 없는 페이지입니다. 경로를 확인해주세요.'
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  return (
    <main className='min-h-screen bg-black'>
      <PageHelmet
        title='오류'
        description='페이지를 불러오는 중 문제가 발생했습니다. XFlix 홈으로 이동해 주세요.'
        robots='noindex, follow'
      />
      <section className='w-screen min-h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-8 justify-center items-center px-8 py-10'>
          <p className='text-5xl text-white text-center leading-snug'>
            {errorMessage}
          </p>
          <Link
            to='/'
            className='text-2xl font-bold text-white bg-red-600 px-4 py-3 rounded-md'
            replace
          >
            홈으로
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ErrorPage
