import { Link, useLocation } from 'react-router'

import { isNavActive } from '@/shared'
import { NAV_ITEMS } from '../header'

interface MobileNavigationModalContentsProps {
  onClose: () => void
}

function MobileNavigationModalContents({
  onClose,
}: MobileNavigationModalContentsProps) {
  const { pathname } = useLocation()

  return (
    <ol className='flex w-full flex-col items-center gap-10 main-page_px'>
      {NAV_ITEMS.map(item => (
        <li key={item.id}>
          <Link
            to={item.path}
            onClick={onClose}
            className={`pb-4 text-6xl hover:opacity-80 ${isNavActive(pathname, item.path) && 'border-b-2 border-white'}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ol>
  )
}

export default MobileNavigationModalContents
