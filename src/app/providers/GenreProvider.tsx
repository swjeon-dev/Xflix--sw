// app/providers/GenreProvider.tsx
import { useRouteLoaderData } from 'react-router'

import { GenreContext, type GenreContextValue } from '@/entities/genre'
import { LOADER_ID } from './constants'

function GenreProvider({ children }: { children: React.ReactNode }) {
  const { movieGenres, tvGenres } = useRouteLoaderData(
    LOADER_ID,
  ) as GenreContextValue

  return (
    <GenreContext.Provider value={{ movieGenres, tvGenres }}>
      {children}
    </GenreContext.Provider>
  )
}

export default GenreProvider
