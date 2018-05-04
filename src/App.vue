<template>
  <el-container id="app">
    <Slide></Slide>
    <Main></Main>
  </el-container>  
</template>

<script>
import provider from '@/providers'
import Main from '@/containers/main'
import Slide from '@/containers/slide'

export default {
  name: 'App',
  components: {
    Main, Slide
  },
  data () {
    return {

    }
  },
  mounted () {

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
