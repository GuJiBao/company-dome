<template>
  <div class="banner-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>banner管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <div class="tool-wrap">
          <p class="hint-text"><span class="star-red">*</span> 提醒banner图片的宽为1920px，高为460px为最佳</p>
          <el-button type="primary" @click="showDialogForm()">添加banner</el-button>
        </div>
        <el-table :data="tableData" stripe border style="width: 100%;">
          <el-table-column prop="imgUrl" width="220" label="banner图片">
            <template slot-scope="scope">
              <span class="pic">
                <img :src="scope.row.image && scope.row.image.url">
              </span>
            </template>
          </el-table-column>
          <el-table-column width="220" label="url链接">
            <template slot-scope="scope">
              <div v-html="scope.row.url"></div>
            </template>
          </el-table-column>
          <el-table-column width="220" label="标题">
            <template slot-scope="scope">
              <div v-html="scope.row.title"></div>
            </template>
          </el-table-column>
          <el-table-column label="简介">
            <template slot-scope="scope">
              <div v-html="scope.row.intro"></div>
            </template>
          </el-table-column>
          <el-table-column width="160" label="更新时间">
            <template slot-scope="scope">
              <span>{{scope.row.updated_at | dateFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column width="145" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditClick(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form :model="formData" ref="formData" :label-width="formLabelWidth">
        <el-form-item class="is-required" label="图片">
          <el-upload
            class="upload-demo"
            name="file"
            :action="uploadApi"
            :data="uploadData"
            :before-upload="handleUploadBeforeUpload"
            :before-remove="handleUploadBeforeRemove"
            :on-success="handleUploadSuccess"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :limit="1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="链接">
          <el-input
            class="input-text"
            v-model="formData.url"
            placeholder="请输入banner链接"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            class="input-text"
            v-model="formData.title"
            placeholder="请输入标题"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            class="input-text"
            type="textarea"
            v-model="formData.intro"
            placeholder="请输入简介"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonApi from "./../api/common";
import system from "./../api/system";

export default {
  data() {
    return {
      title: "添加",
      tableData: [],
      formData: {
        image: null,
        url: "",
        title: '',
        intro: ""
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      uploadApi: commonApi.upload,
      uploadData: {
        type: "banner"
      },
      isSave: false,
      fileList: []
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
      let res = await this.$http.get(system.bannerQuery);
      if (res.data.success) {
        this.tableData = res.data.data;
      }
    },
    /**
     * 保存
     */
    async handleSave() {
      // 验证表单
      if (!this.verifyForm()) return false;
      let res = "",
        msg = "";
      if (this.activeId) {
        msg = "编辑成功";
        res = await this.$http.post(system.bannerUpdate, {
          ...this.formData,
          id: this.activeId
        });
      } else {
        res = await this.$http.post(system.bannerCreate, this.formData);
        msg = "添加成功";
      }
      if (res.data.success) {
        this.$message({
          message: msg,
          type: "success"
        });
        // 更新数据
        this.getData();
        // 关闭弹框
        this.dialogFormVisible = false;
      } else {
        this.$message.error(res.data.msg);
      }
      this.isSave = true;
    },
    /**
     * banner的编辑
     */
    handleEditClick(row) {
      this.formData.url = row.url;
      this.formData.title = row.title;
      this.formData.intro = row.intro;
      this.formData.image = row.image;
      this.fileList = [{...row.image}];
      this.showDialogForm(row._id);
    },
    /**
     * banner的删除
     */
    handleDelClick(row) {
      let id = row._id;
      this.$confirm("此操作将永久删除该banner, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.get(system.bannerDelete, {
            params: {
              id: id
            }
          });
          if (res.data.success) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            // 更新数据
            this.getData();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    /**
     * 重置表单
     */
    resetForm() {
      this.formData.url = "";
      this.formData.title = '';
      this.formData.intro = "";
      this.formData.image = null;
    },
    /**
     * 显示添加、编辑分类弹框
     */
    showDialogForm(id) {
      if (!id) {
        // 重置表单
        this.resetForm();
      }
      this.activeId = id;
      this.dialogFormVisible = true;
    },
    /**
     * 关闭弹框
     */
    async handleClose() {
      // 判断如果图片已上传，且不是保存就删除已上传的图片
      if (!this.isSave && this.fileList.length > 0) {
        let path = this.fileList[0].response.data.path;
        let res = await this.$http.post(commonApi.delImage, {
          path: path
        });
        if (res.data.success) {
          this.fileList = [];
        }
      }
      this.reset();
    },
    reset() {
      this.isSave = false;
      this.fileList = [];
    },
    /**
     * 图片上传成功
     */
    handleUploadSuccess(res, file, fileList) {
      if (res.success) {
        let data = res.data;
        this.formData.image = {
          name: data.filename,
          url: this.httpUrl + data.path
        };
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
        this.formData.image = null;
        this.fileList = fileList;
      } else {
        this.$message.error("删除失败");
        return false;
      }
    },
    /**
     * 图片超出上传限制
     */
    handleUploadExceed() {
      this.$message({
        message: "最多只能有一张产品图片，请删除之前的产品图片",
        type: "warning"
      });
    },
    /**
     * 验证
     */
    verifyForm() {
      if (!this.formData.image) {
        this.$message({
          message: "请上传banner图片",
          type: "warning"
        });
        return false;
      }
      return true;
    }
  }
};
</script>


<style lang="less" scoped>
.banner-wrap {
  .tool-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
    text-align: right;
  }
  .tool-wrap .hint-text {
    margin-right: 15px;
    color: #999;
  }
  .tool-wrap .hint-text .star-red {
    color: #F56C6C;
  }
  .el-row {
    margin-top: 15px;
  }
  .pic {
    padding: 0 10px;
  }
  .pic img {
    width: 80px;
  }
  .input-text {
    width: 50%;
  }
}
</style>

