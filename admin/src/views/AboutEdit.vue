<template>
  <div class="about-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>关于我们</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-wrap" :model="formData" ref="formData" :label-width="formLabelWidth">
      <el-form-item class="is-required item" label="公司图片">
        <el-upload
          class="upload-demo"
          name="file"
          :data="upLoadData"
          :action="uploadApi"
          :before-upload="handleUploadBeforeUpload"
          :before-remove="handleUploadBeforeRemove"
          :on-success="handleUploadSuccess"
          :on-exceed="handleUploadExceed"
          :file-list="fileList"
          :limit="5"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item class="is-required item" label="公司简介">
        <vue-editor v-model="formData.details" :editorToolbar="customToolbar"></vue-editor>
      </el-form-item>
      <el-form-item class="is-required item" label="英文简介">
        <vue-editor v-model="formData.enDetails" :editorToolbar="customToolbar"></vue-editor>
      </el-form-item>
    </el-form>
    <div class="btn-wrap">
      <el-button @click="$router.go(-1)">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { editorToolbar } from "./../config/base.deitor";
import commonApi from "./../api/common";
import aboutApi from './../api/aboutApi';

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      id: null,
      formData: {
        details: "",
        enDetails: "",
        images: []
      },
      formLabelWidth: "120px",
      uploadApi: commonApi.upload,
      upLoadData: {
        type: "company"
      },
      fileList: [],
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
      if(res.data.success && res.data.data.length > 0) {
        let data = res.data.data[0];
        this.id = data._id;
        this.formData.details = data.details;
        this.formData.enDetails = data.enDetails;
        this.formData.images = data.images;
        this.fileList = [...data.images]
      }
    },
    /**
     * 保存
     */
    async handleSave() {
      // 验证表单
      if (!this.verifyForm()) return false;
      let param = {
        ...this.formData
      };
      if(this.id) {
        param = {
          ...param,
          id: this.id
        };
      }
      let res = await this.$http.post(aboutApi.save, param);
      if (res.data.success) {
        this.$message({
          message: '保存成功',
          type: "success"
        });
      } else {
        this.$message.error(res.data.msg);
      }
    },
    /**
     * 关闭弹框
     */
    async handleClose() {
      // 判断如果图片已上传，且不是保存就删除已上传的图片
      if (
        !this.isSave &&
        this.fileList.length > 0 &&
        this.fileList[0].response
      ) {
        let path = this.fileList[0].response.data.path;
        let res = await this.$http.post(commonApi.delImage, {
          path: path
        });
        if (res.data.success) {
          // 重置图片上传
          this.resetUploadImage();
        }
      }
      this.reset();
    },
    reset() {
      this.isSave = false;
      // 重置图片上传
      this.resetUploadImage();
    },
    /**
     * 图片上传成功
     */
    handleUploadSuccess(res, file, fileList) {
      if (res.success) {
        let data = res.data;
        this.formData.images.push({
          name: data.filename,
          url: this.httpUrl + data.path,
          path: data.path
        });
      }
      this.fileList = fileList;
    },
    /**
     * 图片上传之前
     */
    handleUploadBeforeUpload(file) {
      console.log(file);
    },
    /**
     * 图片删除之前
     */
    async handleUploadBeforeRemove(file, fileList) {
      await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        type: "warning"
      });
      // 删除已上传的图片
      let path = file.response ? file.response.data.path : file.path;
      let res = await this.$http.post(commonApi.delImage, {
        path: path
      });
      if (res.data.success) {
        this.formData.images = this.changeImageHandle(path);
        this.fileList = fileList;
      } else {
        this.$message.error("删除失败");
        return false;
      }
    },
    changeImageHandle(path) {
      let result = this.formData.images.filter(item => {
        return item.path !== path;
      })
      return result;
    },
    /**
     * 图片超出上传限制
     */
    handleUploadExceed() {
      this.$message({
        message: "最多只能有5张产品图片，请删除之前的产品图片",
        type: "warning"
      });
    },
    /**
     * 验证
     */
    verifyForm() {
      if (this.formData.images.length <= 0) {
        this.$message({
          message: "请上传产品图片",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.details) {
        this.$message({
          message: "请输入公司简介",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.enDetails) {
        this.$message({
          message: "请输入英文简介",
          type: "warning"
        });
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
.about-wrap .form-wrap {
  margin-top: 15px;
  padding-top: 60px;
  border-top: 1px dashed #ddd;
}
.about-wrap .form-wrap .item {
  margin: 0 60px 25px;
  padding-bottom: 25px;
}
.about-wrap .btn-wrap {
  padding-top: 20px;
  text-align: center;
}
.about-wrap .btn-wrap .el-button {
  width: 120px;
}
</style>
