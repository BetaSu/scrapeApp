import Vue from 'vue'
import Router from 'vue-router'
import Trend from '@/components/trend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/trend',
      name: 'trend',
      component: Trend
    }
  ]
})
