<template>
  <div>
    <el-row :gutter="10">
      <div class="gg">公告:{{ sy.gg }}</div>
      <el-divider></el-divider>
      <div id="lb">
        <el-carousel :interval="2000" type="card">
          <el-carousel-item v-for="ys in sy.dy" :key="ys.id">
            <img class="lbt" :src="ys.tp" @click="ysOn(ys.id)" />
            <span class="lbpm">{{ ys.pm }}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
      <h3>最新电影</h3>
      <div class="type">
        <el-col
          :xs="8"
          :sm="6"
          :md="6"
          :lg="4"
          :xl="4"
          v-for="dy in sy.dy"
          :key="dy.id"
        >
          <div class="ys">
            <span class="zt">{{ dy.zt }}</span>
            <img class="ystp" :src="dy.tp" @click="ysOn(dy.id)" />
            <span>{{ dy.pm }}</span>
          </div>
        </el-col>
      </div>
    </el-row>

    <el-row :gutter="10">
      <el-divider></el-divider>
      <h3>最新电视剧</h3>
      <div class="type">
        <el-col
          :xs="8"
          :sm="6"
          :md="6"
          :lg="4"
          :xl="4"
          v-for="dsj in sy.dsj"
          :key="dsj.id"
        >
          <div class="ys">
            <span class="zt">{{ dsj.zt }}</span>
            <img class="ystp" :src="dsj.tp" @click="ysOn(dsj.id)" />
            <span>{{ dsj.pm }}</span>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="10">
      <el-divider></el-divider>
      <h3>最新综艺</h3>
      <div class="type">
        <el-col
          :xs="8"
          :sm="6"
          :md="6"
          :lg="4"
          :xl="4"
          v-for="zy in sy.zy"
          :key="zy.id"
        >
          <div class="ys">
            <span class="zt">{{ zy.zt }}</span>
            <img class="ystp" :src="zy.tp" @click="ysOn(zy.id)" />
            <span>{{ zy.pm }}</span>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="10">
      <el-divider></el-divider>
      <h3>最新动漫</h3>
      <div class="type">
        <el-col
          :xs="8"
          :sm="6"
          :md="6"
          :lg="4"
          :xl="4"
          v-for="dm in sy.dm"
          :key="dm.id"
        >
          <div class="ys">
            <span class="zt">{{ dm.zt }}</span>
            <img class="ystp" :src="dm.tp" @click="ysOn(dm.id)" />
            <span>{{ dm.pm }}</span>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Sy",
  data() {
    return {
      sy: {}
    };
  },
  methods: {
    ysOn(id) {
      this.$router.push({ name: "ys", params: { id: id } });
    }
  },
  mounted() {
    this.$axios.get(this.ysip + "/sy").then(response => {
      this.sy = response.data;
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
.el-col {
  border-radius: 4px;
}
#lb {
  margin: 0rem auto;
}
.lbt {
  height: 23.75rem;
}
.el-carousel__container {
  height: 26rem !important;
}
.lbpm {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.type {
  width: 80%;
  margin: 0rem auto;
}
.ys {
  height: 28rem;
  font-size: 18px;
}
.ys span {
  font-size: 16px;
}
.ystp {
  width: 100%;
  height: 90%;
}
.zt {
  position: relative;
  top: 90%;
  background: #67c23a;
  font-size: 12px;
  color: #ffffff;
}
@media (min-width: 768px) and (max-width: 991px) {
  .lbt {
    height: 16rem;
  }
  .el-carousel__container {
    height: 18rem !important;
  }
  .ys {
    height: 22rem;
    margin-bottom: 10px;
  }
  .type {
    width: 100%;
  }
  .ys span {
    font-size: 16px;
  }
}
@media (min-width: 320px) and (max-width: 767px) {
  .lbt {
    height: 11.25rem;
  }
  .el-carousel__container {
    height: 13rem !important;
  }
  .ys {
    height: 15rem;
    margin-bottom: 10px;
  }
  .type {
    width: 100%;
  }
  .ys span {
    font-size: 13px;
  }
}
</style>
