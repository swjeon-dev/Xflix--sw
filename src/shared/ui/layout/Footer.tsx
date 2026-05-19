function Footer() {
  return (
    <footer className='w-full main-page_px mt-32 pb-8 text-left text-white/40 grid grid-rows-3 gap-4 sm:grid-cols-3 sm:grid-rows-1'>
      <ul>
        <li>
          <h2 className='font-semibold text-white/60'>회사 정보</h2>
        </li>
        <li>
          <span className='text-sm cursor-pointer'>회사 소개</span>
        </li>
        <li>
          <span className='text-sm cursor-pointer'>채용 정보</span>
        </li>
        <li>
          <span className='text-sm cursor-pointer'>홍보센터</span>
        </li>
      </ul>
      <ul>
        <li>
          <h2 className='font-semibold text-white/60'>고객 지원</h2>
        </li>
        <li>
          <span className='text-sm cursor-pointer'>고객 센터</span>
        </li>
        <li>
          <span className='text-sm cursor-pointer'>계정</span>
        </li>
        <li>
          <span className='text-sm cursor-pointer'>미디어 센터</span>
        </li>
      </ul>
      <ul>
        <li>
          <h2 className='font-semibold text-white/60'>문의 하기</h2>
        </li>
        <li>
          <span className='text-sm cursor-pointer'>FAQ</span>
        </li>
        <li>
          <span className='text-sm cursor-pointer'>투자 정보</span>
        </li>
      </ul>
      <p>&copy; {new Date().getFullYear()} XFlix, Ink.</p>{' '}
    </footer>
  )
}

export default Footer
