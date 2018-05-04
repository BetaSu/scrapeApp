<template>
  <el-aside width="200px">
    <h5 class="slogan">嘿！知乎</h5>
    <el-menu
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <router-link to="/trend">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
              趋势
          </template>
        </el-submenu> 
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  
}
</script>

<style>
.slogan {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
}
</style>

