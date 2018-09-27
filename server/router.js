const Router = require('koa-router')
const userControl = require('./controllers/user')

let router = new Router()

router
  .get('/user', userControl.getUserList.bind(userControl))
  .get('/user/:id', userControl.getUserDetail.bind(userControl))
  .post('/user', userControl.setUserDetail.bind(userControl))
  .delete('/user/:id', userControl.deleteUser.bind(userControl))

module.exports = router
