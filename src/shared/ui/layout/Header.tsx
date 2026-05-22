import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ICONS } from '@/shared/assets/icons'
import { routes } from '@/shared/config/routes'
import Modal from '@/shared/ui/Modal'
import { useGetScrollY, useScrollDisable } from '@/shared/model'

interface INavItem {
  navClass: string
  liClass: string
  itemClass: string
  children: React.ReactNode
}

const NAV_ITEMS = [
  { id: 1, label: '홈', path: routes.ROOT },
  { id: 3, label: '영화', path: routes.MOVIE.LIST },
  { id: 4, label: 'TV', path: routes.TV.LIST },
]

function useCloseNav(cb: () => void) {
  const location = useLocation()

  useEffect(() => {
    cb()
  }, [location.key, cb])
}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const scrollY = useGetScrollY()
  const isScroll = scrollY > 20

  function modalClose() {
    setIsOpen(false)
    setIsLocked(false)
  }

  useCloseNav(modalClose)
  useScrollDisable(isLocked, 'sm')

  function modalOpen() {
    setIsOpen(true)
    setIsLocked(true)
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full flex gap-16 p-4 z-20 transition-colors duration-500 ease-in-out
          ${!isScroll ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-black'}`}
      >
        <Link to={routes.ROOT}>{ICONS.logo}</Link>
        {!isOpen && (
          <NavItem
            navClass='flex w-full text-white font-medium justify-end sm:justify-between'
            liClass='hidden gap-8 sm:flex text-xl'
            itemClass='hover:opacity-80 place-self-center'
          >
            <div className='flex gap-4'>
              <button>{ICONS.search}</button>
              <button className='block sm:hidden' onClick={modalOpen}>
                {ICONS.hamburgerMenu}
              </button>
            </div>
          </NavItem>
        )}

        {isOpen && (
          <Modal>
            <MobileMenu modalClose={modalClose} />
          </Modal>
        )}
      </header>
    </>
  )
}

function NavItem({ navClass, liClass, itemClass, children }: INavItem) {
  return (
    <nav className={navClass}>
      <ol className={liClass}>
        {NAV_ITEMS.map(item => (
          <li key={item.id} className={itemClass}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ol>
      {children}
    </nav>
  )
}

function MobileMenu({ modalClose }: { modalClose: () => void }) {
  return (
    <NavItem
      navClass='fixed inset-0 flex text-white font-medium justify-center items-center bg-black z-30'
      liClass='flex flex-col items-center gap-10 w-full main-page_px'
      itemClass='text-6xl hover:opacity-80 place-self-center'
    >
      <button className='absolute top-5 right-5' onClick={modalClose}>
        X
      </button>
    </NavItem>
  )
}

export default Header
