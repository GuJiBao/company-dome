<template>
  <div class="feedback-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/news' }">feedback</el-breadcrumb-item>
      <el-breadcrumb-item>feedback列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" stripe border style="width: 100%;">
          <el-table-column prop="name" label="姓名" width="90"></el-table-column>
          <el-table-column prop="companyName" label="公司名称" width="160"></el-table-column>
          <el-table-column prop="address" label="地址" width="160"></el-table-column>
          <el-table-column prop="tel" label="电话" width="120"></el-table-column>
          <el-table-column prop="fax" label="传真" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
          <el-table-column prop="website" label="网址" width="120"></el-table-column>
          <el-table-column prop="skype" label="skype" width="90"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column width="120" label="更新时间">
            <template slot-scope="scope">
              <span>{{scope.row.updated_at | dateFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column width="80" label="操作">
            <template slot-scope="scope">
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
  </div>
</template>

<script>
import feedbackApi from "./../api/feedbackApi";

export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 8,
      pageTotal: 0
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
      let res = await this.$http.get(feedbackApi.query, {
        params: this.queryRequest
      });
      if (res.data.success) {
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
     * feedback的删除
     */
    handleDelClick(row) {
      let id = row._id;
      this.$confirm("此操作将永久删除该feedback, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.get(feedbackApi.delete, {
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
  }
};
</script>

<style lang="less" scoped>
.feedback-wrap {
  .tool-wrap {
    margin-bottom: 15px;
    text-align: right;
  }
  .el-row {
    margin-top: 20px;
  }
}
</style>

