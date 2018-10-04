import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'

Vue.use(VueSession, {
  secret: 'red',
  saveUninitialized: true,
  resave: true
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

console.log({
  vue: Vue
})
