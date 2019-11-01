<template>
  <div id="nav">
    <div id="menu">
      <el-dropdown placement="right-start" @command="handleCommand">
        <el-button size="mini" type="primary">=</el-button>
        <el-dropdown-menu slot="dropdown">
          <span v-if="user != null">欢迎{{ user.username }}:</span>
          <el-dropdown-item command="login" v-if="user == null"
            >登陆</el-dropdown-item
          >
          <el-dropdown-item command="reg" v-if="user == null"
            >注册</el-dropdown-item
          >
          <el-dropdown-item command="search">搜索</el-dropdown-item>
          <el-dropdown-item v-if="user != null" command="person"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item command="logout" v-if="user != null"
            >退出登陆</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-menu
      mode="horizontal"
      @select="Select"
      background-color="#F7F9F9"
      text-color="#566573"
      active-text-color="#273746"
    >
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item index="dy">电影</el-menu-item>
      <el-menu-item index="dsj">电视剧</el-menu-item>
      <el-menu-item index="zy">综艺</el-menu-item>
      <el-menu-item index="dm">动漫</el-menu-item>
    </el-menu>
    <div @click="gop()">
      <el-avatar v-if="user != null" :src="user.headurl"></el-avatar>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Message } from "element-ui";
export default {
  name: "Ysnav",
  data() {
    return {
      user: null
    };
  },
  methods: {
    gop() {
      this.$router.push({ name: "person" });
    },
    Select(key) {
      if (this.$route.name != key) {
        this.$router.push({
          name: key
        });
      }
    },
    ...mapMutations({
      add: "SET_USER"
    }),
    handleCommand(command) {
      if (command == "logout") {
        this.$axios.post(this.ysip + "/logout").then(response => {
          response;
          this.user = null;
          localStorage.removeItem("user");
          this.$store.commit("SET_USER", {});
          Message({
            showClose: true,
            message: "您已退出登陆",
            type: "success",
            duration: 2000
          });
        });
      } else {
        this.$router.push({ name: command });
      }
    }
  },
  mounted() {
    this.$axios.get(this.ysip + "/iflogin").then(r => {
      if (r.data == "yes") {
        if (localStorage.getItem("user") != null) {
          this.add(JSON.parse(localStorage.getItem("user")));
          this.user = this.$store.getters.user;
        }
      } else {
        localStorage.removeItem("user");
      }
    });
  }
};
</script>

<style scoped="">
#nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f9f9;
}
.el-avatar {
  width: 50px;
  height: 50px;
}
@media (max-width: 992px) {
  .el-menu-item {
    padding: 0px 0.9375rem;
  }
}
@media (max-width: 768px) {
  .el-menu-item {
    padding: 0px 0.625rem;
  }
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
#menu {
  position: fixed;
  top: 10%;
  left: 0px;
  z-index: 10;
}
</style>
