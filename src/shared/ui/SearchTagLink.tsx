import { Link } from 'react-router'

import { routes } from '@/shared'
import type { SearchFilterKey, ISearchFilterTag } from '@/shared'
import type { SearchMediaType } from '@/features/search'

interface SearchTagLinkProps {
  filter: SearchFilterKey
  tag: ISearchFilterTag
  type: SearchMediaType
}

function SearchTagLink({ filter, tag, type }: SearchTagLinkProps) {
  return (
    <Link
      to={routes.SEARCH.path({
        type,
        [filter]: tag.id,
        label: tag.name,
      })}
      className='rounded-full border border-white/50 bg-gray-500/40 px-3 py-1 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-gray-900'
    >
      {tag.name}
    </Link>
  )
}

export default SearchTagLink
