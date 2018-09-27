import { Message } from 'element-ui'
/** 成功的拦截器 */
function success (response) {
  let { data } = response
  Message.success('请求成功')
  return data
}

/** 失败的拦截器 */
function fail (err) {
  throw err
}

/** 全局请求之后的拦截 */
export const responseFn = {
  success, fail
}
