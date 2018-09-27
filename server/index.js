const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Logger = require('koa-logger')
const router = require('./router')
const cors = require('koa2-cors')

let app = new Koa()

app
  .use(cors())
  .use(Logger())
  .use(BodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8090)

console.log('服务已启动', '地址:', 'http://localhost:' + 8090)

module.exports = app
