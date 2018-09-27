import fetch from '@/utils/fetch'

/** 获取用户列表 */
export const getUserList = () => fetch({
  url: 'user',
  method: 'get'
})

/** 获取用户数据 */
export const getUserDetail = (replaces) => fetch({
  url: 'user/{id}',
  method: 'get',
  replaces
})

/** 添加/编辑用户信息 */
export const setUserDetail = (data) => fetch({
  url: 'user',
  method: 'post',
  data
})

/** 删除用户数据 */
export const deleteUser = (replaces) => fetch({
  url: 'user/{id}',
  method: 'delete',
  replaces
})
