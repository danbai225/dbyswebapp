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
    component: () => import("../views/Dy.vue")
  },
  {
    path: "/zy",
    name: "zy",
    component: () => import("../views/Zy.vue")
  },
  {
    path: "/dsj",
    name: "dsj",
    component: () => import("../views/Dsj.vue")
  },
  {
    path: "/dm",
    name: "dm",
    component: () => import("../views/Dm.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
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
    component: () => import("../views/Reg.vue")
  },
  {
    path: "/ys",
    name: "ys",
    component: () => import("../views/Ys.vue"),
    beforeEnter: (to, from, next) => {
      if ((to.query.id == undefined) | (to.query.id == "")) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search.vue")
  },
  {
    path: "/person",
    name: "person",
    component: () => import("../views/Person")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
