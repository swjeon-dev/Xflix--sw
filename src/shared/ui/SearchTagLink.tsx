import { Link } from 'react-router'

import { routes } from '@/shared'
import type { SearchMediaType } from '@/features/search'

interface SearchTagLinkProps {
  term: string
  type: SearchMediaType
}

function SearchTagLink({ term, type }: SearchTagLinkProps) {
  return (
    <Link
      to={routes.SEARCH.DETAIL(term, type)}
      className='rounded-full border border-white/50 bg-gray-500/40 px-3 py-1 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-gray-900'
    >
      {term}
    </Link>
  )
}

export default SearchTagLink
