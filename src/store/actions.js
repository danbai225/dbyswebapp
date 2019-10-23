import * as types from "./mutation-types.js";

export default {
  tokenAsyn({ commit }, { user }) {
    commit(types.SET_USER, user); //修改user
  }
};
