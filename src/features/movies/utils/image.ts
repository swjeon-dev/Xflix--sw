interface IGetTmdbImgPath {
  path?: string
  size?: string
}

export const getTmdbImgPath = ({ path, size = 'original' }: IGetTmdbImgPath) =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined
