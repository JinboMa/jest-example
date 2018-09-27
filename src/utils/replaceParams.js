/**
 * 替换字符串中的数据
 * @param {Object} ids - 需要修改的数据对象
 * @param {String} url - 要替换的 url
 * @return {String}
 * @example
 * replaceParams({ userId: 3, id: 5 }, '/api/{userId}/{id}')
 * => '/api/3/5'
 */
export default function replaceParams (ids, url) {
  let result = url

  for (let i in ids) {
    let reg = new RegExp(`{${i}}`, 'g')
    result = result.replace(reg, ids[i])
  }

  return result
}
