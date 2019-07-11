export function persist(key, value) {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function recovery(key) {
  if (process.browser) {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : false
  }
}
