<template>
  <el-aside class="menu" :class="isCollapse ? 'menu-collapsed' : 'menu-expanded'">
    <!-- 导航 -->
    <el-menu
      default-active="/product"
      class="el-menu-vertical-demo"
      background-color="#033e6b"
      text-color="#fff"
      active-text-color="#fff"
      :collapse="isCollapse"
      :unique-opened="true"
      @select="handleSelect"
    > 
      <el-submenu index="/">
        <template slot="title">
          <i class="fa fa-product-hunt" aria-hidden="true"></i>
          <span slot="title">产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product">产品列表</el-menu-item>
          <el-menu-item index="/productClassify">产品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/news">
        <i class="fa fa-newspaper-o" aria-hidden="true"></i>
        <span slot="title">新闻管理</span>
      </el-menu-item>
      <el-menu-item index="/feedbacks">
        <i class="fa fa-external-link" aria-hidden="true"></i>
        <span slot="title">feedback管理</span>
      </el-menu-item>
      <el-submenu index="/system">
        <template slot="title">
          <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/banner">banner轮播图</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
          <el-menu-item index="/contact">联系我们</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Menu",
  props: ["isCollapse"],
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    }
  }
};
</script>

<style lang="less">
.menu {
    .el-menu--collapse {
        width: 60px;
        box-sizing: border-box;
    }
    .el-menu-item.is-active {
        color: #DEAD25!important;
        font-weight: bold;
        // background-color: #0b61A4!important;
    }
    .el-menu-item-group__title {
      display: none;
    }
    .is-opened .el-submenu__title {
        background-color: rgb(2, 50, 86)!important;
        i {
            color: #fff;
        }
    }
    .el-menu {
        height: 100%;
        .fa {
            margin-right: 8px;
            font-size: 16px;
            color: #fff;
            vertical-align: middle;
        }
    }
}
.menu-expanded {
    width: 240px!important;
}
.menu-collapsed {
    width: 60px!important;
}
</style>
