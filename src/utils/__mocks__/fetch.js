/* eslint no-throw-literal:off */
let apiMap = [
  {
    name: 'getUserList',
    url: /^user$/,
    method: 'get',
    fn: data => {
      return [
        { id: 1, name: '张三', age: 12, job: '产品' },
        { id: 2, name: '李四', age: 18, job: '前端' },
        { id: 3, name: '王五', age: 25, job: '后端' }
      ]
    }
  },
  {
    name: 'getUserDetail',
    url: /^user\/{id}$/,
    method: 'get',
    fn: data => {
      return { id: 2, name: '李四', age: 18, job: '前端' }
    }
  },
  {
    name: 'setUserDetail',
    url: /^user$/,
    method: 'post',
    fn: data => {
      return { ...data, id: 10 }
    }
  },
  {
    name: 'deleteUser',
    url: /^user\/{id}$/,
    method: 'delete',
    fn: data => {
      return [
        { id: 1, name: '张三', age: 12, job: '产品' },
        { id: 2, name: '李四', age: 18, job: '前端' },
        { id: 3, name: '王五', age: 25, job: '后端' }
      ]
    }
  }
]

export default async function (option) {
  let { url, method, data, params } = option
  let isGet = !method || (/get/i).test(method)
  if (isGet) data = params
  let result = apiMap.find(item => item.url.test(url) && new RegExp(item.method, 'i').test(method))
  let resultFn = result.fn || (() => false)
  try {
    let res = await resultFn(data)
    return res
  } catch (err) {
    throw err
  }
}
