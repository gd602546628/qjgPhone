// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import krpano from 'vue-krpano'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store/index'

Vue.use(krpano)
Vue.use(Mint)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
