export async function fetchWithCache(url, cacheKey) {
  const cacheData = localStorage.getItem(cacheKey)
  if (cacheData) {
    try {
      return JSON.parse(cacheData)
    } catch (error) {
      console.error('1: Error parsing cached data:', error)
    }
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`2: Network response was not ok: ${response.statusText}`)
    }
    const data = await response.json()
    localStorage.setItem(cacheKey, JSON.stringify(data))
    return data
  } catch (error) {
    console.error('3: Error fetching data:', error)
    return null
  }
}
