<template>
  <div>
    <h3>影视介绍</h3>
    <div id="content">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="6" :lg="4" :xl="3">
          <img id="ystp" :src="ys.tp" />
        </el-col>
        <el-col :xs="12" :sm="6" :md="8" :lg="9" :xl="11">
          <p class="bn" v-if="ys.dy != ''">
            导演:
            <span class="bt">{{ ys.dy }}</span>
          </p>
          <p class="bn" v-if="ys.zy != ''">
            主演:
            <span class="bt">{{ ys.zy }}</span>
          </p>
          <p class="bn" v-if="ys.dq != ''">
            地区:
            <span class="bt">{{ ys.dq }}</span>
          </p>
          <p class="bn" v-if="ys.zt != ''">
            状态:
            <span class="bt">{{ ys.zt }}</span>
          </p>
          <p class="bn" v-if="ys.dq != ''">
            地区:
            <span class="bt">{{ ys.dq }}</span>
          </p>
          <p class="bn" v-if="ys.sytime != ''">
            播放时间:
            <span class="bt">{{ ys.sytime }}</span>
          </p>
          <p v-if="ys.pf != ''">
            评分:
            <el-rate
              v-model="ys.pf"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              :max="10"
            ></el-rate>
          </p>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="js">
            <p>{{ ys.js }}</p>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>

      <div id="info"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Synopsis",
  computed: mapState({
    ys: state => state.ys
  })
};
</script>

<style>
.js {
  text-align: center;
}
.bn {
  line-height: 1rem;
  font-size: 14px;
  color: #909399;
  margin-block-end: 0.5em;
  margin-block-start: 0.5em;
}
.bt {
  font-size: 13px;
  color: #67c23a;
}
#content {
  text-align: left;
}
#ystp {
  width: 100%;
}

@media (min-width: 768px) and (max-width: 991px) {
  .bn {
    line-height: 2rem;
    margin-block-end: 1rem;
    margin-block-start: 1rem;
  }
}
@media (min-width: 992px) {
  .bn {
    line-height: 2rem;
    margin-block-end: 1rem;
    margin-block-start: 1rem;
  }
}
</style>
