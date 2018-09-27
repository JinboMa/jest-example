import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/list', component: () => import(/* webpackChunkName: "user" */ './views/UserList.vue') },
    { path: '/edit', component: () => import(/* webpackChunkName: "user" */ './views/UserEdit.vue') }
  ]
})
