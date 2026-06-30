import { useState } from 'react'
import { useNavigate } from 'react-router'

import { routes } from '@/shared'

interface SearchFormProps {
  onClose: () => void
}

function SearchForm({ onClose }: SearchFormProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const term = (formData.get('search') as string)?.trim()

    if (!term) return

    setSearch('')
    onClose()

    return navigate(routes.SEARCH.DETAIL(term))
  }

  return (
    <form
      onSubmit={onSubmit}
      onClick={e => e.stopPropagation()}
      className='flex w-full max-w-3xl flex-col gap-4'
    >
      <h2 id='search-modal-title' className='text-2xl font-semibold text-white'>
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
  )
}

export default SearchForm
