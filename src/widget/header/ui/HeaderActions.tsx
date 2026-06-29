import { ICONS } from '@/shared/assets/icons'

interface HeaderActionsProps {
  isMenuOpen: boolean
  onSearchClick: () => void
  onMenuClick: () => void
}

function HeaderActions({
  isMenuOpen,
  onSearchClick,
  onMenuClick,
}: HeaderActionsProps) {
  return (
    <div className='flex gap-4'>
      <button type='button' aria-label='검색' onClick={onSearchClick}>
        {ICONS.search}
      </button>
      <button
        type='button'
        className='block sm:hidden'
        aria-label='메뉴 열기'
        aria-expanded={isMenuOpen}
        onClick={onMenuClick}
      >
        {ICONS.hamburgerMenu}
      </button>
    </div>
  )
}

export default HeaderActions
