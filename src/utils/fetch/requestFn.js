import replaceParams from '@/utils/replaceParams'

/** 成功的拦截器 */
function success (config) {
  let { url, replaces } = config
  replaces && (config.url = replaceParams(replaces, url))
  return config
}

/** 失败的拦截器 */
function fail (err) {
  throw err
}

/** 全局请求之前的拦截 */
export const requestFn = {
  success, fail
}
