export function resolveBasePath(path) {
  return `${import.meta.env.BASE_URL}${path}`
}
