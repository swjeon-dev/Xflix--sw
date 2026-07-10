import type { SearchMediaType } from '@/features/search'

import SearchTagLink from './SearchTagLink'

interface MetaTagGroupProps {
  label: string
  tags: string[]
  type: SearchMediaType
}

function MetaTagGroup({ label, tags, type }: MetaTagGroupProps) {
  if (!tags.length) return null

  return (
    <div className='flex flex-col gap-2'>
      <h4 className='text-sm text-gray-400/80'>{label}</h4>
      <div className='flex flex-wrap gap-2'>
        {tags.map(tag => (
          <SearchTagLink key={tag} term={tag} type={type} />
        ))}
      </div>
    </div>
  )
}

export default MetaTagGroup
