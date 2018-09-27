let storage = {}
export default {
  request (option = {}) {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      option.success && option.success({ message: 'success' })
      option.fail && option.fail({ message: 'fail' })
    }, 50)
  },
  getStorageSync: key => storage[key],
  setStorageSync: (key, value) => (storage[key] = value),
  removeStorageSync: key => (delete storage[key]),
  login (option) {
    if (!option.success) return
    let timer = setTimeout(() => {
      clearTimeout(timer)
      option.success({ code: 'success' })
    }, 50)
  }
}
