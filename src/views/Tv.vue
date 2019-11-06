<template>
  <div>
    <el-page-header
      @back="goBack"
      title="返回"
      :content="radio"
    ></el-page-header>
    <div class="dplayer"></div>
    <d-player ref="player" :options="options" />
    <el-radio-group v-model="radio" :change="huan()">
      <el-radio-button
        :label="tv.name"
        v-for="tv in tvs"
        :key="tv.id"
      ></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import VueDPlayer from "@/components/VueDplayer.js";
export default {
  name: "Tv",
  components: {
    "d-player": VueDPlayer
  },
  data() {
    return {
      radio: "CCTV-1综合",
      player: null,
      lstpd: "",
      tvs: {},
      options: {
        video: {
          url: "",
          pic: "https://cdn.p00q.cn/ys/img/tip.png"
        },
        autoplay: true,
        logo: require("../assets/logo.png"),
        contextmenu: [
          {
            text: "淡白博客",
            link: "https://p00q.cn"
          }
        ]
      }
    };
  },
  methods: {
    goBack() {
      if (this.$route.query.gjc != undefined) {
        this.$router.replace({
          path: "/search",
          query: { gjc: this.$route.query.gjc }
        });
      } else {
        this.$router.go(-1);
      }
    },
    huan() {
      for (var i in this.tvs) {
        if (this.tvs[i].name == this.radio) {
          if (this.lstpd != this.radio) {
            this.lstpd = this.radio;
            this.options.video.url = this.tvs[i].url;
            this.player.switchVideo(this.options.video);
          }
        }
      }
    }
  },
  mounted() {
    this.player = this.$refs.player.dp;
    this.$axios.get(this.ysip + "/api/v1/ys/tv").then(response => {
      this.tvs = response.data.data;
      this.options.video.url = response.data.data[0].url;
      this.player.switchVideo(this.options.video);
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
</style>
