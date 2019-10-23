<template>
  <div id="login">
    <h3>登陆</h3>
    <span>欢迎使用淡白影视</span>
    <div class="form">
      <el-form
        :model="dlForm"
        status-icon
        ref="ruleForm"
        label-position="top"
        size="small"
      >
        <el-form-item label="用户名" prop="username"
          ><el-input v-model="dlForm.username" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item label="确认密码" prop="password"
          ><el-input
            type="password"
            v-model="dlForm.password"
            autocomplete="off"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登陆</el-button>
          <el-button @click="zc()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      dlForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations({
      add: "SET_USER"
    }),
    msg(type, msg) {
      Message({
        showClose: true,
        message: msg,
        type: type,
        duration: 2000
      });
    },
    submitForm() {
      console.log(this.dlForm);
      let data = new FormData();
      data.append("username", this.dlForm.username);
      data.append("password", this.dlForm.password);
      this.$axios
        .post("http://danbai:8081/loginapp", data)
        .then(response => {
          if (response.data != "err") {
            this.msg("success", "欢迎" + response.data.username + "回来");
            this.add(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            this.$router.push("/");
          } else {
            this.msg("error", "用户名或密码错误");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    zc() {
      this.$router.push({ name: "reg" });
    }
  }
};
</script>

<style>
h3 {
  color: #409eff;
}
#login {
  border-radius: 2px;
  margin: 10% auto;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  width: 50%;
}
.form {
  width: 80%;
  margin: 0px auto;
}
@media (min-width: 768px) and (max-width: 991px) {
  #login {
    margin: 20% auto;
  }
}
@media (min-width: 320px) and (max-width: 767px) {
  #login {
    margin: 30% auto;
    width: 80%;
  }
}
</style>
