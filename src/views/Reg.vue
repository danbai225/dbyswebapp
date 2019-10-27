<template>
  <div>
    <el-page-header @back="goBack" title="返回" content="注册" />
    <div id="bd">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-position
        size="small"
        label-width="auto"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="至少6位"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input
            type="password"
            placeholder="与密码一致"
            v-model="ruleForm.checkpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input
            v-model="ruleForm.email"
            placeholder="请输入email"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="yzm">
          <el-input
            v-model="ruleForm.yzm"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
        >
        <el-button @click="getyzm()" :disabled="onyzm">{{
          this.ruleForm.yzlr
        }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "Reg",
  data() {
    var yzps = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("请输入密码至少6位"));
        } else {
          if (this.ruleForm.checkpassword !== "") {
            this.$refs.ruleForm.validateField("checkpassword");
          }
          callback();
        }
      }
    };
    var yzps2 = (rule, value, callback) => {
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
        username: "",
        password: "",
        checkpassword: "",
        email: "",
        yzm: "",
        yzlr: "获取验证码",
        yzs: 0
      },
      onyzm: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        password: [{ required: true, validator: yzps, trigger: "blur" }],
        checkpassword: [{ required: true, validator: yzps2, trigger: "blur" }],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        yzm: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    self.setInterval(() => {
      if (this.ruleForm.yzs > 0) {
        this.ruleForm.yzs -= 1;
        if (this.ruleForm.yzs == 0) {
          this.ruleForm.yzlr = "获取验证码";
          this.onyzm = false;
        } else {
          this.ruleForm.yzlr = "请稍后再试(" + this.ruleForm.yzs + ")";
        }
      }
    }, 1000);
  },
  methods: {
    msg(type, msg) {
      Message({
        showClose: true,
        message: msg,
        type: type,
        duration: 2000
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = new FormData();
          data.append("username", this.ruleForm.username);
          data.append("password", this.ruleForm.password);
          data.append("email", this.ruleForm.email);
          data.append("yzm", this.ruleForm.yzm);
          this.$axios
            .post(this.ysip + "/regapp", data)
            .then(response => {
              if (response.data.zt == "ok") {
                this.msg("success", "恭喜你注册成功");
                this.$router.push({ name: "home" });
              } else {
                this.msg("error", response.data.message);
                this.fy();
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    fy() {
      this.ruleForm.yzs = 0;
      this.ruleForm.yzlr = "获取验证码";
      this.onyzm = false;
    },
    getyzm() {
      this.onyzm = true;
      this.ruleForm.yzs = 60;
      if (this.ruleForm.username == "") {
        this.msg("warning", "请输入用户名");
        this.fy();
        return;
      }
      var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/; //正则表达式
      if (reg.test(this.ruleForm.email)) {
        this.$axios
          .get(
            this.ysip +
              "/getvalidate?username=" +
              this.ruleForm.username +
              "&email=" +
              this.ruleForm.email
          )
          .then(response => {
            if (response.data == "ok") {
              this.msg("success", "验证码以发送到你的邮箱请注意查收");
            } else {
              this.fy();
              this.msg("warning", "发送失败");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.msg("warning", "邮箱输入不正确");
        this.fy();
      }
    }
  }
};
</script>

<style>
#bd {
  margin-top: 4rem;
}
@media (min-width: 768px) {
  #bd {
    width: 60%;
    margin: 4rem auto;
  }
}
@media (min-width: 1024px) {
  #bd {
    width: 40%;
    margin: 4rem auto;
  }
}
</style>
