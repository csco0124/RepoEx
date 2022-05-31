import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DataBinding from "../views/DataBinding.vue";
import ParentComponent from "../views/ParentComponent.vue";
import KakaoLogin from "../views/KakaoLogin.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/databinding",
    name: "DataBinding",
    component: DataBinding,
  },
  {
    path: "/comp",
    name: "ParentComponent",
    component: ParentComponent,
  },
  {
    path: "/kakaoLogin",
    name: "KakaoLogin",
    component: KakaoLogin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
