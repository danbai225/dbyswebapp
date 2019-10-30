import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
window.Hls = require("hls.js");
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.ysip = process.env.VUE_APP_YSIP;
import "element-ui/lib/theme-chalk/index.css";
import {
  Row,
  Carousel,
  CarouselItem,
  Col,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Button,
  Pagination,
  Form,
  FormItem,
  Input,
  Loading,
  PageHeader,
  RadioGroup,
  RadioButton,
  Card,
  Rate,
  Popover,
  Upload
} from "element-ui";
Vue.use(Row);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Col);
Vue.use(Divider);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(DropdownMenu);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Loading);
Vue.use(PageHeader);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Popover);
Vue.use(Upload);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
