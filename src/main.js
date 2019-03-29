// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import App from './App'
import { store } from './store/store.js'
import { routes } from './routes.js'

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
