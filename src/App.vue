<template>
  <div id="app">
    <h3>{{this.status}}</h3>
    <ChartWrapper :options="chartData"></ChartWrapper>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import provider from '@/providers'
import ChartWrapper from '@/components/chart'

export default {
  name: 'App',
  components: {
    ChartWrapper
  },
  data () {
    return {
      chartData: [],
      status: '初始化完成'
    }
  },
  mounted () {
    this.status = '加载中...'
    provider.getTotal().then(res => {
      this.status = '加载数据成功'
      this.chartData = res.data || []
    }).catch(e => {
      this.status = '加载数据错误'
    })
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html, body {
  width: 100%;
  height: 100%;
}
</style>
