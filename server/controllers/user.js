class UserController {
  constructor () {
    this.users = [
      { id: 1, name: '张三', age: 12, job: '产品' },
      { id: 2, name: '李四', age: 18, job: '前端' },
      { id: 3, name: '王五', age: 25, job: '后端' }
    ]
    this.maxId = 3
  }
  async getUserList (ctx, next) {
    ctx.body = this.users
  }
  async setUserDetail (ctx, next) {
    let body = ctx.request.body
    let { id } = body
    if (id) {
      let index = this.users.findIndex(item => item.id === id)
      this.users[index] = { ...body }
    } else {
      this.users.push({
        ...body,
        id: ++this.maxId
      })
    }
    ctx.body = { ...body, id: id || this.maxId }
    next()
  }
  async getUserDetail (ctx, next) {
    let id = Number(ctx.params.id)
    ctx.body = this.users.find(item => item.id === id)
    next()
  }
  async deleteUser (ctx, next) {
    let id = ctx.params.id
    let index = this.users.findIndex(item => item.id === id)
    this.users.splice(index, 1)
    ctx.body = this.users
    next()
  }
}

module.exports = new UserController()
