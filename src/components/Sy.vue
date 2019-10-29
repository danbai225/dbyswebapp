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
      <h3 class="typebt">最新电影</h3>
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
            <img class="ystp" :src="dy.tp" @click="ysOn(dy.id)" />
            <p class="zt">{{ dy.zt }}</p>
            <p class="pm">{{ dy.pm }}</p>
          </div>
        </el-col>
      </div>
    </el-row>

    <el-row :gutter="10">
      <el-divider></el-divider>
      <h3 class="typebt">最新电视剧</h3>
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
            <img class="ystp" :src="dsj.tp" @click="ysOn(dsj.id)" />
            <p class="zt">{{ dsj.zt }}</p>
            <p class="pm">{{ dsj.pm }}</p>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="10">
      <el-divider></el-divider>
      <h3 class="typebt">最新综艺</h3>
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
            <img class="ystp" :src="zy.tp" @click="ysOn(zy.id)" />
            <p class="zt">{{ zy.zt }}</p>
            <p class="pm">{{ zy.pm }}</p>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="10">
      <el-divider></el-divider>
      <h3 class="typebt">最新动漫</h3>
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
            <img class="ystp" :src="dm.tp" @click="ysOn(dm.id)" />
            <p class="zt">{{ dm.zt }}</p>
            <p class="pm">{{ dm.pm }}</p>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Sy",
  data() {
    return {
      sy: {}
    };
  },
  methods: {
    ysOn(id) {
      this.$router.push({ name: "ys", query: { id: id } });
    },
    ...mapMutations({
      add: "SET_USER"
    })
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
  height: 11.25rem;
}
.el-carousel__container {
  height: 13rem !important;
}
.lbpm {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.typebt {
  font-size: 2rem;
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
.el-divider {
  margin-top: 1rem !important;
}

@media (min-width: 768px) and (max-width: 991px) {
  .gg {
    font-size: 1.5rem;
  }
  .lbpm {
    font-size: 1.5rem;
  }
  .lbt {
    height: 16rem;
  }
  .el-carousel__container {
    height: 20rem !important;
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
  .gg {
    font-size: 2rem;
  }
  .lbpm {
    font-size: 2rem;
  }
  .lbt {
    height: 22rem;
  }
  .el-carousel__container {
    height: 25rem !important;
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
