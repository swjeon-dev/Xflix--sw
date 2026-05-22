interface IGetTmdbImgPath {
  path?: string | null
  size?: string
}

export const getTmdbImgPath = ({ path, size = 'original' }: IGetTmdbImgPath) =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined
