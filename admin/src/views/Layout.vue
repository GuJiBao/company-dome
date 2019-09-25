<template>  
  <el-row class="container">
    <el-col :span="24">
      <Header @collapse="collapseHandler" :isCollapse="isCollapse"></Header>
    </el-col>
    <el-col :span="24" class="main">
      <Menu :isCollapse="isCollapse"></Menu>
      <el-main class="content-container">
        <router-view></router-view>
      </el-main>
    </el-col>
  </el-row>    
</template>

<script>
export default {
  name: "Layout",
  components: {
    Header: () => import('@/components/Header.vue'),
    Menu: () => import('@/components/Menu.vue')
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    collapseHandler () {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less">
.container {
  position: absolute!important;
  top: 0;
  bottom: 0;
  width: 100%;
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside {
      width: 240px;
    }
    .content-container {
      overflow: hidden;
      overflow-y: scroll;
    }
  }
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
}

</style>
