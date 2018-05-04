// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$http = Axios


import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/timeline'
import 'echarts/lib/component/title'
import ECharts from 'vue-echarts/components/ECharts'

Vue.component('ECharts', ECharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
