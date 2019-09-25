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
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPass">
                    <el-input type="password" v-model="ruleForm.confirmPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
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
                if (value.length <= 6 && value.length >= 50) {
                    callback(new Error("密码由6~50个字符组成"));
                } else {
                    if (this.ruleForm.confirmPass !== "") {
                        this.$refs.ruleForm.validateField("confirmPass");
                    }
                    callback();
                }
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                name: "",
                password: "",
                confirmPass: ""
            },
            rules: {
                name: [{ validator: checkName, trigger: "blur" }],
                password: [{ validator: validatePass, trigger: "blur" }],
                confirmPass: [{ validator: validatePass2, trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let res = await this.$http.post("/api/user/signup", {
                        userName: this.ruleForm.name,
                        password: this.ruleForm.password
                    });
                    if (res.data.success) {
                        this.$message({
                            message: '注册成功',
                            type: "success"
                        });
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
        padding: 45px 60px 30px 20px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        transform: translateX(-50%);
    }
}
</style>

