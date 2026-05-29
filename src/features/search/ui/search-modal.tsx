import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Modal } from '@/shared/ui'
import { routes } from '@/shared/config/routes-config'
import { useBodyScrollLock } from '@/shared/model'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  useBodyScrollLock(isOpen)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const term = (formData.get('search') as string)?.trim()

    if (!term) return

    navigate(routes.SEARCH.DETAIL(term))
    setSearch('')
    setTimeout(() => {
      onClose()
    }, 300)
  }

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Modal>
      <div
        className='fixed inset-0 z-50 flex items-start justify-center bg-black/90 p-4 pt-[20vh] md:p-8'
        role='dialog'
        aria-modal='true'
        aria-labelledby='search-modal-title'
        onClick={onClose}
      >
        <form
          onSubmit={onSubmit}
          onClick={e => e.stopPropagation()}
          className='flex w-full max-w-3xl flex-col gap-4'
        >
          <h2
            id='search-modal-title'
            className='text-2xl font-semibold text-white'
          >
            검색
          </h2>
          <input
            type='text'
            name='search'
            placeholder='영화, TV 프로그램 검색'
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
            className='w-full rounded-md border border-white/20 bg-zinc-900 px-4 py-3 text-lg text-white placeholder:text-white/40 outline-none focus:border-white/50'
          />

          <button
            type='submit'
            className='w-fit rounded bg-red-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-700'
          >
            검색
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default SearchModal
