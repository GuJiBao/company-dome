<template>
  <div class="news-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/news' }">新闻管理</el-breadcrumb-item>
      <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <div class="tool-wrap">
          <el-button type="primary" @click="showDialogForm()">添加新闻</el-button>
        </div>
        <el-table :data="tableData" stripe border style="width: 100%;">
          <el-table-column prop="title" label="标题" width="160"></el-table-column>
          <el-table-column prop="enTitle" label="英文标题" width="160"></el-table-column>
          <el-table-column label="新闻正文">
            <template slot-scope="scope">
              <div class="ellipsis-multiple" v-html="scope.row.details"></div>
            </template>
          </el-table-column>
          <el-table-column label="英文正文">
            <template slot-scope="scope">
              <div class="ellipsis-multiple" v-html="scope.row.enDetails"></div>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者" width="120"></el-table-column>
          <el-table-column prop="enAuthor" label="作者英文" width="120"></el-table-column>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="handleClose" :close-on-click-modal="false">
      <el-form :model="formData" ref="formData" :label-width="formLabelWidth">
        <el-form-item class="is-required" label="标题">
          <el-input
            class="input-text"
            v-model="formData.title"
            placeholder="请输入标题"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="英文标题">
          <el-input
            class="input-text"
            v-model="formData.enTitle"
            placeholder="请输入英文标题"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="正文">
          <vue-editor v-model="formData.details" :editorToolbar="customToolbar"></vue-editor>
        </el-form-item>
        <el-form-item label="英文正文">
          <vue-editor v-model="formData.enDetails" :editorToolbar="customToolbar"></vue-editor>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            class="input-text"
            v-model="formData.author"
            placeholder="请输入作者"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者英文">
          <el-input
            class="input-text"
            v-model="formData.enAuthor"
            placeholder="请输入作者英文"
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
import { VueEditor } from "vue2-editor";
import { editorToolbar } from "./../config/base.deitor";
import newsApi from "./../api/newsApi";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 8,
      pageTotal: 0,
      formData: {
        title: '',
        enTitle: '',
        details: '',
        enDetails: '',
        author: '',
        enAuthor: ''
      },
      activeId: '',
      formLabelWidth: "120px",
      dialogTitle: '添加新闻',
      dialogFormVisible: false,
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
  },
  methods: {
    /**
     * 获取数据
     */
    async getData() {
      let res = await this.$http.get(newsApi.newsQuery, {
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
        res = await this.$http.post(newsApi.newsUpdate, {
          ...this.formData,
          id: this.activeId
        });
      } else {
        res = await this.$http.post(newsApi.newsCreate, this.formData);
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
    },
    /**
     * 显示添加、编辑分类弹框
     */
    showDialogForm(id) {
      if(!id) {
        // 重置表单
        this.resetForm();
      }
      this.activeId = id;
      this.dialogFormVisible = true;
    },
    /**
     * 新闻的编辑
     */
    handleEditClick(row) {
      this.formData.title = row.title;
      this.formData.enTitle = row.enTitle;
      this.formData.details = row.details;
      this.formData.enDetails = row.enDetails;
      this.formData.author = row.author;
      this.formData.enAuthor = row.enAuthor;
      this.showDialogForm(row._id);
    },
    /**
     * 新闻的删除
     */
    handleDelClick(row) {
      let id = row._id;
      this.$confirm("此操作将永久删除该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.get(newsApi.newsDelete, {
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
      this.formData.title = '';
      this.formData.enTitle = '';
      this.formData.details = '';
      this.formData.enDetails = '';
      this.formData.author = '';
      this.formData.enAuthor = '';
    },
    /**
     * 弹框关闭
     */
    handleClose() {

    },
    /**
     * 验证
     */
    verifyForm() {
      if (!this.formData.title) {
        this.$message({
          message: "请输入标题",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.enTitle) {
        this.$message({
          message: "请输入产品英文标题",
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
.news-wrap {
  .tool-wrap {
    margin-bottom: 15px;
    text-align: right;
  }
}
</style>


