<template>
  <div>
    <el-page-header @back="goBack" title="返回" :content="pm"></el-page-header>
    <div class="dplayer"></div>
    <d-player ref="player" :options="options" />
    <Synopsis />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Synopsis from "@/components/Synopsis.vue";
import VueDPlayer from "@/components/VueDplayer.js";
export default {
  name: "Ys",
  components: {
    Synopsis,
    "d-player": VueDPlayer
  },
  data() {
    return {
      pm: "",
      player: null,
      jis: null,
      id: 0,
      options: {
        video: {
          url: "",
          pic: "http://cdn.p00q.cn:81/ys/img/tip.png"
        },
        autoplay: true,
        logo: require("../assets/logo.png"),
        danmaku: {
          id: "",
          api: "http://39.108.110.44:1207/",
          user: "user",
          bottom: "30%"
        },
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
    ...mapMutations({
      addys: "SET_YS"
    }),
    goBack() {
      this.player.destroy();
      this.$router.go(-1);
    }
  },
  mounted() {
    window.addEventListener("popstate", this.goBack, false);
    let id = this.$route.params.id;
    if (id == undefined) {
      this.$router.push("/");
    }
    this.id = id;
    this.$axios.get(this.ysip + "/getys?id=" + id).then(response => {
      var ys = response.data.ys;
      if (ys == null) {
        this.$router.push("/");
      }
      this.pm = ys.pm;
      this.addys(ys);
      if (ys.gkdz != "[]") {
        this.jis = JSON.parse(ys.gkdz);
      } else {
        this.jis = JSON.parse(ys.xzdz);
      }
      if (response.data.gkls != null) {
        this.options.video.url = response.data.gkls.url;
        this.options.danmaku.id = id + response.data.gkls.jiname;
      } else {
        this.options.video.url = this.jis[0].url;
        this.options.danmaku.id = id + this.jis[0].name;
      }
      this.player = this.$refs.player.dp;
      this.player.switchVideo(this.options.video, this.options.danmaku);
      if (response.data.time != null) {
        this.player.seek(response.data.time);
      }
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
