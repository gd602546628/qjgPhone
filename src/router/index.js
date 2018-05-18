import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index.vue'
import advert from '../page/advert.vue'
import useCoupon from '../page/useCoupon.vue'
import login from '../page/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index/:id',
      name: 'index',
      component: index
    },
    {
      path: '/advert/:id',
      name: 'advert',
      component: advert
    },
    {
      path: '/useCoupon',
      name: 'useCoupon',
      component: useCoupon
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
