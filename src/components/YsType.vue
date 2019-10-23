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
            <img class="ystp" :src="ys.tp" />
            <span>{{ ys.pm }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page.pagenum"
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
      this.$axios
        .get(
          "http://192.168.100.7:8081/gettypeys?type=" +
            this.lxtype +
            "&page=" +
            val
        )
        .then(response => {
          this.page = response.data;
        });
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
      .get(
        "http://danbai:8081/gettypeys?type=" +
          this.lxtype +
          "&page=" +
          this.pagenum
      )
      .then(response => {
        this.page = response.data;
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
