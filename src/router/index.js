import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dy",
    name: "dy",
    component: () => import(/* webpackChunkName: "about" */ "../views/Dy.vue")
  },
  {
    path: "/zy",
    name: "zy",
    component: () => import(/* webpackChunkName: "about" */ "../views/Zy.vue")
  },
  {
    path: "/dsj",
    name: "dsj",
    component: () => import(/* webpackChunkName: "about" */ "../views/Dsj.vue")
  },
  {
    path: "/dm",
    name: "dm",
    component: () => import(/* webpackChunkName: "about" */ "../views/Dm.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("user") == null) {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import(/* webpackChunkName: "about" */ "../views/Reg.vue")
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
