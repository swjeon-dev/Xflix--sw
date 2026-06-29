import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

import { ICONS } from '@/shared/assets/icons'
import { routes } from '@/shared/config/routes'
import { useBodyScrollLock, useGetScrollY } from '@/shared/model'
import { SearchModalView } from '@/features/search'
import { MobileModalNavigation } from '@/widget/mobile-nav'

import { NAV_ITEMS } from './config/navItems'
import DesktopNav from './ui/DesktopNav'
import HeaderActions from './ui/HeaderActions'

function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const location = useLocation()
  const scrollY = useGetScrollY()
  const isScroll = scrollY > 20

  useBodyScrollLock(isMenuOpen, { below: 'sm' })

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const openMenu = useCallback(() => {
    setIsMenuOpen(true)
  }, [])

  const openSearchModal = useCallback(() => {
    setIsSearchModalOpen(true)
  }, [])

  const closeSearchModal = useCallback(() => {
    setIsSearchModalOpen(false)
  }, [])

  useEffect(() => {
    closeMenu()
    closeSearchModal()
  }, [location.key, closeMenu, closeSearchModal])

  return (
    <>
      <header
        className={`fixed top-0 w-full flex items-center gap-16 p-4 z-20 transition-colors duration-500 ease-in-out
          ${!isScroll ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-black'}`}
      >
        <Link to={routes.ROOT} className='shrink-0'>
          {ICONS.logo}
        </Link>

        <nav className='flex w-full items-center text-white font-medium justify-end sm:justify-between'>
          <DesktopNav items={NAV_ITEMS} />
          <HeaderActions
            isMenuOpen={isMenuOpen}
            onSearchClick={openSearchModal}
            onMenuClick={openMenu}
          />
        </nav>
      </header>

      <MobileModalNavigation
        menu={NAV_ITEMS}
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
      <SearchModalView isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </>
  )
}

export default AppHeader
