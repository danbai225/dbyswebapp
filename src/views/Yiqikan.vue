<template>
  <div>
    <div id="yiqikan-shouye">
      <h2>欢迎使用一起看功能</h2>
      <h3>当前在线{{online}}人</h3>
      <div id="yiqikan-rooms">
        <el-table :data="rooms" style="width: 100%">
          <el-table-column prop="name" label="房间名"></el-table-column>
          <el-table-column prop="author" label="房主"></el-table-column>
          <el-table-column prop="online" label="在线人数"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="joinbt(scope.row)">加入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="goshouye()">返回首页</el-button>
        <el-button type="primary" @click="newRoom()">创建房间</el-button>
      </div>
    </div>
    <div id="yiqikan-room">
      <h2>房间名:{{room.name}}</h2>
      <d-player ref="player" :options="options" />
      <el-tabs type="border-card">
        <el-tab-pane label="聊天">
          <div id="statements">
            <div class="statement" v-for="s in statements" :key="s.id">
              {{s.username}}-{{s.time}}:
              <br />
              {{s.msg}}
            </div>
          </div>
          <el-row :gutter="0">
            <el-col :span="20">
              <el-input placeholder="请输入内容" v-model="inputmsg" clearable></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" icon="el-icon-s-promotion" circle @click="sendChatbt()"></el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="在线用户">
          <el-card class="box-card" v-for="u in room.users" :key="u.id">
            {{u.username}}
            <span v-if="u.username==room.author">👑</span>
            <el-button
              type="success"
              round
              v-else-if="username==room.author"
              size="mini"
              @click="zhuanfz(u.id)"
            >给他房主</el-button>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="选择影视">
          <div id="yiqikan-xzys">
            <div id="yiqikan-souinput">
              <el-row :gutter="0">
                <el-col :span="20">
                  <el-input placeholder="请输入影视片名、演员名字" v-model="souinput" clearable></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" icon="el-icon-search" circle @click="yssou()"></el-button>
                </el-col>
              </el-row>
            </div>
            <div id="yiqikan-yss">
              <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for="dy in yslist" :key="dy.id">
                <div class="yiqikan-ys">
                  <img class="ystp" :src="dy.tp" @click="ysOn(dy.id)" />
                  <p class="zt">{{ dy.zt }}</p>
                  <p class="pm">{{ dy.pm }}</p>
                </div>
              </el-col>
            </div>
            <div id="yiqikan-jis">
              <el-button v-for="ji in jis" :key="ji.name" @click="jiOn(ji.url)">{{ji.name}}</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <el-button size="mini" @click="exitbt()">退出房间</el-button>
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { MessageBox } from "element-ui";
import ReconnectingWebSocket from "reconnecting-websocket";
import VueDPlayer from "@/components/VueDplayer.js";
import $ from "jquery";
export default {
  name: "Yiqikan",
  components: {
    "d-player": VueDPlayer
  },
  data: function() {
    return {
      username: "",
      player: null,
      rws: null,
      online: 0,
      rooms: [],
      room: {
        name: "",
        users: [],
        author: ""
      },
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
      },
      inputmsg: "",
      statements: [],
      souinput: "",
      yslist: [],
      jis: []
    };
  },
  methods: {
    getFormatDate() {
      var date = new Date();
      var currentDate =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return currentDate;
    },
    toJsonStr(obj) {
      return JSON.stringify(obj, null, 4);
    },
    yssou() {
      this.$axios
        .get("http://185.207.153.189:8081/api/v1/ys/search/" + this.souinput)
        .then(response => {
          if (response.data != "err") {
            $("#yiqikan-yss").show();
            $("#yiqikan-jis").hide();
            this.yslist = response.data.data;
          }
        });
    },
    ysOn(id) {
      this.$axios.get(this.ysip + "/getys?id=" + id).then(response => {
        $("#yiqikan-yss").hide();
        $("#yiqikan-jis").show();
        this.jis = JSON.parse(response.data.ys.gkdz);
      });
    },
    jiOn(url) {
      this.rws.send(this.toJsonStr({ type: "sendUrl", url: url }));
      this.dpurl(url);
    },
    onmsg(e) {
      var json = JSON.parse(e.data);
      switch (json.type) {
        case "info":
          this.info(json);
          break;
        case "join":
          this.join(json);
          break;
        case "roomInfo":
          this.roomInfo(json);
          break;
        case "sendChat":
          this.sendChat(json);
          break;
        case "sendUrl":
          this.sendUrl(json);
          break;
        case "sendTime":
          this.sendTime(json.time);
          break;
      }
    },
    newRoom() {
      var name = "";
      var pass = "";
      MessageBox.prompt("输入房间名", "创建房间", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        if (value != null) {
          name = value;
          MessageBox.prompt("输入房间密码(不设置直接确认)", "创建房间", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(({ value }) => {
            if (value != null) {
              pass = value;
            }
            this.rws.send(
              this.toJsonStr({ type: "newRoom", name: name, pass: pass })
            );
          });
        }
      });
    },
    sendUrl(data) {
      if (this.username != this.room.author) {
        this.dpurl(data.url);
      }
    },
    info(data) {
      this.rooms = data.rooms;
      this.online = data.online;
    },
    join(data) {
      if (data.ok) {
        Message.success("成功进入房间");
        this.rws.send(this.toJsonStr({ type: "roomInfo" }));
        $("#yiqikan-shouye").hide();
        $("#yiqikan-room").show();
        
        this.statements = [];
      } else {
        Message.error("加入失败");
      }
    },
    roomInfo(data) {
      this.room = data;
      if (this.username == this.room.author) {
          $("#yiqikan-xzys").show();
        } else {
          $("#yiqikan-xzys").hide();
        }
      if (data.url != "" && this.options.video.url == "") {
        this.dpurl(data.url);
      }
    },
    sendChat(data) {
      data.time=this.getFormatDate();
      this.statements.push(data);
    },
    joinbt(row) {
      if (row.needPass) {
        MessageBox.prompt("请输入密码", "加入该房间需要密码", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({ value }) => {
          this.rws.send(
            this.toJsonStr({ type: "join", roomId: row.id, pass: value })
          );
        });
      } else {
        this.rws.send(this.toJsonStr({ type: "join", roomId: row.id }));
      }
    },
    sendChatbt() {
      if (this.inputmsg != "") {
        this.rws.send(this.toJsonStr({ type: "sendChat", msg: this.inputmsg }));
        this.inputmsg = "";
      }
    },
    exitbt() {
      this.rws.send(this.toJsonStr({ type: "exitRoom" }));
      this.shouye = true;
      this.player.pause();
      this.player.switchVideo("");
      this.statements = [];
      this.yslist = [];
      this.jis = [];
      $("#yiqikan-room").hide();
      $("#yiqikan-shouye").show();
    },
    dpurl(url) {
      if (url != null) {
        this.options.video.url = url;
        this.player.switchVideo(this.options.video);
        this.player.play();
      }
    },
    sendTime(data) {
      if (Math.abs(this.player.video.currentTime - data) > 5) {
        this.player.seek(data);
      }
    },
    zhuanfz(id) {
      this.rws.send(this.toJsonStr({ type: "transfer", id: id }));
    },goshouye(){
       window.location.href="http://m.dbys.vip"
    }
  },
  mounted() {
    this.$axios.get(this.ysip + "/iflogin").then(r => {
      if (r.data == "yes") {
        if (localStorage.getItem("user") != null) {
          this.username = JSON.parse(localStorage.getItem("user")).username;
        }
      } else {
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    });
    if(this.rws==null){
      //连接服务器
    this.username = JSON.parse(localStorage.getItem("user")).username;
    this.rws = new ReconnectingWebSocket(
      "ws://185.207.153.189:8081/cinema/socket/" + this.username
    );
    this.rws.addEventListener("message", this.onmsg);
    this.player = this.$refs.player.dp;
    $("#yiqikan-room").hide();
    }
    //定时器

    //首页信息刷新
    this.timer1=setInterval(() => {
      if (!$("#yiqikan-shouye").is(":hidden")) {
        this.rws.send(this.toJsonStr({ type: "info" }));
      }
    }, 1000);
    //观看时间发送
    this.timer2=setInterval(() => {
      if ($("#yiqikan-shouye").is(":hidden")) {
        if (this.username == this.room.author) {
          this.rws.send(
            this.toJsonStr({
              type: "sendTime",
              time: this.player.video.currentTime
            })
          );
        }
      }
    }, 1000);
    //房间信息刷新
    this.timer3=setInterval(() => {
      if ($("#yiqikan-shouye").is(":hidden")) {
        this.rws.send(this.toJsonStr({ type: "roomInfo" }));
      }
    }, 5000);
  },destroyed() {
    this.player.destroy();
    window.clearTimeout(this.timer1);
    window.clearTimeout(this.timer2);
    window.clearTimeout(this.timer3);
    this.rws.close();
  }
};
</script>

<style>
#statements {
  height: 20rem;
  text-align: left;
  border: 1px solid gray;
  overflow: auto;
}
</style>
