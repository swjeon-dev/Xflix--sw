import { Link } from 'react-router'

import { ICONS } from '@/shared/assets/icons'
import { routes } from '@/shared/config/routes'
import { useGetScrollY } from '@/shared'

import DesktopNav from './ui/DesktopNav'
import HeaderMenu from './ui/HeaderMenu'

function AppHeader() {
  const scrollY = useGetScrollY()
  const isScroll = scrollY > 20

  return (
    <header
      className={`fixed top-0 w-full flex items-center gap-16 p-4 z-20 transition-colors duration-500 ease-in-out
          ${!isScroll ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-black'}`}
    >
      <Link to={routes.ROOT} className='shrink-0'>
        {ICONS.logo}
      </Link>

      <nav className='flex w-full items-center text-white font-medium justify-end sm:justify-between'>
        <DesktopNav />
        <HeaderMenu />
      </nav>
    </header>
  )
}

export default AppHeader
