
function localStorageCache() {
  const map = new Map(JSON.parse(localStorage.getItem('favorites') || '[]'))

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('favorites', appCache)
  })

  return map
}

const cache = localStorageCache();

export default cache;