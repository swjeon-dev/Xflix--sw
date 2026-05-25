import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ICONS } from '@/shared/assets/icons'
import { routes } from '@/shared/config/routes'
import Modal from '@/shared/ui/Modal'
import { useBodyScrollLock, useGetScrollY } from '@/shared/model'
import SearchModal from '@/features/search/ui/search-modal'

const NAV_ITEMS = [
  { id: 1, label: '홈', path: routes.ROOT },
  { id: 3, label: '영화', path: routes.MOVIE.LIST },
  { id: 4, label: 'TV', path: routes.TV.LIST },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <Link
                to={item.path}
                onClick={onClose}
                className={`text-6xl hover:opacity-80 pb-4 ${item.path.length > 2 && location.pathname.startsWith(item.path) && 'border-b-2 border-white'}`}
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

function Header() {
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
  }, [location.key, closeMenu])

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
          <ol className='hidden gap-8 sm:flex text-xl'>
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`hover:opacity-80 pb-2 ${item.path.length > 2 && location.pathname.startsWith(item.path) && 'border-b-2 border-white'}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>

          <div className='flex gap-4'>
            <button type='button' aria-label='검색' onClick={openSearchModal}>
              {ICONS.search}
            </button>
            <button
              type='button'
              className='block sm:hidden'
              aria-label='메뉴 열기'
              aria-expanded={isMenuOpen}
              onClick={openMenu}
            >
              {ICONS.hamburgerMenu}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </>
  )
}

export default Header
