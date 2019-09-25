<template>
  <div class="contact-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>联系我们</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-wrap" ref="formData" :label-width="formLabelWidth">
      <el-form-item class="is-required item" label="客服姓名：">
        <el-input
          class="input-text"
          v-model="formData.name"
          placeholder="请输入客服姓名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="电话：">
        <el-input class="input-text" v-model="formData.tel" placeholder="请输入电话" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="手机：">
        <el-input
          class="input-text"
          v-model="formData.phone"
          placeholder="请输入手机"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="邮箱：">
        <el-input
          class="input-text"
          v-model="formData.email"
          placeholder="请输入邮箱"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="地址：">
        <el-input
          class="input-text"
          v-model="formData.address"
          placeholder="请输入地址"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="英文地址：">
        <el-input
          class="input-text"
          v-model="formData.enAddress"
          placeholder="请输入英文地址"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="Skype：">
        <el-input
          class="input-text"
          v-model="formData.skype"
          placeholder="请输入Skype"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="WeChat：">
        <el-input
          class="input-text"
          v-model="formData.weChat"
          placeholder="请输入WeChat"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="whatsapp：">
        <el-input
          class="input-text"
          v-model="formData.whatsApp"
          placeholder="请输入whatsapp"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="is-required item" label="QQ：">
        <el-input class="input-text" v-model="formData.qq" placeholder="请输入QQ" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-wrap">
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </div>
</template>

<script>
import contactApi from './../api/contactApi';

export default {
  data() {
    return {
      id: null,
      formData: {
        name: "",
        tel: "",
        phone: "",
        email: "",
        address: "",
        enAddress: '',
        skype: "",
        weChat: "",
        whatsApp: "",
        qq: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    // 获取内容
    this.getData();
  },
  methods: {
    /**
     * 获取内容
     */
    async getData() {
      let res = await this.$http.get(contactApi.query);
      if(res.data.success && res.data.data.length > 0) {
        let data = res.data.data[0];
        this.id = data._id;
        this.formData.name = data.name;
        this.formData.tel = data.tel;
        this.formData.phone = data.phone;
        this.formData.email = data.email;
        this.formData.address = data.address;
        this.formData.enAddress = data.enAddress;
        this.formData.skype = data.skype;
        this.formData.weChat = data.weChat;
        this.formData.whatsApp = data.whatsApp;
        this.formData.qq = data.qq;
      }
    },
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
        }
      }
      let res = await this.$http.post(contactApi.save, param);
      if (res.data.success) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
      } else {
        this.$message.error(res.data.msg);
      }
    },
    /**
     * 验证
     */
    verifyForm() {
      if (!this.formData.name) {
        this.$message({
          message: "请输入客服姓名",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.tel) {
        this.$message({
          message: "请输入电话",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.phone) {
        this.$message({
          message: "请输入手机",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.email) {
        this.$message({
          message: "请输入邮箱",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.address) {
        this.$message({
          message: "请输入地址",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.enAddress) {
        this.$message({
          message: "请输入英文地址",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.skype) {
        this.$message({
          message: "请输入skype",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.weChat) {
        this.$message({
          message: "请输入weChat",
          type: "warning"
        });
        return false;
      }
      if (!this.formData.qq) {
        this.$message({
          message: "请输入QQ",
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
.contact-wrap .form-wrap {
  margin-top: 15px;
  padding-top: 60px;
  border-top: 1px dashed #ddd;
}
.contact-wrap .form-wrap .item {
  width: 450px;
  margin: 0 160px 20px;
}
.contact-wrap .btn-wrap {
  margin: 45px 0 0 280px;
}
.contact-wrap .btn-wrap .el-button {
  width: 160px;
}
</style>


