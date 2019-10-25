/*
 * 提交状态修改，即set、get中的set; 是Vuex中唯一修改state的方式 不支持异步操作
 */
import * as types from "./mutation-types";

export default {
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_YS](state, ys) {
    state.ys = ys;
  }
};
