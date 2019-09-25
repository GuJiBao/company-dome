<template>
  <div class="product-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <div class="tool-wrap">
          <el-button type="primary" @click="showDialogForm()">添加分类</el-button>
        </div>
        <el-table :data="tableData" stripe border style="width: 100%;">
          <el-table-column prop="name" label="产品分类名称" width="240"></el-table-column>
          <el-table-column prop="enName" label="产品分类名称（英文）" width="240"></el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{scope.row.updated_at | dateFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.created_at | dateFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="145">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditClick(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="添加产品分类" :visible.sync="dialogFormVisible">
      <el-form :model="formData" :label-width="formLabelWidth">
        <el-form-item class="is-required" label="分类名称">
          <el-input
            class="input-text"
            v-model="formData.name"
            maxlength="50"
            placeholder="请输入产品分类名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formData" :label-width="formLabelWidth">
        <el-form-item class="is-required" label="分类名称（英文）">
          <el-input
            class="input-text"
            v-model="formData.enName"
            maxlength="50"
            placeholder="请输入产品分类名称（英文）"
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
import proClassifyApi from "./../api/productClassifyApi";

export default {
  name: "productClassify",
  data() {
    return {
      tableData: [],
      formLabelWidth: "180px",
      dialogFormVisible: false,
      activeId: "",
      formData: {
        name: "",
        enName: ""
      }
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
      let res = await this.$http.get(proClassifyApi.proClassifyQuery);
      if (res.data.success) {
        this.tableData = res.data.data;
      }
    },
    /**
     * 分类的编辑
     */
    handleEditClick(row) {
      this.formData.name = row.name;
      this.formData.enName = row.enName;
      this.showDialogForm(row._id);
    },
    /**
     * 分类保存（添加、编辑）
     */
    async handleSave() {
      // 表单验证
      if (!this.hasValidation()) return false;
      let res = "",
        msg = "";
      if (this.activeId) {
        // 编辑
        msg = "编辑成功";
        res = await this.$http.post(proClassifyApi.proClassifyUpdate, {
          ...this.formData,
          id: this.activeId
        });
        this.activeId = "";
      } else {
        // 添加
        msg = "添加成功";
        res = await this.$http.post(proClassifyApi.proClassifyCreate, {
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
        this.formData.name = "";
        this.formData.enName = "";
      } else {
        this.errMsg(res.data.msg);
      }
    },
    /**
     * 分类的删除
     */
    handleDelClick(row) {
      let id = row._id;
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.get(proClassifyApi.proClassifyDelete, {
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
            this.errMsg(res.data.msg);
          }
        })
        .catch(() => {});
    },
    /**
     * 显示添加、编辑分类弹框
     */
    showDialogForm(id) {
      this.activeId = id;
      this.dialogFormVisible = true;
    },
    /**
     * 表单验证
     */
    hasValidation() {
      if (!this.formData.name) {
        this.errMsg("请输入产品分类");
        return false;
      }
      if (!this.formData.enName) {
        this.errMsg("请输入产品分类（英文）");
        return false;
      }
      return true;
    },
    /**
     * 错误提示
     */
    errMsg(text) {
      this.$message({
        message: text,
        type: "warning"
      });
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
  .input-text {
    width: 50%;
  }
}
</style>

