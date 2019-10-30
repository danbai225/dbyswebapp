<template>
  <div>
    <el-page-header
      @back="goBack"
      title="返回首页"
      content="搜索影视"
    ></el-page-header>
    <div id="s">
      <el-input
        v-model="input"
        placeholder="请输入影视名字"
        clearable
        :change="sou()"
      ></el-input>
    </div>
    <h3 v-if="input != ''">有关"{{ input }}"的影视</h3>
    <el-row :gutter="10">
      <el-col
        :xs="8"
        :sm="6"
        :md="6"
        :lg="4"
        :xl="4"
        v-for="ys in yslist"
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
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      input: "",
      yslist: {},
      inputr: null,
      dsq: 0,
      souflg: true
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    sou() {
      this.inputr = this.input;
      this.souflg = true;
    },
    ysOn(id) {
      this.$router.push({ path: "/ys", query: { id: id } });
    }
  },
  mounted() {
    setInterval(() => {
      if (this.souflg) {
        if (this.input != "") {
          if (this.input == this.inputr) {
            this.souflg = false;
            this.$axios
              .get(this.ysip + "/api/v1/ys/search/ys/" + this.input)
              .then(r => {
                this.yslist = r.data.data;
              });
          }
        }
      }
    }, 1000);
  }
};
</script>

<style>
.el-page-header {
  margin: 10px;
}
#s {
  width: 90%;
  margin: 10px auto;
}
.ystp {
  width: 100%;
}
.zt {
  margin: 0px;
  line-height: 1.2rem;
  font-size: 1.2rem;
  background: #67c23a;
  color: #ffffff;
  white-space: nowrap; /* 使文本不可换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 显示省略符号来代表被隐藏的文本 */
}
.pm {
  margin: 5px;
  line-height: 1.2rem;
  font-size: 1.2rem;
  white-space: nowrap; /* 使文本不可换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 显示省略符号来代表被隐藏的文本 */
}

@media (min-width: 768px) and (max-width: 991px) {
  #s {
    width: 60%;
    margin: 20px auto;
  }
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
  #s {
    width: 50%;
    margin: 40px auto;
  }
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
