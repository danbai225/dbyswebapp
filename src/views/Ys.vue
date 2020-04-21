<template>
  <div>
    <el-page-header @back="goBack" title="返回" :content="pm"></el-page-header>
    <div class="dplayer"></div>
    <d-player ref="player" :options="options" />
    <el-radio-group v-model="radio" :change="huan()">
      <el-radio-button
        :label="ji.name"
        v-for="ji in jis"
        :key="ji.name"
      ></el-radio-button>
    </el-radio-group>
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
      radio: "",
      lastjiname: "",
      pm: "",
      player: null,
      jis: null,
      id: 0,
      ys: {},
      tiaotime: 0,
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
    huan() {
      for (var i in this.jis) {
        if (this.jis[i].name == this.radio) {
          if (this.lastjiname != this.jis[i].name) {
            this.bo(i);
          }
        }
      }
    },
    bo(i) {
      if (this.jis[i].name != null) {
        this.lastjiname = this.jis[i].name;
        this.options.video.url = this.jis[i].url;
        this.player.switchVideo(this.options.video, this.options.danmaku);
        this.radio = this.jis[i].name;
      }
    },
    ...mapMutations({
      addys: "SET_YS"
    }),
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
    nexiji() {
      for (var i in this.jis) {
        if (this.jis[i].name == this.lastjiname) {
          if (this.jis.length > i + 1) {
            this.bo(parseInt(i) + 1);
          }
          return;
        }
      }
    },
    tiao() {
      if (this.tiaotime != 0) {
        this.player.seek(this.tiaotime);
        this.tiaotime = 0;
      }
    }
  },
  mounted() {
    this.user = this.$store.getters.user;
    this.player = this.$refs.player.dp;

    let id = this.$route.query.id;
    this.id = id;
    this.$axios.get(this.ysip + "/getys?id=" + id).then(response => {
      var ys = response.data.ys;
      if (ys == null) {
        this.$router.push("/");
      }
      this.ys = ys;
      this.pm = ys.pm;
      this.addys(ys);
      if (ys.gkdz != "[]") {
        this.jis = JSON.parse(ys.gkdz);
      } else {
        this.jis = JSON.parse(ys.xzdz);
      }
      if (response.data.gkls != null) {
        this.radio = response.data.gkls.jiname;
        this.tiaotime = response.data.time;
      } else {
        this.options.video.url = this.jis[0].url;
        this.radio = this.jis[0].name;
      }
      if (this.user.username != undefined) {
        this.dsq = setInterval(() => {
          let data = new FormData();
          data.append("ysid", this.id);
          data.append("username", this.user.username);
          data.append("time", this.player.video.currentTime);
          data.append("ysjiname", this.radio);
          this.$axios.post(this.ysip + "/ys/time", data);
        }, 5000);
      }
      this.loading.close();
    });
    this.player.on("ended", () => {
      this.nexiji();
    });
    this.player.on("playing", () => {
      this.tiao();
    });
  },
  created() {
    this.loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.7)"
    });
  },
  destroyed() {
    this.player.destroy();
    window.clearTimeout(this.dsq);
  }
};
</script>
<style>
.el-page-header {
  margin: 10px;
}
</style>
