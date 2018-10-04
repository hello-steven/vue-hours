import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Connect from './views/Connect.vue'
import Callback from './views/Callback.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/connect',
      name: 'connect',
      component: Connect
    },
    {
      path: '/connect/callback',
      name: 'callback',
      component: Callback
    }
  ]
})
