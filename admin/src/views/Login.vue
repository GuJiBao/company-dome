<template>
    <div class="login-wrap">
        <div class="form-wrap">
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <h1 class="title">系统登录</h1>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { addLocalStorage, encode } from '@/utils/utils';

export default {
    data() {
        let checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("用户名不能为空"));
            }
            setTimeout(() => {
                if (value.length <= 3 && value.length >= 16) {
                    callback(new Error("用户名由3~16个字符组成"));
                } else {
                    callback();
                }
            }, 1000);
        };
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (value.length <= 8 && value.length >= 20) {
                    callback(new Error("密码由8~20个字符组成"));
                } else {
                    callback();
                }
            }
        };
        return {
            ruleForm: {
                userName: "",
                password: ""
            },
            rules: {
                userName: [{ validator: checkName, trigger: "blur" }],
                password: [{ validator: validatePass, trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            window.console.log(formName);
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let res = await this.$http.post('/api/user/signin', { userName: this.ruleForm.userName, password: this.ruleForm.password });
                    if (res.data.success) {
                        // 保存用户信息
                        addLocalStorage('userInfo', encode(res.data.data));
                        addLocalStorage('token', res.data.accessToken);
                        this.$message({
                            message: '登录成功',
                            type: "success"
                        });
                        this.$router.push('/product');
                    } else {
                        this.$message.error(res.data.msg);
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="less" scoped>
.login-wrap {
    .form-wrap {
        position: absolute;
        left: 50%;
        top: 0;
        width: 450px;
        margin-top: 200px;
        padding: 15px 60px 30px 20px;
        border: 1px solid #DCDFE6;
        border-radius: 5px;
        transform: translateX(-50%);
        .title {
            margin-bottom: 45px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e6a23c;
            font-size: 16px;
        }
    }
}

</style>

