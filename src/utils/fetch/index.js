import { requestFn } from './requestFn'
import { responseFn } from './responseFn'
import axios from 'axios'

let baseURL = 'http://localhost:8090/'

/**
 * 全局的请求方法
 * @param {Object} option - axios 的配置项
 * @param {String} option.url - 请求的 url
 * @param {String} option.method - 请求的方式
 * @param {Object} option.replaces - url 中需要替换的数据对象
 * @param {Object} option.data - post 请求发送的数据
 * @param {Object} option.params - get 请求发送的数据
 * @param {Object} option.headers - 请求头
 * @param {Array<Function>} option.transformRequest - 请求前执行，按照数组顺序依次执行
 * @param {Array<Function>} option.transformResponse - 请求后执行，按照数组顺序依次执行
 */
export default async function fetch (option = {}) {
  let instance = axios.create({
    baseURL
  })
  instance.interceptors.request.use(requestFn.success, requestFn.fail)
  instance.interceptors.response.use(responseFn.success, responseFn.fail)
  let res = await instance.request(option)

  return res
}
