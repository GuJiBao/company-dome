<template>
  <div class="product-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <div class="tool-wrap">
          <el-button type="primary" @click="showDialogForm()">添加产品</el-button>
        </div>
        <el-table :data="tableData" stripe border style="width: 100%;">
          <el-table-column prop="name" label="产品名称" width="160"></el-table-column>
          <el-table-column prop="enName" label="英文名称" width="160"></el-table-column>
          <el-table-column width="160" label="产品分类">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.classify.name}}（{{scope.row.classify.enName}}）</span>
            </template>
          </el-table-column>
          <el-table-column prop="no" label="产品型号" width="100"></el-table-column>
          <el-table-column prop="unit" label="产品单位" width="80"></el-table-column>
          <el-table-column prop="imgUrl" width="120" label="产品图片">
            <template slot-scope="scope">
              <span class="pic"><img :src="scope.row.image && scope.row.image.url"></span>
            </template>
          </el-table-column>
          <el-table-column label="产品详情">
            <template slot-scope="scope">
              <div class="ellipsis-multiple" v-html="scope.row.details"></div>
            </template>
          </el-table-column>
          <el-table-column label="英文详情">
            <template slot-scope="scope">
              <div class="ellipsis-multiple" v-html="scope.row.enDetails"></div>
            </template>
          </el-table-column>
          <el-table-column prop="hot" width="80" label="热门产品">
            <template slot-scope="scope">
              <span>{{scope.row.hot ? '是': '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            label="更新时间">
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
        <div class="page-wrap" v-if="tableData.length > 0">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            layout="prev, pager, next, jumper"
            :page-count="pageTotal"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加产品" :visible.sync="dialogFormVisible" @close="handleClose" :close-on-click-modal="false">
      <el-form :model="formData" ref="formData" :label-width="formLabelWidth">
        <el-form-item class="is-required" label="产品名称">
          <el-input
            class="input-text"
            v-model="formData.name"
            placeholder="请输入产品名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="英文名称">
          <el-input
            class="input-text"
            v-model="formData.enName"
            placeholder="请输入产品英文名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="产品分类">
          <el-select v-model="formData.classify" placeholder="请选择">
            <el-option
              v-for="item in proClassifyOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input
            class="input-text"
            v-model="formData.no"
            placeholder="请输入产品型号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品单位">
          <el-input
            class="input-text"
            v-model="formData.unit"
            placeholder="请输入产品单位"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="产品图片">
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
            :limit="1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="热门产品">
          <el-radio v-model="formData.hot" :label="true">是</el-radio>
          <el-radio v-model="formData.hot" :label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="产品详情">
          <vue-editor v-model="formData.details" :editorToolbar="customToolbar"></vue-editor>
        </el-form-item>
        <el-form-item label="英文详情">
          <vue-editor v-model="formData.enDetails" :editorToolbar="customToolbar"></vue-editor>
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
import { VueEditor } from "vue2-editor";
import { editorToolbar } from "./../config/base.deitor";
import commonApi from "./../api/common";
import proClassifyApi from "./../api/productClassifyApi";
import productApi from "./../api/productApi";

export default {
  components: {
    VueEditor
  },
  name: "product",
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 8,
      pageTotal: 0,
      formData: {
        name: "",
        enName: "",
        classify: "",
        no: '',
        unit: '',
        image: null,
        hot: false,
        details: "",
        enDetails: ""
      },
      activeId: "",
      proClassifyOpts: [{ value: 1, label: "第一项" }],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      isSave: false,
      uploadApi: commonApi.upload,
      upLoadData: {
        type: 'product'
      },
      fileList: [],
      customToolbar: editorToolbar
    };
  },
  computed: {
    queryRequest() {
      return {
        page: this.page,
        pageSize: this.pageSize
      };
    }
  },
  created() {
    // 获取数据
    this.getData();
    // 获取产品分类
    this.getProClassify();
  },
  methods: {
    /**
     * 获取数据
     */
    async getData() {
      let res = await this.$http.get(productApi.productQuery, {
        params: this.queryRequest
      });
      if(res.data.success) {
        this.tableData = res.data.data;
        this.pageTotal = res.data.pageTotal;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      this.page = val;
      // 更新数据
      this.getData();
    },
    /**
     * 保存
     */
    async handleSave() {
      // 验证表单
      if (!this.verifyForm()) return false;
      let res = "", msg = "";
      if (this.activeId) {
        msg = "编辑成功";
        res = await this.$http.post(productApi.productUpdate, {
          ...this.formData,
          id: this.activeId
        });
      } else {
        msg = "添加成功";
        res = await this.$http.post(productApi.productCreate, {
          ...this.formData
        });
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
     * 产品的编辑
     */
    handleEditClick(row) {
      this.formData.name = row.name;
      this.formData.enName = row.enName;
      this.formData.classify = row.classify._id;
      this.formData.no = row.no;
      this.formData.unit = row.unit;
      this.formData.image = row.image;
      this.formData.hot = row.hot;
      this.formData.details = row.details;
      this.formData.enDetails = row.enDetails;
      this.fileList = [{...row.image}];
      this.showDialogForm(row._id);
    },
    /**
     * 产品的删除
     */
    handleDelClick(row) {
      let id = row._id;
      this.$confirm("此操作将永久删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.get(productApi.productDelete, {
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
      this.formData.name = '';
      this.formData.enName = '';
      this.formData.classify = '';
      this.formData.no = '';
      this.formData.unit = '';
      this.formData.image = null;
      this.formData.hot = false;
      this.formData.details = '';
      this.formData.enDetails = '';
    },
    /**
     * 重置图片上传
     */
    resetUploadImage() {
      this.fileList = [];
    },
    /**
     * 显示添加、编辑分类弹框
     */
    showDialogForm(id) {
      if(!id) {
        // 重置表单
        this.resetForm();
        // 重置图片上传
        this.resetUploadImage()
      }
      this.activeId = id;
      this.dialogFormVisible = true;
    },
    /**
     * 获取产品分类
     */
    async getProClassify() {
      let res = await this.$http.get(proClassifyApi.proClassifyQuery);
      if (res.data.success) {
        this.proClassifyOpts = this.changeProClassifyData(res.data.data);
      }
    },
    /**
     * 改变产品分类数据
     */
    changeProClassifyData(data) {
      return data.map(item => {
        return {
          value: item._id,
          label: item.name + "(" + item.enName + ")"
        };
      });
    },
    /**
     * 关闭弹框
     */
    async handleClose() {
      // 判断如果图片已上传，且不是保存就删除已上传的图片
      if (!this.isSave && this.fileList.length > 0 && this.fileList[0].response) {
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
        this.formData.image = {
          name: data.filename,
          url: this.httpUrl + data.path,
          path: data.path
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
      console.log(file);
      // 删除已上传的图片
      let path = file.response ? file.response.data.path : file.path;
      console.log(path);
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
      if (!this.formData.name) {
        this.$message({
          message: "请输入产品名称",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.enName) {
        this.$message({
          message: "请输入产品英文名称",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.classify) {
        this.$message({
          message: "请选择产品分类",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.image) {
        this.$message({
          message: "请上传产品图片",
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
.product-wrap {
  .tool-wrap {
    margin-bottom: 15px;
    text-align: right;
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

