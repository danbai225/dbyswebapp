<template>
  <div>
    <el-page-header
      @back="goBack"
      title="返回首页"
      content="个人信息"
    ></el-page-header>
    <el-card class="box-card">
      <div class="zl">
        <el-avatar :src="this.user.headurl">
          <img src="http://img.p00q.cn:222/2019/10/25/b8fc388600d73.ico" />
        </el-avatar>
        <h3>{{ this.user.username }}</h3>
        <div>
          <i class="el-icon-user"></i>
          类型:{{ this.user.type == 1 ? "普通用户" : "管理员" }}
        </div>
        <div>
          <i class="el-icon-message"></i>
          邮箱:{{ this.user.email }}
        </div>
        <div>
          <i class="el-icon-view"></i>
          观看数:{{ this.gkls.length }}
        </div>
        <el-popover placement="top-start" width="100px" title="上传头像">
          <el-upload
            class="avatar-uploader"
            action="http://img.p00q.cn:222/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            slot="reference"
            >修改头像</el-button
          >
        </el-popover>
      </div>
    </el-card>
    <div class="gkls">
      <h4>观看历史</h4>
      <div v-for="ls in this.gkls" :key="ls.id">
        <el-row :gutter="10">
          <el-card class="ls" shadow="hover">
            <el-col :span="6">
              <img class="ysimg" :src="ls.ysimg" @click="ysOn(ls.id)" />
            </el-col>
            <el-col :span="18">
              <div>
                <p>片名:{{ ls.pm }}</p>
                <p>观看到:{{ ls.ji }}</p>
                <p>时长:{{ ls.time }}</p>
                <p>观看时间:{{ ls.gktime }}</p>
              </div>
            </el-col>
          </el-card>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Message } from "element-ui";
export default {
  name: "Person",
  data() {
    return {
      imageUrl: "",
      user: {},
      gkls: {}
    };
  },
  components: {},
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      var u = JSON.parse(localStorage.getItem("user"));
      u.headurl = res.data.url;
      localStorage.setItem("user", JSON.stringify(u));
      this.add(u);
      this.user = u;
      let data = new FormData();
      data.append("url", res.data.url);
      this.$axios.post(this.ysip + "/hedimgupdate", data).then(r => {
        if (r.data == "ok") {
          this.msg("success", "更换成功");
        } else {
          this.msg("error", "更换失败");
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!(isJPG | isPNG)) {
        this.msg("error", "上传头像图片只能是 JPG 和 PNG格式!");
        return false;
      }
      if (!isLt2M) {
        this.msg("error", "上传头像图片大小不能超过 2MB!");
        return false;
      }
      this.msg("success", "上传中");
      return true;
    },
    goBack() {
      this.$router.go(-1);
    },

    ysOn(id) {
      this.$router.push({ name: "ys", query: { id: id } });
    }
  },
  mounted() {
    this.$axios.get(this.ysip + "/api/v1/user").then(r => {
      this.user = r.data.data;
    });
    this.$axios.get(this.ysip + "/api/v1/user/gkls").then(r => {
      this.gkls = r.data.data;
      this.loading.close();
    });
  },
  created() {
    this.loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.7)"
    });
  }
};
</script>

<style>
.el-page-header {
  margin: 10px;
}
.el-avatar {
  width: 100px;
  height: 100px;
}
.box-card {
  margin: 10px;
}
h4 {
  margin-block-end: 0.5em;
  margin-block-start: 0.5em;
}
.ysimg {
  width: 100%;
}
.ls {
  margin: 2px;
}
.ls p {
  margin-block-end: 5px;
  margin-block-start: 5px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

@media (min-width: 768px) and (max-width: 991px) {
  .ysimg {
    width: 60%;
  }
  .ls p {
    margin-block-end: 10px;
    margin-block-start: 10px;
  }
}
@media (min-width: 992px) {
  .ysimg {
    width: 50%;
  }
  .ls p {
    margin-block-end: 10px;
    margin-block-start: 10px;
  }
}
</style>
