function isNavActive(pathname: string, path: string) {
  return path.length > 2 && pathname.startsWith(path)
}

export default isNavActive
