import { Link, useLocation } from 'react-router'

import { Modal, isNavActive } from '@/shared'

interface MobileModalNavigationProps {
  isOpen: boolean
  onClose: () => void
  menu: ReadonlyArray<{ id: number; label: string; path: string }>
}

function MobileModalNavigation({
  menu,
  isOpen,
  onClose,
}: MobileModalNavigationProps) {
  const { pathname } = useLocation()

  if (!isOpen) return null

  return (
    <Modal>
      <div
        className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white font-medium'
        role='dialog'
        aria-modal='true'
        aria-label='모바일 메뉴'
      >
        <button
          type='button'
          className='absolute top-5 right-5 p-2 text-2xl hover:opacity-80'
          aria-label='메뉴 닫기'
          onClick={onClose}
        >
          X
        </button>

        <ol className='flex flex-col items-center gap-10 w-full main-page_px'>
          {menu.map(item => (
            <li key={item.id}>
              <Link
                to={item.path}
                onClick={onClose}
                className={`text-6xl hover:opacity-80 pb-4 ${isNavActive(pathname, item.path) && 'border-b-2 border-white'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Modal>
  )
}

export default MobileModalNavigation
