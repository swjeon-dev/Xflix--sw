function mergePaginatedResults<T>(
  prev: T[],
  incoming: T[],
  page: number,
  getKey: (item: T) => string | number = item => (item as { id: number }).id,
) {
  if (page === 1) return incoming

  const keys = new Set(prev.map(getKey))
  return [...prev, ...incoming.filter(item => !keys.has(getKey(item)))]
}

export { mergePaginatedResults }
