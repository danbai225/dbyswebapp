<template>
  <div>
    <div class="type">
      <el-row :gutter="10">
        <el-col
          :xs="8"
          :sm="6"
          :md="6"
          :lg="4"
          :xl="4"
          v-for="ys in page.list"
          :key="ys.id"
        >
          <div class="ys">
            <img class="ystp" :src="ys.tp" @click="ysOn(ys.id)" />
            <p class="zt">{{ ys.zt }}</p>
            <p class="pm">{{ ys.pm }}</p>
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
      this.$router.push({ name: "ys", query: { id: id } });
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
.type {
  margin: 0rem auto;
}
.ystp {
  width: 100%;
}
.zt {
  margin: 0px;
  line-height: 1rem;
  font-size: 1rem;
  background: #67c23a;
  color: #ffffff;
  white-space: nowrap; /* 使文本不可换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 显示省略符号来代表被隐藏的文本 */
}
.pm {
  margin: 5px;
  line-height: 1rem;
  font-size: 1rem;
  white-space: nowrap; /* 使文本不可换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 显示省略符号来代表被隐藏的文本 */
}

@media (min-width: 768px) and (max-width: 991px) {
  .zt {
    margin: 0px;
    line-height: 1.5rem;
    font-size: 1.5rem;
  }
  .pm {
    margin: 10px;
    line-height: 1.5rem;
    font-size: 1.5rem;
  }
}
@media (min-width: 992px) {
  .zt {
    margin: 0px;
    line-height: 2rem;
    font-size: 2rem;
  }
  .pm {
    margin: 10px;
    line-height: 2rem;
    font-size: 2rem;
  }
}
</style>
