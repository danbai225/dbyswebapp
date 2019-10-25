import * as types from "./mutation-types.js";

export default {
  userAsyn({ commit }, { user }) {
    commit(types.SET_USER, user); //修改user
  },
  ysAsyn({ commit }, { ys }) {
    commit(types.SET_YS, ys); //修改user
  }
};
