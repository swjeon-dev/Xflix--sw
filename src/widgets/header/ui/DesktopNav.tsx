import { Link, useLocation } from 'react-router'

import isNavActive from '@/shared/lib/isNavActive'

import { NAV_ITEMS } from '../config/navItems'

function DesktopNav() {
  const { pathname } = useLocation()

  return (
    <ol className='hidden gap-8 sm:flex text-xl'>
      {NAV_ITEMS.map(item => (
        <li key={item.id}>
          <Link
            to={item.path}
            className={`hover:opacity-80 pb-2 ${isNavActive(pathname, item.path) && 'border-b-2 border-white'}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ol>
  )
}

export default DesktopNav
