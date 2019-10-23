import Vue from "vue";
import Vuex from "vuex";
import state from "./state.js";
import * as getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
});
