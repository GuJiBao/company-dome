<template>
  <div class="about-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>关于我们</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-wrap" ref="formData" :label-width="formLabelWidth">
      <el-form-item class="item" label="公司图片：">
        <div class="pics">
          <div class="pic-item" v-for="item in formData.images" :key="item.uid"><img :src="item.url"></div>
        </div>
      </el-form-item>
      <el-form-item class="item" label="公司简介：">
        <div class="text" v-html="formData.details"></div>
      </el-form-item>
      <el-form-item class="item" label="英文简介：">
        <div class="text" v-html="formData.enDetails"></div>
      </el-form-item>
    </el-form>
    <div class="btn-wrap">
      <el-button type="primary" @click="handleDeit">编 辑</el-button>
    </div>
  </div>
</template>

<script>
import { editorToolbar } from "./../config/base.deitor";
import aboutApi from "./../api/aboutApi";

export default {
  data() {
    return {
      formData: {
        image: {},
        details: "",
        enDetails: ""
      },
      formLabelWidth: "120px",
      customToolbar: editorToolbar
    };
  },
  created() {
    // 获取数据
    this.getData();
  },
  methods: {
    /**
     * 获取数据
     */
    async getData() {
      let res = await this.$http.get(aboutApi.query);
      if (res.data.success && res.data.data.length > 0) {
        let data = res.data.data[0];
        this.formData.details = data.details;
        this.formData.enDetails = data.enDetails;
        this.formData.images = data.images;
      }
    },
    handleDeit() {
      this.$router.push("/aboutEdit");
    }
  }
};
</script>

<style scoped>
.about-wrap .pics {
  width: 100%;
  display: flex;
  overflow-x: auto;
}
.about-wrap .pics .pic-item {
  width: 300px;
  margin-right: 15px;
  padding: 5px;
  border: 1px solid #ddd;
}
.about-wrap .pics .pic-item img {
  width: 300px;
  max-width: 100%;
  height: auto;
}
.about-wrap .form-wrap {
  margin-top: 15px;
  padding-top: 60px;
  border-top: 1px dashed #ddd;
}
.about-wrap .form-wrap .item {
  margin: 0 60px 25px;
  padding-bottom: 25px;
  border-bottom: 1px dashed #ddd;
}
.about-wrap .btn-wrap {
  padding-top: 20px;
  text-align: center;
}
.about-wrap .btn-wrap .el-button {
  width: 120px;
}
</style>
