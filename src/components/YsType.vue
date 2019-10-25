<template>
  <div>
    <div class="type">
      <el-row :gutter="10">
        <el-col
          :xs="8"
          :sm="8"
          :md="6"
          :lg="4"
          :xl="4"
          v-for="ys in page.list"
          :key="ys.id"
        >
          <div class="ys">
            <span class="zt">{{ ys.zt }}</span>
            <img class="ystp" :src="ys.tp" @click="ysOn(ys.id)" />
            <span>{{ ys.pm }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page.page"
        :hide-on-single-page="true"
        :pager-count="5"
        :page-size="24"
        layout="prev, pager, next"
        :total="page.total"
        :page-count="page.zys"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "YsType",
  props: {
    type: { type: String, default: "" }
  },
  data() {
    return {
      lxtype: "",
      pagenum: 1,
      page: {}
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)"
      });
      this.$axios
        .get(this.ysip + "/gettypeys?type=" + this.lxtype + "&page=" + val)
        .then(response => {
          this.page = response.data;
          this.loading.close();
        });
    },
    ysOn(id) {
      this.$router.push({ name: "ys", params: { id: id } });
    }
  },
  mounted() {
    switch (this.type) {
      case "dy":
        this.lxtype = "电影";
        break;
      case "dsj":
        this.lxtype = "电视剧";
        break;
      case "dm":
        this.lxtype = "动漫";
        break;
      case "zy":
        this.lxtype = "综艺";
        break;
    }
    this.$axios
      .get(this.ysip + "/gettypeys?type=" + this.lxtype + "&page=" + 1)
      .then(response => {
        this.page = response.data;
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
.type {
  margin: 0px auto;
}
.ys {
  height: 28rem;
}
.zt {
  position: relative;
  top: 90%;
  background: #09c878;
  font-size: 15px;
  color: #ffffff;
}
@media (min-width: 768px) and (max-width: 991px) {
  .ys {
    height: 25rem;
  }
}
@media (min-width: 320px) and (max-width: 767px) {
  .ys {
    height: 16rem;
  }
}
</style>
