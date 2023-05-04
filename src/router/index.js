import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/input_number",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/word_cloud",
    name: "WordCloud",
    component: () => import("../views/WordCloud.vue"),
  },
  {
    path: "/echarts_word_cloud",
    name: "EchartsWordCloud",
    component: () => import("../views/EchartsWordCloud.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
